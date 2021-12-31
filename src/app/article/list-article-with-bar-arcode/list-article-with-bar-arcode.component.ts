import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogService } from 'src/app/services/dialog.service';
import { DataTableDirective } from 'angular-datatables';

import { ProduitService } from './../../services/article.service';
import { Produit } from './../../models/produit';
import { CreateArticleWithBarcodeComponent } from './../create-article-with-barcode/create-article-with-barcode.component';
import { CreateArticleComponent } from '../create-article/create-article.component';
import { ViewArticleComponent } from '../view-article/view-article.component';


import { map } from 'rxjs/operators';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-list-article-with-bar-arcode',
  templateUrl: './list-article-with-bar-arcode.component.html',
  styleUrls: ['./list-article-with-bar-arcode.component.scss']
})
export class ListArticleWithBarArcodeComponent implements OnInit {

  // @Input()
  listData : Produit[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild("fileUploadInput")
  fileUploadInput: any;
  mesagge: string;

  logObject: any;
  array;

  constructor(public crudApi: ProduitService,
              private dialogService: DialogService,
              public fb: FormBuilder,
              public toastr: ToastrService,
              private router : Router,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<CreateArticleComponent>,
  ) {
    this.crudApi.listen().subscribe((m:any) => {
      console.log(m);
      this.rerender();
      this.getListArticles();
    })
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.crudApi.getAllProductsOrderDesc()
      .subscribe(
        response =>{
          this.crudApi.listData = response;
          this.dtTrigger.next();
        }
      );
  }

  /**
   * methode pour recharger automatique le Datatable
   */
  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first in the current context
      dtInstance.destroy();
      // call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getListArticles() {
    this.crudApi.getAllProductsOrderDesc()
      .subscribe(
        response =>{
          this.listData = response;
        }
      );
  }

  onCreateArticle(){
    this.crudApi.choixmenu == 'A';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(CreateArticleComponent, dialogConfig);
  }

  onCreateArticleWithBarCoder(){
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(CreateArticleWithBarcodeComponent, dialogConfig);

  }

  addEditArticle(id?: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data = {
      id
    };
  //  this.matDialog.open(CreateArticleComponent, dialogConfig);
    this.matDialog.open(CreateArticleWithBarcodeComponent, dialogConfig);
  }

  viewArticle(id?: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data = {
      id
    };
    this.matDialog.open(ViewArticleComponent, dialogConfig);
  }

  editerArticle(item : Produit) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";

    this.matDialog.open(CreateArticleComponent, dialogConfig);
  }

  deleteArticle(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteProduit(id).subscribe(data => {
          this.toastr.warning('Article supprimé avec succès!');
          this.rerender();
          this.getListArticles();
        });
      }
    });
  }

  editArticle(item : Produit) {
    this.router.navigateByUrl('article/'+item.id);
  }


  uploadExcelFile() {
    let formData = new FormData();
    console.log(formData)
    formData.append('file', this.fileUploadInput.nativeElement.files[0]);
    this.crudApi.uploadExcelFile(formData).subscribe(result => {
      console.log(result);
      this.mesagge = result.toString();
      this.toastr.warning('Fichier Excel Importé avec succès!');
      this.rerender();
      this.getListArticles();
    })
  }

  generateExcel() {
    this.crudApi.generateExcelFile();
    this.toastr.warning("Fichier Excel téléchargé avec succès");
  }

  generatePdf() {
    this.crudApi.exportPdfProduit().subscribe(x => {
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
    this.toastr.warning('Pdf Télécharger avec succès!');

  }

  Imprimer() {
    const document = this.getDocument();
    pdfMake.createPdf(document).download();
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

            ],

          ]
        },
        {
          text: 'LA LISTE DES ARTICLES',
          bold: true,
          fontSize: 14,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },

        this.getListArticle(this.crudApi.listData),
        {

        },

        {
          text: 'Signature',
          style: 'sign',
          alignment: 'right'
        },

      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        name: {
          fontSize: 14,
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
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
          fontSize: 14,
          alignment: 'center'
        }
      }
    };

  }
  getListArticle(item: Produit[]) {
    return {
      table: {
        widths: ['*','*','*','*','*','*'],
        body: [
          [
            {
              text: 'Designation',
              style: 'tableHeader'
            },
            {
              text: 'Scategorie',
              style: 'tableHeader'
            },
            {
              text: 'P.Achat',
              style: 'tableHeader'
            },
            {
              text: 'P.Vente',
              style: 'tableHeader'
            },
            {
              text: 'P.Details',
              style: 'tableHeader'
            },
            {
              text: 'Quantité',
              style: 'tableHeader'
            },
          ],

        ]
      }
    }

  }

  openPdf1() {
    const document = this.getDocument1();
    pdfMake.createPdf(document).open();
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

              ],

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

  getList(item: Produit[]) {
    let officersIds = [];
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
           item.map(resp =>{(
             officersIds.push(resp.reference, resp.designation, resp.scategorie.libelle, resp.prixAchat)
           )})

        ]
      }
    };

  }

  getAllArticlees(){
    this.crudApi.getAllProduits().subscribe((res: any) => {
      this.listData = res.data.lisData;
      for(var i = 0; i< this.listData.length; i++) {
        this.array = this.listData[i]
        console.log(this.array)
      }
    });
  }

  openPdf3(){
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).open();
  }

  getDocumentDefinition() {
    return {
      content: [
          {
          table: {
            headerRows: 6,
            widths: ['*', 100, 200, '*', '*', '*'],
            body: [
              ['Reference', 'Desigation', 'PU', 'Scategorie' ]
              .concat(this.listData[0].reference, this.listData[0].designation, this.listData[0].scategorie.libelle),
            ]
          }
        }
      ]
    };
  }

  headRows() {
    return [{
      id: 'ID',
      reference: 'Reference',
      designation: 'Designation',
      prixAchat: 'PU',
      scategorie: 'SCAT',
    }];

  }

  bodyRows(rowCount, listData: Produit[]) {
   // rowCount = rowCount || 10;
    let body = [];
    for (var j = 0; j < listData.length; j++) {
      body.push({
          id: j+1,
          reference: listData[j].reference,
          designation: listData[j].designation,
          prixAchat: listData[j].prixAchat,
          scategorie: listData[j].scategorie.libelle,
      });
      return body;
  }
  }

}
