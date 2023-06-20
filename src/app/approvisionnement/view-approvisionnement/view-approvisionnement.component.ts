import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Appro } from 'src/app/models/appro';
import { ApproService } from 'src/app/services/appro.service';
import { LigneApproService } from 'src/app/services/ligne-appro.service';
import { LigneAppro } from 'src/app/models/ligne-appro';
import { Produit } from './../../models/produit';

import { CreateVenteComponent } from 'src/app/vente/create-vente/create-vente.component';

import { map } from 'rxjs/operators';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-approvisionnement',
  templateUrl: './view-approvisionnement.component.html',
  styleUrls: ['./view-approvisionnement.component.scss']
})
export class ViewApprovisionnementComponent implements OnInit {

  listData: Appro[];
  listDetalAppro: LigneAppro[];
  appro: Appro;
  approId: number;
  currentAppro;

  code;
  totalAppro;
  dateAppro;
  forunisseur;

  produit: Produit = new Produit();

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: ApproService,
              public fb: FormBuilder,
              public toastr: ToastrService,
              private router : Router,
              private datePipe : DatePipe,
              public lapproService: LigneApproService,
              private route: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<CreateVenteComponent>,
  ) { }

  ngOnInit(): void {
    this.approId = this.route.snapshot.params.id;
    console.log(this.approId);
    this.lapproService.getAllLigneApproByAppro(this.approId).subscribe((data: LigneAppro[]) => {
      //this.currentVente = data;
      this.lapproService.listData = data;
      this.code = this.lapproService.listData[0].numero;
      this.totalAppro = this.lapproService.listData[0].approvisionnement.totalAppro;
    //  this.forunisseur = (this.lapproService.listData[0].approvisionnement.fournisseur.prenom +"."+this.lapproService.listData[0].approvisionnement.fournisseur.nom);
      this.forunisseur = this.lapproService.listData[0].approvisionnement.fournisseur.raisonSociale;
      this.dateAppro = this.lapproService.listData[0].approvisionnement.dateApprovisionnement;

    }, err => {
      console.log(err);
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

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd, h:mm:ss');
  }

  getListVentes() {
    this.crudApi.getAllAppros().subscribe(
      response =>{
        this.listData = response;
      }
    );
  }

  onCreateAppro() {
    this.crudApi.choixmenu == 'A';
    this.router.navigateByUrl("home/approvisionnement");
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
            [
              {
                text: `Date: ${this.lapproService.listData[0].approvisionnement.dateApprovisionnement.toLocaleString()}`,
                alignment: 'right',
                margin: [0, 15, 0, 15]
              },
            ],

          ]
        },
        {
          text: ' FACTURE APPROVISIONNEMENT',
          alignment: 'center',
          fontSize: 12,
          color: '#0000ff',
          bold: true,
          margin: [0, 5, 0, 5]
        },
        {
          text: `N° : ${this.lapproService.listData[0].numero}`,
          bold: true,
          fontSize: 11,
          alignment: 'center',
          color: '#0000ff',
          margin: [0, 8, 0, 8]
        },
        {
          bold:true,
          text: 'Fournisseur  : ' +[this.lapproService.listData[0].approvisionnement.fournisseur.raisonSociale],
          alignment: 'left',
          fontSize: 10,
          margin: [0, 8, 0, 8]
        },

        {

        },

        this.getListApprov(this.lapproService.listData),
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
          fontSize: 10,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        name: {
          fontSize: 10,
          bold: true
        },
        total: {
          fontSize: 10,
          bold: true,
          italics: true
        },
        ligne: {
          fontSize: 10,
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
          fontSize: 10,
          alignment: 'center'
        },

      }
    };

  }
  getListApprov(item: LigneAppro[]) {
    return {
      table: {
        widths: ['auto', '*', 'auto', 'auto'],
        body: [
          [
            {
              text: 'QUANTITE',
              style: 'tableHeader'
            },
            {
              text: 'DESIGNATION',
              style: 'tableHeader'
            },
            {
              text: 'P.UNITAIRE',
              style: 'tableHeader'
            },
            {
              text: 'P.TOTAL',
              style: 'tableHeader'
            },

          ],

          ...item.map(x => {
            return ([x.quantite, x.produit.designation, x.prix,
              (x.quantite*x.prix).toFixed(2)])
          }),
          [
            {
              text: 'MONTANT TOTAL',
              alignment: 'center',
              colSpan: 3
            }, {}, {},
            this.lapproService.listData.reduce((sum, x)=> sum + (x.quantite * x.prix), 0).toFixed(2)
          ]
        ]
      }
    }

  }

  onGoBack() {
    this.router.navigateByUrl('home/approvisionnements');
  }



}
