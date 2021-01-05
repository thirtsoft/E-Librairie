import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CommandeClient } from 'src/app/models/commande-client';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { CommandeClientService } from 'src/app/services/commande-client.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CreateCommandeClientComponent } from '../create-commande-client/create-commande-client.component';
import { map } from 'rxjs/operators';
import { Client } from 'src/app/models/client';
import { DataTableDirective } from 'angular-datatables';
import { DialogService } from 'src/app/services/dialog.service';
import { DatePipe } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { LigneCmdClient } from 'src/app/models/ligne-cmd-client';
import { ClientService } from 'src/app/services/client.service';
import { ReportCommande } from 'src/app/models/commandeReport';
import { StringResult } from 'src/app/models/stringResult';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-list-commande-client',
  templateUrl: './list-commande-client.component.html',
  styleUrls: ['./list-commande-client.component.scss']
})
export class ListCommandeClientComponent implements OnDestroy, OnInit {

  listData;
  client: Client;
  order: CommandeClient;
  orderItems: LigneCmdClient;

  private editForm: FormGroup;

  report: ReportCommande = new ReportCommande();
  reportName: StringResult = new StringResult();

  id: number ;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: CommandeClientService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private dialogService: DialogService,private datePipe : DatePipe,
  /*@Inject(MAT_DIALOG_DATA) public data: any,
      private matDialog: MatDialog,

    public dialogRef:MatDialogRef<CreateCommandeClientComponent>,*/
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.crudApi.getAllCommandeClients().subscribe(
      response =>{
        this.crudApi.listData = response;
        console.log(this.listData);
        this.dtTrigger.next();
      }
    );

    this.client = new Client();
    console.log(this.client);
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
        this.crudApi.listData = response;
      });
  }

  onCreateCommandeClient() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("commandeclient");
  }

  editerCommandeClient(item : CommandeClient) {
    this.router.navigateByUrl('commandeclient/'+item.id);
  }

  editCommandeClient(item: CommandeClient) {
    this.crudApi.formData = this.fb.group(Object.assign({}, item));
    this.crudApi.choixmenu = "M"
    this.router.navigate(['/commandeclient']);
  }

  viewCommandeClient(item: CommandeClient) {
    this.router.navigateByUrl('commandeView/' + item.id);
  }
  deleteCommandeClient(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteCommande(id).subscribe(data => {
          this.toastr.warning('Commande supprimé avec succès!');
          this.rerender();
          this.getListCommandeClients();
          this.router.navigate(['/commandeclients']);
        });
      }
    });
  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd, h:mm:ss');
  }

  /*  deleteCommandeClient(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cette Commande ?')) {
    this.crudApi.deleteCommandeClient(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Commande supprimé avec succès!');
          this.rerender();
          this.getListCommandeClients();
      },
        error => console.log(error));
    }

  } */

  ImprimerFactures() {
    this.report.name = 'FactureCommande';
    this.crudApi.reportCommande(this.report).subscribe(
      result => {
        this.reportName = result;
      }
    );

  }

  ImprimerFacture(){
    this.crudApi.generateReport(this.id).subscribe(
      (result) => {
        this.toastr.success("Commande are successfully exported")
        },(error) => {
          this.toastr.warning("Commande are not successfully exported")
        }
    );
  }


  Imprimer() {
    const document = this.getDocument();
    pdfMake.createPdf(document).open();
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
                text: `FACTURE N° : ${this.crudApi.listData[0].numeroCommande}`,
                fontSize: 14,
                bold: true,

              },

            ],

            [
              {
                text: `Date: ${this.crudApi.listData[0].dateCommande.toLocaleString()}`,
                alignment: 'right'
              },
            ],

          ]
        },
        {
          bold:true,
          text: 'M  : ' +this.crudApi.listData[0].client.chefService
        },
        {
          text: 'LA LISTE DES ARTICLES',
          bold: true,
          fontSize: 14,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {

        },

        this.getListArticle(this.crudApi.listData),
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

  getListArticle(item: CommandeClient[]) {
    return {
      table: {
        widths: ['*', 'auto', 'auto', 'auto'],
        body: [
          [
            {
              text: 'DESIGNATION',
              style: 'tableHeader'
            },
            {
              text: 'QUANTITE',
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
            return ([x.lcomms[0].produit.designation, x.lcomms[0].quantite,
              x.lcomms[0].prix, (x.lcomms[0].quantite*x.lcomms[0].prix).toFixed(2)])
          }),
          [{text: 'Total Amount', colSpan: 3}, {}, {}, this.crudApi.listData.reduce((sum, x)=> sum + (x.lcomms[0].quantite * x.lcomms[0].prix), 0).toFixed(2)]
        ]
      }
    }

  }



}
