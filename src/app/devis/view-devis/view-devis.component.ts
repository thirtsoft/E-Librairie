import { Produit } from './../../models/produit';
import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Devis } from 'src/app/models/devis';
import { LigneDevis } from 'src/app/models/ligne-devis';
import { DevisService } from 'src/app/services/devis.service';
import { LigneDevisService } from 'src/app/services/ligne-devis.service';
import { CreateDevisComponent } from '../create-devis/create-devis.component';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-view-devis',
  templateUrl: './view-devis.component.html',
  styleUrls: ['./view-devis.component.scss']
})
export class ViewDevisComponent implements OnDestroy, OnInit {

  listData: Devis[];
  listDatalcmd: LigneDevis[];
  devClient: Devis;

  devId: number;
  currentDevis;
  numeroDevis;
  totalDevis;
  dateDevis;
  client;

  produit: Produit = new Produit();

  private editForm: FormGroup;

  @ViewChild('content') content: ElementRef;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: DevisService,
              public toastr: ToastrService,
              public ldevService: LigneDevisService,
              private router : Router,
              public fb: FormBuilder,
              private datePipe : DatePipe,
              public route: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<CreateDevisComponent>,
  ) { }

  ngOnInit(): void {
    this.devId = this.route.snapshot.params.id;
    console.log(this.devId);
    this.ldevService.getAllLigneDevisByDevis(this.devId).subscribe((data: LigneDevis[]) => {
      this.ldevService.listData = data;
    //  this.currentCommande = data;
      console.log(this.ldevService.listData);

      console.log(this.ldevService.listData[0].numero);
      this.numeroDevis = this.ldevService.listData[0].numero;
      console.log(this.ldevService.listData[0].devis.totalDevis);
      this.totalDevis = this.ldevService.listData[0].devis.totalDevis;
      console.log(this.ldevService.listData[0].devis.dateDevis);
      this.dateDevis = this.ldevService.listData[0].devis.dateDevis;
      this.client = this.ldevService.listData[0].devis.client.raisonSocial;
     // this.dtTrigger.next();
    }, err => {
      console.log(err);
    })

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

  getListDevis() {
    this.crudApi.getAllDevis().subscribe(
      response =>{
        this.listData = response;
      });
  }

  onCreateDevis() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("home/devis");
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
          fontSize: 46,
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
          text: 'Tél: +221 77 729 94 22 / +221 77 109 18 18 / Email: papeteriealamine@gmail.com',
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
                text: `${this.ldevService.listData[0].devis.utilisateur.name}`,
                fontSize: 12,
                bold: true,
                margin: [0, 15, 0, 15]
              },

            ],

            [
              {
                text: `Date: ${this.ldevService.listData[0].devis.dateDevis.toLocaleString()}`,
                alignment: 'right',
                margin: [0, 15, 0, 15]
              },
            ],

          ]
        },

        {
          text: ' FACTURE PROFORMAT',
          alignment: 'center',
          fontSize: 20,
          color: '#0000ff',
          bold: true,
          margin: [0, 5, 0, 5],

        },
        {
          text: `N° : ${this.ldevService.listData[0].devis.numeroDevis}`,
          bold: true,
          fontSize: 14,
          alignment: 'center',
          color: '#0000ff',
          margin: [0, 8, 0, 8]
        },
        {
          text: 'Pour : ' + this.ldevService.listData[0].devis.client.raisonSocial,
          alignment: 'left',
          margin: [0, 8, 0, 8]
        },

        {

        },

        this.getListArticle(this.ldevService.listData),
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
  getListArticle(item: LigneDevis[]) {
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
            return ([x.quantite, x.produit.designation, x.prixDevis,
              (x.quantite*x.prixDevis).toFixed(2)])
          }),

          [
            {
              text: 'MONTANT TOTAL',
              alignment: 'center',
              colSpan: 3
            }, {}, {},
            this.ldevService.listData.reduce((sum, x)=> sum + (x.quantite * x.prixDevis), 0).toFixed(2)
          ]
        ]
      }
    }

  }

  onGoBack() {
    this.router.navigateByUrl('home/listdevis');
  }

}
