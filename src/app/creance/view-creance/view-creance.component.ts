import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Article } from 'src/app/models/article';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Creance } from 'src/app/models/creance';
import { LigneCreance } from 'src/app/models/ligne-creance';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CreanceService } from 'src/app/services/creance.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { LigneCreanceService } from 'src/app/services/ligne-creance.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CreateCreanceComponent } from '../create-creance/create-creance.component';
import { map } from 'rxjs/operators';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  client;

  produit: Article = new Article();

  private editForm: FormGroup;

  @ViewChild('content') content: ElementRef;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: CreanceService,public fb: FormBuilder,
    public toastr: ToastrService,  private lcreanceService: LigneCreanceService,
    private router : Router, private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private route: ActivatedRoute,
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
      this.client = this.lcreanceService.listData[0].creance.client.chefService;
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
    this.router.navigateByUrl("creance");
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
                text: `FACTURE N° : ${this.lcreanceService.listData[0].numero}`,
                fontSize: 14,
                bold: true,

              },

            ],

            [
              {
                text: `Date : ${this.lcreanceService.listData[0].creance.dateCreance.toLocaleString()}`,
                alignment: 'right'
              },
            ],

          ]
        },
        {
          bold:true,
          text: 'M  : ' +this.lcreanceService.listData[0].creance.client.chefService
        },
        {
          text: 'LA LISTE DES ARTICLES COMMANDES',
          bold: true,
          fontSize: 14,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {

        },

        this.getListLigneCreances(this.lcreanceService.listData),
        {

        },

        {
          bold:true,
          alignment: 'right',
          fontSize: 14,
          text: 'Sole Creance  : ' +this.lcreanceService.listData[0].creance.soldeCreance
        },

        {
          bold:true,
          alignment: 'right',
          fontSize: 14,
          text: 'Somme Reste A Payer  : ' +((this.lcreanceService.listData[0].creance.totalCreance)-(this.lcreanceService.listData[0].creance.soldeCreance))
        },

        {
          bold:true,
          alignment: 'right',
          fontSize: 14,
          text: 'Montant Total : ' +this.lcreanceService.listData[0].creance.totalCreance
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
  getListLigneCreances(item: LigneCreance[]) {
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
        ]
      }
    }

  }

  onGoBack() {
    this.router.navigateByUrl('creances');
  }


}
