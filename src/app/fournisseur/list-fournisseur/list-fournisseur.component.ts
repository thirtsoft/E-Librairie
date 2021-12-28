import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Fournisseur } from 'src/app/models/fournisseur';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CreateFournisseurComponent } from '../create-fournisseur/create-fournisseur.component';
import { DataTableDirective } from 'angular-datatables';
import { DialogService } from 'src/app/services/dialog.service';
import { ViewFournisseurComponent } from '../view-fournisseur/view-fournisseur.component';
import { EnvoiSMSFournisseurComponent } from '../envoi-smsfournisseur/envoi-smsfournisseur.component';
import { EnvoiEmailFournisseurComponent } from '../envoi-email-fournisseur/envoi-email-fournisseur.component';
import { map } from 'rxjs/operators';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.scss']
})
export class ListFournisseurComponent implements OnDestroy, OnInit {

  fournisseur: Fournisseur;
  FourID: number;

  editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: FournisseurService,
              private dialogService: DialogService,
              public toastr: ToastrService,
              private router : Router,
              private matDialog: MatDialog,
              public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<CreateFournisseurComponent>,
  ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListFournisseurs();
      })
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };
    this.crudApi.getAllFournisseursOrderDesc().subscribe(
      response =>{
        this.crudApi.listData = response;
        console.log(this.crudApi.listData);
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

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.crudApi.formData = {
      id: null,
      code: '',
      raisonSociale: '',
      prenom: '',
      nom: '',
      numeroCompte: '',
      nomBank: '',
      adresse: '',
      email: '',
      fax: '',
      telephone: '',
      mobile: '',
      subject: '',
      message: '',
    };

  }

  getListFournisseurs() {
    this.crudApi.getAllFournisseursOrderDesc().subscribe(
      response =>{
        this.crudApi.listData = response;
      }
    );
  }

  viewFournisseur(item: Fournisseur) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(ViewFournisseurComponent, dialogConfig);
  }

  onCreateFournisseur(){
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateFournisseurComponent, dialogConfig);
  }

  sendMail() {

  }

  editFournisseur(item: Fournisseur) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateFournisseurComponent, dialogConfig);
  }

  envoiEmail(item: Fournisseur) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(EnvoiEmailFournisseurComponent, dialogConfig);
  }

  envoiSMS(item: Fournisseur) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(EnvoiSMSFournisseurComponent, dialogConfig);
  }
  deleteFournisseur(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteFournisseur(id).subscribe(data => {
          this.toastr.warning('Fournisseur supprimé avec succès!');
          this.rerender();
          this.getListFournisseurs();
        });
      }
    });
  }

  editerFournisseur(item : Fournisseur) {
    this.router.navigateByUrl('fournisseurs/'+item.id);
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
          text: 'AL AMINE',
          fontSize: 50,
          alignment: 'center',
          color: '#0000ff',
          decoration: 'underline',
          style: 'name',
        },
        {
          text: 'Prestation de Service & Commerce GeneralRC SN ZGR 2016 C233 / NINEA 00058166762P6',
          fontSize: 12,
          bold: true,
          color: '#0000ff'
        },
        {
          text: 'N°Compte CNCAS SN 048 03001 000108318801 J/40N° Compte BNDE SN 169 03001 001000519301/30',
          fontSize: 10.5,
          bold: true,
          color: '#0000ff'
        },
        {
          text: 'Tél: 77109 18 18 / Email: papeteriealamine@gmail.com',
          fontSize: 12,
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
          text: ' LISTE DES FOURNISSEURS',
          alignment: 'center',
          fontSize: 20,
          color: '#0000ff',
          bold: true,
          margin: [0, 15, 0, 15]
        },

        {

        },

        this.getPDFListFournisseurs(this.crudApi.listData),
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
  getPDFListFournisseurs(item: Fournisseur[]) {
    return {
      table: {
        widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto','auto'],
        body: [
          [

            {
              text: 'Raison Social',
              style: 'tableHeader'
            },
            {
              text: 'Prenom',
              style: 'tableHeader'
            },
            {
              text: 'Nom',
              style: 'tableHeader'
            },
            {
              text: 'Num-Compte',
              style: 'tableHeader'
            },
            {
              text: 'Bank',
              style: 'tableHeader'
            },
            {
              text: 'Adresse',
              style: 'tableHeader'
            },
            {
              text: 'Telephone',
              style: 'tableHeader'
            },
            {
              text: 'Email',
              style: 'tableHeader'
            },

          ],
          /*
          ...item.map(x => {
            return ([x.raisonSociale, x.prenom, x.nom, x.numeroCompte,
              x.nomBank, x.adresse, x.telephone, x.email])
          }), */

          item.map(x => {
            return ([x.raisonSociale, x.prenom, x.nom, x.numeroCompte,
              x.nomBank, x.adresse, x.telephone, x.email])
          }),

        ]
      }
    }

  }



}
