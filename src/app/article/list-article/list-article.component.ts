import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef, Input } from '@angular/core';
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

/* import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx'; */

import * as XLSX from 'xlsx';


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

  @Input()
  listData : Article[];

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  @ViewChild('TABLE') TABLE: ElementRef;

  @ViewChild("fileUploadInput")
  fileUploadInput: any;

  mesagge: string;

  logObject: any;


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

  uploadExcelFile() {
    let formData = new FormData();
    console.log(formData)
    formData.append('file', this.fileUploadInput.nativeElement.files[0]);
    this.crudApi.uploadExcelFile(formData).subscribe(result => {
      console.log(result);
      this.mesagge = result.toString();
      this.getListArticles();
    })
  }

  /* generateExceles() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Articles');
    XLSX.writeFile(wb, 'Article.xlsx');
  } */

  generateExcels() {
    this.crudApi.exportAsExcelFile(this.listData, 'Articles');
  }

  generateExcel() {
    this.crudApi.generateExcelFile();
  }


  generatePdf() {
    this.crudApi.exportPdfProduits().subscribe(x => {
      const blob = new Blob([x], {type: 'application/pdf'});
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob);
        return;

      }
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'articles.pdf';
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));

      setTimeout(function() {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100)

    });

  }

  selectFile($event) {
    let fileList = $event.srcElement.files;
    let file = fileList[0];
    if(file && file.name.endsWith(".csv")){
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = (data) => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        let headers = csvRecordsArray && csvRecordsArray.length>0 ? csvRecordsArray[0].split(";"): [];
        // bind headers with dataModelList
        let bindArray = this.getBindheadersDataModelistArray(headers);

        this.logObject = bindArray;

        console.log(bindArray);
      };
    }


  }

  getBindheadersDataModelistArray(headers: any[]) {
    let bindArray = [];
    let index = 0;
    let getDataType = (header => {
      let dataType = '';
      this.listData.forEach(dataModel => {
        if (dataModel.reference == header) {
          dataType = dataModel.reference;
        }

      });
      return dataType;
    })

    headers.forEach(header => {
      const bindItem = {
        columnName: header,
        dataType: getDataType(header),
        index: index
      }
      index++;
      bindArray.push(bindItem);
    });

    return bindArray;

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
