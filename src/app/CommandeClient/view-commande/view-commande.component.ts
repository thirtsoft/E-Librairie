import { Component, OnInit, ViewChild, Inject, OnDestroy, ElementRef } from '@angular/core';
import { CommandeClient } from 'src/app/models/commande-client';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CommandeClientService } from 'src/app/services/commande-client.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CreateCommandeClientComponent } from '../create-commande-client/create-commande-client.component';
import { Client } from 'src/app/models/client';
import { LigneCmdClientService } from 'src/app/services/ligne-cmd-client.service';
import { LigneCmdClient } from 'src/app/models/ligne-cmd-client';
import { Article } from 'src/app/models/article';
import { map } from 'rxjs/operators';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-view-commande',
  templateUrl: './view-commande.component.html',
  styleUrls: ['./view-commande.component.scss']
})
export class ViewCommandeComponent implements OnDestroy, OnInit {

  listData: CommandeClient[];
  listDatalcmd: LigneCmdClient[];
  cmdClient: CommandeClient;
  currentCmdClient;

  comId: number;
  currentCommande;
  numeroCommande;
  totalCommande;
  dateCommande;
  client;

  produit: Article = new Article();

  private editForm: FormGroup;

  @ViewChild('content') content: ElementRef;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: CommandeClientService,public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog, public lcmdService: LigneCmdClientService,
    @Inject(MAT_DIALOG_DATA) public data: any, public route: ActivatedRoute,
    public dialogRef:MatDialogRef<CreateCommandeClientComponent>,
    ) { }

  ngOnInit(): void {
    this.comId = this.route.snapshot.params.id;
    console.log(this.comId);
    this.lcmdService.getAllLigneCmdClientByCommande(this.comId).subscribe((data: LigneCmdClient[]) => {
      this.lcmdService.listData = data;
    //  this.currentCommande = data;
      console.log(this.lcmdService.listData);

      console.log(this.lcmdService.listData[0].numero);
      this.numeroCommande = this.lcmdService.listData[0].numero;
      console.log(this.lcmdService.listData[0].commande.totalCommande);
      this.totalCommande = this.lcmdService.listData[0].commande.totalCommande;
      console.log(this.lcmdService.listData[0].commande.dateCommande);
      this.dateCommande = this.lcmdService.listData[0].commande.dateCommande;
      this.client = this.lcmdService.listData[0].commande.client.chefService;
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

  getListCommandeClients() {
    this.crudApi.getAllCommandeClients().subscribe(
      response =>{
        this.listData = response;
      });
  }

  onCreateCommandeClient() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("commandeclient");
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

            [
              {
                text: `FACTURE N° : ${this.lcmdService.listData[0].numero}`,
                fontSize: 12,
                bold: true,
                margin: [0, 15, 0, 15]
              },

            ],

            [
              {
                text: `Date : ${this.lcmdService.listData[0].commande.dateCommande.toLocaleString()}`,
                alignment: 'right',
                margin: [0, 15, 0, 15]
              },
            ],

          ]
        },

        {
          text: ' FACTURE',
          alignment: 'center',
          fontSize: 20,
          color: '#0000ff',
          bold: true,
          margin: [0, 5, 0, 5]
        },
        {
        //  bold:true,
          text: 'CLIENT : ' +this.lcmdService.listData[0].commande.client.chefService,
          alignment: 'left',
          margin: [0, 8, 0, 8]
        },

        {

        },

        this.getListArticle(this.lcmdService.listData),
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
  getListArticle(item: LigneCmdClient[]) {
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
            return ([x.quantite, x.produit.designation, x.prixCommande,
              (x.quantite*x.prixCommande).toFixed(2)])
          }),
          [
            {
              text: 'MONTANT TOTAL',
              alignment: 'center',
              colSpan: 3
            }, {}, {},
            this.lcmdService.listData.reduce((sum, x)=> sum + (x.quantite * x.prixCommande), 0).toFixed(2)
          ]
        ]
      }
    }

  }

  onGoBack() {
    this.router.navigateByUrl('commandeclients');
  }

  Imprimer() {
    this.crudApi.generateReport(this.comId).subscribe(
      (result) => {
        this.toastr.success("Commande are successfully exported")
        },(error) => {
          this.toastr.warning("Commande are not successfully exported")
        }
    );

  }

  Imprimers() {
    const document = this.getDocument();
    pdfMake.createPdf(document).download();
  }

  ImprimerPdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).download();
  }

}
