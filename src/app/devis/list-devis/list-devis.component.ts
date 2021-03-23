import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Client } from 'src/app/models/client';
import { Devis } from 'src/app/models/devis';
import { LigneDevis } from 'src/app/models/ligne-devis';
import { DevisService } from 'src/app/services/devis.service';
import { DialogService } from 'src/app/services/dialog.service';
import { map } from 'rxjs/operators';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-list-devis',
  templateUrl: './list-devis.component.html',
  styleUrls: ['./list-devis.component.scss']
})
export class ListDevisComponent implements OnDestroy, OnInit {

  listData;
  client: Client;
  devis: Devis;
  devisItems: LigneDevis;

  private editForm: FormGroup;

  id: number ;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: DevisService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private dialogService: DialogService,private datePipe : DatePipe,
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.crudApi.getAllDevis().subscribe(
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

  getListDevis() {
    this.crudApi.getAllDevis().subscribe(
      response =>{
        this.crudApi.listData = response;
      });
  }

  onCreateDevis() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("devis");
  }

  editDevis(item: Devis) {
    this.crudApi.formData = this.fb.group(Object.assign({}, item));
    this.crudApi.choixmenu = "M"
    this.router.navigate(['/devis']);
  }

  viewDevis(item: Devis) {
    this.router.navigateByUrl('devisView/' + item.id);
  }
  deleteDevis(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteDevis(id).subscribe(data => {
          this.toastr.warning('Devis supprimé avec succès!');
          this.rerender();
          this.getListDevis();
          this.router.navigate(['/devis']);
        });
      }
    });
  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd, h:mm:ss');
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
                text: `FACTURE N° : ${this.crudApi.listData[0].numeroDevis}`,
                fontSize: 14,
                bold: true,

              },

            ],

            [
              {
                text: `Date: ${this.crudApi.listData[0].dateDevis.toLocaleString()}`,
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

  getListArticle(item: Devis[]) {
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
            return ([x.ldevis[0].produit.designation, x.ldevis[0].quantite,
              x.ldevis[0].prixDevis, (x.ldevis[0].quantite*x.ldevis[0].prix).toFixed(2)])
          }),
          [{text: 'Total Amount', colSpan: 3}, {}, {}, this.crudApi.listData.reduce((sum, x)=> sum + (x.ldevis[0].quantite * x.ldevis[0].prixDevis), 0).toFixed(2)]
        ]
      }
    }

  }

}
