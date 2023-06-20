import { LigneCreance } from './../../models/ligne-creance';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientService } from 'src/app/services/client.service';
import { TokenStorageService } from './../../auth/token-storage.service';
import { LigneCreanceService } from 'src/app/services/ligne-creance.service';
import { CreanceService } from 'src/app/services/creance.service';
import { Creance } from './../../models/creance';
import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DatePipe } from '@angular/common';

import { Client } from './../../models/client';
import { VenteService } from 'src/app/services/vente.service';
import { LigneVenteService } from 'src/app/services/ligne-vente.service';
import { LigneVente } from 'src/app/models/ligne-vente';
import { Produit } from './../../models/produit';

import { map } from 'rxjs/operators';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit {

  listData: Client[];
  clientId: number;

  numeroCreance;
  totalCreance;
  dateCreance;

  creance: Creance = new Creance();

  username = '';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  listCreanceData: Creance[];
  listDataClient: Client = new Client();

  currentPage: number = 1;
  totalPages: number;
  pages: Array<number>;

  roles: string[];

  currentTime: number = 0;

  isLoggedIn = false;

  email: String;
  userId;

  customerName: string;
  customerUsername: string;
  customerEmail: string;
  customerMobile: string;
  customerPassword: string;

  currentUser;
  id : number;
  paramId :any = 0;

  constructor(public crudApi: CreanceService,
              public lcreanceService: LigneCreanceService,
              public toastr: ToastrService,
              public authService: AuthService,
              public tokenService: TokenStorageService,
              public clientServie: ClientService,
              public fb: FormBuilder,
              private router : Router,
              private datePipe : DatePipe,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public route: ActivatedRoute,
 //             public dialogRef:MatDialogRef<CreateVenteComponent>,
  ) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 30,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.paramId = this.route.snapshot.paramMap.get('id');
     console.log('Param--', this.paramId);
    if(this.paramId  && this.paramId  > 0){
      this.getCreanceDataByCustomerId(this.paramId);

      this.getClientDataById(this.paramId);

    }

    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;

      this.username = user.username;
      this.userId = user.id;

    }

  }

  getCreanceDataByCustomerId(id: number) {
    this.crudApi.getAllPendingCreanesByCustomerId(id).subscribe(
      (response: Creance[]) => {
        console.log('data--', response);
        this.listCreanceData = response;
      //  this.dtTrigger.next();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }


  getClientDataById(id: number) {
    console.log('getOne');
    this.clientServie.getClientById(id).subscribe(
      (response: Client) => {
        console.log('data--', response);
        this.listDataClient = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

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
          text: 'WOKITE SARL',
          fontSize: 20,
          alignment: 'center',
          color: '#0000ff',
          decoration: 'underline',
          style: 'name',
        },
        {
          text: 'Prestation de Service & Ingénierie Logigiel et Systèmes - Formation - Consultance - Audit',
          fontSize: 12,
          alignment: 'center',
          bold: true,
          color: '#0000ff'
        },
        {
          text: 'Hann-Mariste 2 – Dakar / Sénégal - RC : SN.DKR.2021.A.15470',
          fontSize: 11,
          alignment: 'center',
          bold: true,
          color: '#0000ff'
        },
        {
          text: 'Tél: +221 77 944 03 10 / Email: contact@wokite.net',
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

            ],

          ]
        },

        {
          text: 'LISTE DES CLIENTS',
          alignment: 'center',
          fontSize: 15,
          color: '#0000ff',
          bold: true,
          margin: [0, 8, 0, 8],
        },

        {
          text: 'Nom&Prenom : ' +this.listDataClient.raisonSocial,
          alignment: 'left',
          margin: [0, 5, 0, 5]
        },

        {
          text: 'Adresse : ' +this.listDataClient.adresse,
          alignment: 'left',
          margin: [0, 5, 0, 5]
        },

        {
          text: 'Mobile : ' +this.listDataClient.mobile,
          alignment: 'left',
          margin: [0, 5, 0, 5]
        },

        {
          text: 'Email : ' +this.listDataClient.email,
          alignment: 'left',
          margin: [0, 5, 0, 5]
        },

        {

        },

        this.getListArticle(this.listCreanceData),
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
          fontSize: 12,
          alignment: 'center'
        },

      }
    };

  }

  getListArticle(item: Creance[]) {
    return {
      table: {
        widths: ['auto', 'auto', '*', 'auto'],
        body: [
          [
            {
              text: 'Creance',
              style: 'tableHeader'
            },

            {
              text: 'Montant Avance',
              style: 'tableHeader'
            },
            {
              text: 'Montant total',
              style: 'tableHeader'
            },
            {
              text: 'Net A Payer',
              style: 'tableHeader'
            },


          ],

          ...item.map(x => {
            return ([x.reference, x.avanceCreance, x.totalCreance,
              (x.totalCreance - x.avanceCreance).toFixed(2)])
          }),

           [
            {
              text: 'MONTANT RESTANT A PAYER',
              alignment: 'center',
              colSpan: 3
            }, {}, {},
            this.listCreanceData.reduce((sum, x)=> sum + (x.totalCreance - x.avanceCreance), 0).toFixed(2)
          ]
        ],

      }
    }

  }


  onGoBack() {
    this.router.navigateByUrl('home/clients');
  }

  viewCreance(item: Creance) {
    this.router.navigateByUrl('home/creanceView/' + item.id);
  }


}
