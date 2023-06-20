import { TokenStorageService } from './../../auth/token-storage.service';
import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from "@angular/material/dialog";
import { DialogService } from 'src/app/services/dialog.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import { CategorieService } from 'src/app/services/categorie.service';
import { Categorie } from 'src/app/models/categorie';
import { CreateCategorieComponent } from '../create-categorie/create-categorie.component';


import { map } from 'rxjs/operators';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.scss']
})
export class ListCategorieComponent implements OnDestroy, OnInit {

  categorie: Categorie;

  listData : Categorie[];
  CatId: number;

  info: any;
  roles: string[];

  isLoggedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  showAssocieBoard = false;
  showGerantBoard = false;
  showVendeurBoard = false;

  control: FormControl = new FormControl('');

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild("fileUploadInput")
  fileUploadInput: any;
  mesagge: string;

  constructor(public crudApi: CategorieService,
              private dialogService: DialogService,
              public toastr: ToastrService,
              private tokenService: TokenStorageService,
              private matDialog: MatDialog,
              public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<CreateCategorieComponent>,
  ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListCategories();
      })
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showManagerBoard = this.roles.includes("ROLE_MANAGER");
      this.showAssocieBoard = this.roles.includes('ROLE_ASSOCIE');
      this.showGerantBoard = this.roles.includes('ROLE_GERANT');
      this.showVendeurBoard = this.roles.includes('ROLE_VENDEUR');
    };

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.crudApi.getAllCategoriesOrderDesc().subscribe(
      response =>{
        this.listData = response;
        this.dtTrigger.next();
      }, err=> {
        /*
        this.authService.jwtToken = null;
        this.authService.logout();
        this.router.navigateByUrl('/login');
        */
      });

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

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.crudApi.formData = {
      id: null,
      code: '',
      designation: ''
    };

  }

  getListCategories() {
    this.crudApi.getAllCategoriesOrderDesc()
      .subscribe(
        response =>{
          this.listData = response;
          console.log(this.listData)
        }
      );

  }

  onCreateCategorie(){
    this.crudApi.choixmenu == 'A';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="30%";
    this.matDialog.open(CreateCategorieComponent, dialogConfig);
  }

  selectData(item : Categorie) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateCategorieComponent, dialogConfig);
  }

  deleteCategorie(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteCategorie(id).subscribe(data => {
          this.toastr.warning('Categorie supprimé avec succès!');
          this.rerender();
          this.getListCategories();
        },
          (error: HttpErrorResponse) => {
            this.toastr.error("Impossible de supprimer cet catégorie, veuillez supprimer tous les sous_catégorie lié à celle-ci");
          }
        );
      }
    });

  }

  uploadExcelFile() {
    let formData = new FormData();
    console.log(formData)
    formData.append('file', this.fileUploadInput.nativeElement.files[0]);
    this.crudApi.uploadCategorieExcelFile(formData).subscribe(result => {
      console.log(result);
      this.mesagge = result.toString();
      this.toastr.warning('Fichier Excel Importé avec succès!');
      this.rerender();
      this.getListCategories();
    })
  }

  generateExcel() {
    this.crudApi.generateExcelFile();
    this.toastr.warning('Excel Télécharger avec succès!');
  }

  generatePdf() {
    this.crudApi.exportPdfCategories().subscribe(x => {
      const blob = new Blob([x], {type: 'application/pdf'});
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob);
        return;
      }
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'categories.pdf';
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));

      setTimeout(function() {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100)

    });
    this.toastr.warning('Pdf Télécharger avec succès!');

  }

  OpenPdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).open();
  }

  PrintPdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).print();
  }

  DownloadPdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).download();
  }

  getDocument() {
    return {
      content: [
        {
          text: 'WOKITE SARL',
          fontSize: 20,
          alignment: 'center',
          color: '#0000ff',
          decoration: 'underline',
          style: 'name',
        },
        {
          text: 'Prestation de Service & Ingénierie Logigiel et Systèmes - Formation - Consultance - Audit',
          fontSize: 12,
          alignment: 'center',
          bold: true,
          color: '#0000ff'
        },
        {
          text: 'Hann-Mariste 2 – Dakar / Sénégal - RC : SN.DKR.2021.A.15470',
          fontSize: 11,
          alignment: 'center',
          bold: true,
          color: '#0000ff'
        },
        {
          text: 'Tél: +221 77 944 03 10 / Email: contact@wokite.net',
          fontSize: 10,
          bold: true,
          alignment: 'center',
          color: '#0000ff'
        },
        {

        },

        {
          columns: [


          ]
        },

        {
          text: ' LISTE DES CATEGORIES',
          alignment: 'center',
          fontSize: 20,
          color: '#0000ff',
          bold: true,
          margin: [0, 15, 0, 15]
        },

        {

        },

        this.getPDFListCategories(this.crudApi.listData),
        {

        },

        {
          text: 'Signature',
          style: 'sign',
          alignment: 'right',
          decoration: 'underline',
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
        },

      }
    };

  }
  getPDFListCategories(item: Categorie[]) {
    return {
      table: {
        widths: ['auto','auto'],
        body: [
          [

            {
              text: 'Code Categorie',
              style: 'tableHeader'
            },
            {
              text: 'Désignation',
              style: 'tableHeader'
            },

          ],
          ...item.map(x => {
            return ([x.code, x.designation])
          }),

        ]
      }
    }

  }


}
