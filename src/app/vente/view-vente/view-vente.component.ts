import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Vente } from 'src/app/models/vente';
import { VenteService } from 'src/app/services/vente.service';
import { LigneVenteService } from 'src/app/services/ligne-vente.service';
import { LigneVente } from 'src/app/models/ligne-vente';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Article } from 'src/app/models/article';
import { CreateVenteComponent } from '../create-vente/create-vente.component';
import { map } from 'rxjs/operators';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-view-vente',
  templateUrl: './view-vente.component.html',
  styleUrls: ['./view-vente.component.scss']
})
export class ViewVenteComponent implements OnDestroy, OnInit {

  listData: Vente[];
  listDatalVente: LigneVente[];
  cmdVente: Vente;
  vente;
  venteId: number;
  currentVente;

  numeroVente;
  totalVente;
  dateVente;

  produit: Article = new Article();

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: VenteService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog, public lventeService: LigneVenteService,
    @Inject(MAT_DIALOG_DATA) public data: any, public route: ActivatedRoute,
    public dialogRef:MatDialogRef<CreateVenteComponent>,
    ) { }

  ngOnInit(): void {
    this.venteId = this.route.snapshot.params.id;
    console.log(this.venteId);
    this.lventeService.getLigneVentesByVente(this.venteId).subscribe((data: LigneVente[]) => {
      this.lventeService.listData = data;
      //this.currentVente = data;
      console.log(this.lventeService.listData);

      console.log(this.lventeService.listData[0].numero);
      this.numeroVente = this.lventeService.listData[0].numero;
      console.log(this.lventeService.listData[0].vente.totalVente);
      this.totalVente = this.lventeService.listData[0].vente.totalVente;
      console.log(this.lventeService.listData[0].vente.dateVente);
      this.dateVente = this.lventeService.listData[0].vente.dateVente;

     // this.dtTrigger.next();
    }, err => {
      console.log(err);
    })
/*
    this.cmdVente = new Vente();
    this.cmdVente = {
      venteId: null, numeroVente: 0, totalVente: 0,
      status: '', dateVente: new Date(), DeletedOrderItemIDs: ''
    }
    */
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

  getListVentes() {
    this.crudApi.getAllVentes().subscribe(
      response =>{this.listData = response;}
    );
  }

  onCreateVente() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("vente");
  }

  ImprimerPdf() {
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
          text: ' FACTURE PROFORMAT',
          alignment: 'center',
          fontSize: 14,
          color: '#0000ff'
        },
        {},

        {
          columns: [

            [
              {
                text: `FACTURE N° : ${this.lventeService.listData[0].numero}`,
                fontSize: 14,
                bold: true,

              },

            ],

            [
              {
                text: `Date : ${this.lventeService.listData[0].vente.dateVente.toLocaleString()}`,
                alignment: 'right'
              },
            ],

          ]
        },
        /* {
          bold:true,
          text: 'M  : ' +this.lcmdService.listData[0].commande.client.chefService
        }, */
        {
          text: 'LA LISTE DES ARTICLES COMMANDES',
          bold: true,
          fontSize: 14,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {

        },

        this.getListLigneVentes(this.lventeService.listData),
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
    this.router.navigateByUrl('ventes');
  }


}
