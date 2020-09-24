import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Categorie } from 'src/app/models/categorie';
import { Scategorie } from 'src/app/models/scategorie';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CreateArticleComponent } from '../create-article/create-article.component';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
//import * as jsPDF from 'jspdf'


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { style } from '@angular/animations';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnDestroy, OnInit {

  listData : Article[];

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  constructor(public crudApi: ArticleService,public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateArticleComponent>,
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.crudApi.getAllArticles().subscribe(
      response =>{
        this.listData = response;
        this.dtTrigger.next();
      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getListArticles() {
    this.crudApi.getAllArticles().subscribe(
      response =>{this.listData = response;

      });

  }

  onCreateArticle(){
    this.crudApi.choixmenu = "A";
    //this.router.navigateByUrl("articles/new");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(CreateArticleComponent, dialogConfig);
  }

  editerArticle(item : Article) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";

    this.matDialog.open(CreateArticleComponent, dialogConfig);
  }

  deleteArticle(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cet Article ?')) {
    this.crudApi.deleteArticle(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Article supprimé avec succès!');
          this.getListArticles();
      },
        error => console.log(error));
    }

  }

  onCreatePdf() {
    this.crudApi.exportPdfArticle().subscribe(res => {
      const blob = new Blob([res], {type: 'application/pdf'});
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob);
        return;
      }
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'C:\Users\Folio9470m\articles.pdf';
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));

      setTimeout(function() {
        window.URL.revokeObjectURL(data);
        link.remove();

      }, 100);
     // this.listData = res;
    })
  }

  editArticle(item : Article) {

    this.router.navigateByUrl('article/'+item.id);

  }


  /* generatePdf(){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition).open();
   } */


  generatePdf(){
    const document = this.getDocument();
    pdfMake.createPdf(document).open();
  }

  getDocument() {
    return {
      content: [
        {
          columns: [
            [
              {
                text: 'LIBRARY ALAMINE',
                style: 'name',
              },
              {
                text: 'En Face CBAO Marché Bignona',
              },
              {
                text: 'Téléphone : +221338763598',
              },
              {
                text: 'Mobile : +221779440310',
              },
              {
                text: 'Email : alamine@gmail.com',
              },
              {
                text: 'LA LISTE DES ARTICLES',
                bold: true,
                fontSize: 16,
                alignment: 'center',
                margin: [0, 0, 0, 20]
              }
            ],

          ]
        },
        {
          text: 'LA LISTE DES ARTICLES',
          bold: true,
          fontSize: 16,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
      //  this.getList(this.crudApi.listData),

      ]

    }

  }

  getDocument1() {
    return {
      content: [
        {
          columns: [
            [ {
                text: 'Library AlAmine',
                style: 'name'
              },
              {
                text: 'Marché Bignona'
              },
              {
                text: 'Email : ' ,
              },
              {
                text: 'Contant No : ',
                color: 'blue',
              },
              {
                text: 'Liste des Articles',
                bold: true,
                fontSize: 30,
                alignment: 'center',
                margin: [0, 0, 0, 20]
              },

              this.getList(this.crudApi.listData),
              {

              },

                {
                  text: 'Signature',
                  style: 'sign',
                  alignment: 'right'
                },

              ]
            ],

            styles: {
              header: {
                fontSize: 18,
                bold: true,
                margin: [0, 20, 0, 10],
                decoration: 'underline'
              },

              name: {
                fontSize: 16,
                bold: true
              },

              total: {
                fontSize: 12,
                bold: true,
                italics: true
              },

              ligne: {
                fontSize: 12,
                bold: true,
                italics: true
              },
              tableHeader: {
                bold: true,
                fontSize: 15,
                alignment: 'center'
              }

            }

        }
      ]
    };

  }

  getList(item: Article[]) {
    return {
      table: {
        width: ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
        body: [
          [
            {
              text: 'Reference',
              style: 'tableHeader'
            },
            {
              text: 'Designation',
              style: 'tableHeader'
            },
            {
              text: 'Categorie',
              style: 'tableHeader'
            },
            {
              text: 'SCategorie',
              style: 'tableHeader'
            },
            {
              text: 'PAchat',
              style: 'tableHeader'
            },
            {
              text: 'PVente',
              style: 'tableHeader'
            },
            {
              text: 'PDetails',
              style: 'tableHeader'
            },
            {
              text: 'Quantié',
              style: 'tableHeader'
            },
            {
              text: 'Date_Ajout',
              style: 'tableHeader'
            },
          ],
          ...item.map(resp => {
            (resp.reference,resp.designation,resp.categorie.designation,resp.scategorie.libelle,resp.prixAchat,resp.prixVente,
            resp.prixDetail, resp.qtestock,resp.add_date);
          })
        ]
      }
    };

  }


}
