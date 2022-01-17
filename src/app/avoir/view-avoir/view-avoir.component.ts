import { Produit } from './../../models/produit';
import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Avoir } from 'src/app/models/avoir';
import { LigneAvoir } from 'src/app/models/ligne-avoir';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { AvoirService } from 'src/app/services/avoir.service';
import { FormBuilder } from '@angular/forms';
import { LigneAvoirService } from 'src/app/services/ligne-avoir.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CreateAvoirComponent } from '../create-avoir/create-avoir.component';
import { map } from 'rxjs/operators';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-view-avoir',
  templateUrl: './view-avoir.component.html',
  styleUrls: ['./view-avoir.component.scss']
})
export class ViewAvoirComponent implements OnInit {

  listData: Avoir[];
  listDatalcmd: LigneAvoir[];
  avoirId: number;
  numeroAvoir;
  totalAvoir;
  fournisseur;
  dateAvoir;

  produit: Produit = new Produit();

  @ViewChild('content') content: ElementRef;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: AvoirService,
              public lavoirService: LigneAvoirService,
              public toastr: ToastrService,
              public fb: FormBuilder,
              private datePipe : DatePipe,
              private router : Router,
              private matDialog: MatDialog,
              public route: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<CreateAvoirComponent>,
  ) { }

  ngOnInit(): void {
    this.avoirId = this.route.snapshot.params.id;
    console.log(this.avoirId);
    this.lavoirService.getAllLigneAvoirByAvoir(this.avoirId).subscribe((data: LigneAvoir[]) => {
      this.lavoirService.listData = data;
    //  this.currentCommande = data;
      console.log(this.lavoirService.listData);

      console.log(this.lavoirService.listData[0].numero);
      this.numeroAvoir = this.lavoirService.listData[0].numero;
      console.log(this.lavoirService.listData[0].avoir.totalAvoir);
      this.totalAvoir = this.lavoirService.listData[0].avoir.totalAvoir;
      this.dateAvoir = this.lavoirService.listData[0].avoir.dateAvoir;
      this.fournisseur = this.lavoirService.listData[0].avoir.fournisseur.raisonSociale;
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

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd, h:mm:ss');
  }

  getListAvoirs() {
    this.crudApi.getAllAvoirs().subscribe(
      response =>{
        this.listData = response;
      });
  }

  onCreateAvoir() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("home/avoir");
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
                text: `Date: ${this.lavoirService.listData[0].avoir.dateAvoir.toLocaleString()}`,
                alignment: 'right',
                margin: [0, 15, 0, 15]
              },
            ],

          ]
        },
        {
          text: 'FACTURE AVOIR',
          alignment: 'center',
          fontSize: 15,
          color: '#0000ff',
          bold: true,
          margin: [0, 5, 0, 5],
        },
        {
          text: `N° : ${this.lavoirService.listData[0].avoir.reference}`,
          bold: true,
          fontSize: 14,
          alignment: 'center',
          color: '#0000ff',
          margin: [0, 8, 0, 8]
        },
        {
          text: 'Pour  : ' +[(this.lavoirService.listData[0].avoir.fournisseur.raisonSociale)],
          alignment: 'left',
          margin: [0, 8, 0, 8]
        },

        {

        },

        this.getListAvoir(this.lavoirService.listData),
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
  getListAvoir(item: LigneAvoir[]) {
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
            this.lavoirService.listData.reduce((sum, x)=> sum + (x.quantite * x.prix), 0).toFixed(2)
          ]
        ]
      }
    }

  }

  onGoBack() {
    this.router.navigateByUrl('home/avoirs');
  }

  deleteAvoir(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cet Avoir ?')) {
    this.crudApi.deleteAvoir(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Avoir supprimé avec succès!');
          this.rerender();
          this.getListAvoirs();
      },
        error => console.log(error));
    }
  }

}
