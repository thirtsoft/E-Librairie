import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DatePipe } from '@angular/common';

import { Vente } from 'src/app/models/vente';
import { VenteService } from 'src/app/services/vente.service';
import { LigneVenteService } from 'src/app/services/ligne-vente.service';
import { LigneVente } from 'src/app/models/ligne-vente';

import { map } from 'rxjs/operators';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Produit } from 'src/app/models/produit';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-details-vente-libre',
  templateUrl: './details-vente-libre.component.html',
  styleUrls: ['./details-vente-libre.component.scss']
})
export class DetailsVenteLibreComponent implements OnInit {

  listData: Vente[];
  venteId: number;

  numeroVente;
  totalVente;
  dateVente;

  produit: Produit = new Produit();

  username = '';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: VenteService,
              public lventeService: LigneVenteService,
              public toastr: ToastrService,
              public fb: FormBuilder,
              private router : Router,
              private datePipe : DatePipe,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.venteId = this.route.snapshot.params.id;
    this.lventeService.getLigneVentesByVente(this.venteId).subscribe((data: LigneVente[]) => {
      this.lventeService.listData = data;
      this.numeroVente = this.lventeService.listData[0].numero;
      this.totalVente = this.lventeService.listData[0].vente.totalVente;
      this.dateVente = this.lventeService.listData[0].vente.dateVente;
      this.username = this.lventeService.listData[0].vente.utilisateur.name;
    }, err => {
      console.log(err);
    });
  }

  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  transformDate(date){
    return this.datePipe.transform(date, 'dd-MM-yyyy');
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
          text: 'WOKITE',
          fontSize: 30,
          alignment: 'center',
          color: '#0000ff',
          decoration: 'underline',
          style: 'name',
        },
        {
          text: 'Ingénierie logiciel - Développement de (logiciel & site web) - Consultance - Formation - Audit',
          fontSize: 12,
          bold: true,
          color: '#0000ff'
        },
        {
          text: 'N°Compte UBA SN 048 03001 000238318823 J/40N° Compte UBA SN 123 03001 001000519504/50',
          fontSize: 10.5,
          bold: true,
          color: '#0000ff'
        },
        {
          text: 'Tél: +221 77 083 86 29 / +221 77 944 03 10 / Email: contact@wokite.net',
          fontSize: 12,
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
                text: `Agent  : ${this.lventeService.listData[0].vente.utilisateur.name.toLowerCase()}`,
                fontSize: 12,
                bold: true,
                margin: [0, 15, 0, 15]
              },

            ],

            [
              {
                text: `Date: ${this.lventeService.listData[0].vente.dateVente.toLocaleString()}`,
                alignment: 'right',
                margin: [0, 15, 0, 15]
              },
            ],

          ]
        },

        {
          text: 'FACTURE VENTE',
          bold: true,
          fontSize: 15,
          alignment: 'center',
          color: '#0000ff',
          margin: [0, 8, 0, 8]
        },
        {
          text: `N° : ${this.lventeService.listData[0].vente.numeroVente}`,
          bold: true,
          fontSize: 14,
          alignment: 'center',
          color: '#0000ff',
          margin: [0, 8, 0, 8]
        },
        {
          text: 'M.',
          fontSize: 13,
          alignment: 'left',
          margin: [0, 5, 0, 5]
        },
        {

        },

        this.getListLigneVentes(this.lventeService.listData),
        {

        },

        {
          text: `Total en F CFA : ${this.lventeService.listData[0].vente.totalVente}`,
          alignment: 'right',
          margin: [0, 8, 0, 8],
          bold: true,
          fontSize: 12,
        },

        {
          text: 'Réglement '
           + [(this.lventeService.listData[0].vente.typeReglement) + ' : ' + (this.lventeService.listData[0].vente.montantReglement)],
          alignment: 'right',
          margin: [0, 3, 0, 8],
          bold: true,
          fontSize: 11,

        },

        {
          text: 'Rendu en F CFA : '
           +[(this.lventeService.listData[0].vente.montantReglement)-(this.lventeService.listData[0].vente.totalVente)],
          alignment: 'right',
          margin: [0, 5, 0, 15],
          bold: true,
          fontSize: 12,
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

  getListLigneVentes(item: LigneVente[]) {
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
            return ([x.quantite, x.produit.designation, x.prixVente,
              (x.quantite*x.prixVente).toFixed(2)])
          }),
          [
            {
              text: 'MONTANT TOTAL',
              alignment: 'center',
              colSpan: 3
            }, {}, {},
            this.lventeService.listData.reduce((sum, x)=> sum + (x.quantite * x.prixVente), 0).toFixed(2)
          ]
        ]
      }
    }

  }

  onGoBack() {
    this.router.navigateByUrl('list-ventes');
  }
}
