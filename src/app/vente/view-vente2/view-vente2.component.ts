
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
import { CreateVenteComponent } from '../create-vente/create-vente.component';
import { Produit } from './../../models/produit';

import { map } from 'rxjs/operators';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-view-vente2',
  templateUrl: './view-vente2.component.html',
  styleUrls: ['./view-vente2.component.scss']
})
export class ViewVente2Component implements OnInit {

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
              public dialogRef:MatDialogRef<CreateVenteComponent>,
  ) { }

  ngOnInit(): void {
    this.venteId = this.route.snapshot.params.id;
    this.lventeService.getLigneVentesByVente(this.venteId).subscribe((data: LigneVente[]) => {
      this.lventeService.listData = data;
      console.log(this.lventeService.listData);

      console.log(this.lventeService.listData[0].numero);
      this.numeroVente = this.lventeService.listData[0].numero;
      console.log(this.lventeService.listData[0].vente.totalVente);
      this.totalVente = this.lventeService.listData[0].vente.totalVente;
      console.log(this.lventeService.listData[0].vente.dateVente);
      this.dateVente = this.lventeService.listData[0].vente.dateVente;
      this.username = this.lventeService.listData[0].vente.utilisateur.name;
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
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  getListVentes() {
    this.crudApi.getAllVentes().subscribe(
      response =>{this.listData = response;}
    );
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
      pageSize: { width: 198.55, height: 'auto' },
      pageMargins: [0.5, 0, 0, 0.5 ],
      content: [
        {
          text: 'WOKITE SARL',
          fontSize: 10,
          color: '#0000ff',
          alignment: 'center',
          decoration: 'underline',
          style: 'name',
          bold: true
        },
        {
          text: 'Prestation de Service & Ingénierie Logigiel et Systèmes - Formation - Consultance - Audit',
          fontSize: 9,
          alignment: 'center',
          color: '#0000ff'
        },
        {
          text: 'Tél: +221 77 944 03 10 / Email: contact@wokite.net',
          fontSize: 8,
          alignment: 'center',
          color: '#0000ff'
        },

        {
          text: `Le ${this.lventeService.listData[0].vente.dateVente.toLocaleString()}`,
          fontSize: 7,
          margin: [3, 7, 0, 7]
        },

        {
          text: `${this.lventeService.listData[0].vente.utilisateur.name.toLowerCase()}`,
          margin: [0, 5, 0, 5],
      //    fontSize: 9,
        },

        {
          text: 'Ticket',
      //    alignment: 'center',
          alignment: 'center',
          fontSize: 7,
          color: '#0000ff',
          margin: [4, 4, 0, 4],
        //  fontSize: 9,
        },
        {
          text: `N° : ${this.lventeService.listData[0].vente.numeroVente}`,
        //  alignment: 'center',
          color: '#0000ff',
          alignment: 'center',
          fontSize: 8,
          margin: [5, 5, 5, 5]
        },

        {

        },

        this.getListLigneVentes(this.lventeService.listData),
        {

        },

        {
          layout: 'lightHorizontalLines',
          text: `TOTAL CFA : ${this.lventeService.listData[0].vente.totalVente}`,
      //    margin: [10, 0, 0, 7],
          margin: [0, 5, 0, 5],
          fontSize: 8,
      //    fontSize: 10,
          colSpan: 2,
          bold: true
        },

        {
          text: ''
           + [(this.lventeService.listData[0].vente.typeReglement) + ' : ' + (this.lventeService.listData[0].vente.montantReglement)],
           margin: [0, 5, 0, 5],
           fontSize: 8,
      //    fontSize: 10,
          colSpan: 3,
          bold: true

        },

        {
          text: 'Rendu : '
           +[(this.lventeService.listData[0].vente.montantReglement)-(this.lventeService.listData[0].vente.totalVente)],
           margin: [0, 5, 0, 5],
           fontSize: 8,
        //  fontSize: 10,
          colSpan: 2,
          bold: true
        },

        {
          text: 'Merci de Votre Confiance !!!',
          margin: [10, 0, 0, 7],
          fontSize: 8,
          alignment: 'center',
        },


      ],

      styles: {
        header: {
        //  fontSize: 14,
          fontSize: 0.5,
       //   bold: true,
          margin: [0, 10, 0],
        //  decoration: 'underline'
        },
        name: {
        //  fontSize: 12,
          fontSize: 0.5,
        //  bold: true
        },
        total: {
        //  fontSize: 12,
          fontSize: 0.5,
          bold: true,
          italics: true
        },
        ligne: {
        //  fontSize: 10,
          fontSize: 0.5,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
        //  bold: true,
        //  fontSize: 10,
          fontSize: 0.5,
       //   alignment: 'center'
        },

      }
    };

  }

  getListLigneVentes(item: LigneVente[]) {
    return {
      layout: 'lightHorizontalLines',
      table: {
        headerRows: 1,
      //  widths: [0.5, 63.8, 'auto', 50],
        widths: ['*', 'auto', '*'],

        body: [
          [

            /*
            {
              text: '',
              fontSize: 0.5,
            },*/

            {
              text: '',
          //    fontSize: 0.5,
              style: 'tableHeader'
            },

            {
              text: '',
        //      fontSize: 0.5,
              style: 'tableHeader'
            },

            {
              text: '',
      //        fontSize: 0.5,
              style: 'tableHeader'
            },

          ],

            ...item.map(x => {
              return ([x.quantite +'x'+ x.produit.designation,x.prixVente,
                (x.quantite*x.prixVente).toFixed(1)])
            }),



        ]
      }
    }

  }

  onGoBack() {
    this.router.navigateByUrl('home/ventes');
  }



}


