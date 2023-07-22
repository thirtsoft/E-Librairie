import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Creance } from 'src/app/models/creance';
import { CreanceService } from 'src/app/services/creance.service';
import { LigneCreance } from 'src/app/models/ligne-creance';
import { ToastrService } from 'ngx-toastr';
import { LigneCreanceService } from 'src/app/services/ligne-creance.service';
import { CreateCreanceComponent } from '../create-creance/create-creance.component';
import { Produit } from './../../models/produit';

import { map } from 'rxjs/operators';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-creance',
  templateUrl: './view-creance.component.html',
  styleUrls: ['./view-creance.component.scss']
})
export class ViewCreanceComponent implements OnInit {

  listData: Creance[];
  listDatalcmd: LigneCreance[];
  cmdClient: Creance;

  creanceId: number;
  numeroCreance;
  totalCreance;
  dateCreance;
  client;

  produit: Produit = new Produit();
  username = '';

  @ViewChild('content') content: ElementRef;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: CreanceService,
              public lcreanceService: LigneCreanceService,
              public toastr: ToastrService,
              private datePipe : DatePipe,
              private router : Router,
              public fb: FormBuilder,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private route: ActivatedRoute,
              public dialogRef:MatDialogRef<CreateCreanceComponent>,
    ) { }

  ngOnInit(): void {
    this.creanceId = this.route.snapshot.params.id;
    console.log(this.creanceId);
    this.lcreanceService.getAllLigneCreanceByCreance(this.creanceId).subscribe((data: LigneCreance[]) => {
      this.lcreanceService.listData = data;
    //  this.currentCommande = data;
      console.log(this.lcreanceService.listData);

      console.log(this.lcreanceService.listData[0].numero);
      this.numeroCreance = this.lcreanceService.listData[0].numero;
      console.log(this.lcreanceService.listData[0].creance.totalCreance);
      this.totalCreance = this.lcreanceService.listData[0].creance.totalCreance;
      this.dateCreance = this.lcreanceService.listData[0].creance.dateCreance;
      console.log(this.dateCreance);
      this.client = this.lcreanceService.listData[0].creance.client.raisonSocial;
      this.username = this.lcreanceService.listData[0].creance.utilisateur.name;
     // this.dtTrigger.next();
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

  getListCreances() {
    this.crudApi.getAllCreances().subscribe(
      response =>{
        this.listData = response;
      });
  }

  onCreateCreance() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("home/creance");
  }

  deleteCreance(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cette Commande ?')) {
    this.crudApi.deleteCreance(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Creance supprimé avec succès!');
          this.rerender();
          this.getListCreances();
      },
        error => console.log(error));
    }
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
                text: `${this.lcreanceService.listData[0].creance.utilisateur.name}`,
                fontSize: 12,
                bold: true,
                margin: [0, 15, 0, 15]
              },

            ],

            [
              {
                text: `Date: ${this.lcreanceService.listData[0].creance.dateCreance.toLocaleString()}`,
                alignment: 'right',
                margin: [0, 15, 0, 15]
              },
            ],

          ]
        },

        {
          text: 'FACTURE CREANCE',
          alignment: 'center',
          fontSize: 15,
          color: '#0000ff',
          bold: true,
          margin: [0, 5, 0, 5],
        },
        {
          text: `N° : ${this.lcreanceService.listData[0].numero}`,
          bold: true,
          fontSize: 14,
          alignment: 'center',
          color: '#0000ff',
          margin: [0, 8, 0, 8]
        },
        {
          text: 'Pour  : ' +this.lcreanceService.listData[0].creance.client.raisonSocial,
          alignment: 'left',
          margin: [0, 8, 0, 8]
        },

        {

        },

        this.getListArticle(this.lcreanceService.listData),
        {

        },
        {
          text: 'Montant Emprunté : ' +this.lcreanceService.listData[0].creance.soldeCreance,
          alignment: 'right',
          margin: [0, 8, 0, 8],
          fontSize: 12,
          bold: true,
          colSpan: 3
        },
        {
          text: 'Montant Total : ' +this.lcreanceService.listData[0].creance.totalCreance,
          alignment: 'right',
          margin: [0, 5, 0, 5],
          fontSize: 12,
          bold: true,
          colSpan: 3
        },
        {
          text: 'Montant Avancée : ' +this.lcreanceService.listData[0].creance.avanceCreance,
          alignment: 'right',
          margin: [0, 5, 0, 5],
          fontSize: 12,
          bold: true,
          colSpan: 3
        },

        {
          text: 'Montant à Payer : ' +[(this.lcreanceService.listData[0].creance.totalCreance)-(this.lcreanceService.listData[0].creance.avanceCreance)],
          alignment: 'right',
          margin: [0, 5, 0, 5],
          fontSize: 12,
          bold: true,
          colSpan: 3
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
  getListArticle(item: LigneCreance[]) {
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
            this.lcreanceService.listData.reduce((sum, x)=> sum + (x.quantite * x.prix), 0).toFixed(2)
          ]
        ],

      }
    }

  }

  onGoBack() {
    this.router.navigateByUrl('home/creances');
  }

  transformDate(date){
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }


}
