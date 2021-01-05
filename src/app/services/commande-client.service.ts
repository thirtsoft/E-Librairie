import { Injectable } from '@angular/core';
import { CommandeClient } from '../models/commande-client';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LigneCmdClient } from '../models/ligne-cmd-client';
import { ClientService } from './client.service';
import { ReportCommande } from '../models/commandeReport';
import { StringResult } from '../models/stringResult';

@Injectable({
  providedIn: 'root'
})
export class CommandeClientService {

  private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : CommandeClient[];
  public formData:  FormGroup;
  list: any={}

  commande: CommandeClient;

  listLigneCmd: LigneCmdClient[];
  orderItems: LigneCmdClient[];

  livr    : any={};
  client : any={};

  constructor(private http: HttpClient,  private clientService: ClientService) { }

  getAllCommandeClients(): Observable<CommandeClient[]> {
    return this.http.get<CommandeClient[]>(`${this.baseUrl}/commandes`);
  }

  public getCommandeClientById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/commandes/${id}`);
  }

  getOrderByID(id:number):any {
    return this.http.get(`${this.baseUrl}/commandes/`+id).toPromise();
  }

  /* createCommandeClient(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/commandesClientes`, info);
  } */

  createCommandeClient() {
    var body = {
      ...this.formData,
      lcomms: this.orderItems
    };
    return this.http.post(`${this.baseUrl}/commandesClientes`, body);
  }

  saveCommande(info: Object) {
    return this.http.post(`${this.baseUrl}/commandesClientes`, info);
  }

  /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllCommandeClientParPage(page: number, size: number) {
    return this.http.get(this.baseUrl+"/commandes/chercherCategoriesParPages?page="+page+"&size="+size);
  }
  /**
   * Methode pour chercher des categories par nom
   */
  public getCommandeClientByKeyWord(mc: string, page: number, size: number) {
    return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/commandes`, info);
  }

  updateCommandeClient(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/commandes/${id}`, value);
  }

  deleteCommandeClient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/commandes/${id}`, { responseType: 'text' });
  }

  deleteCommande(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/commandes/${id}`, { responseType: 'text' });
  }

  getDocument(id :number) {
    {
      this.getCommandeClientById(id).subscribe(
       response =>{
         this.livr = response;

         }
      );

      this.clientService.getClientById(this.livr.id).subscribe(
        response =>{
          this.client = response;

          }
       );
      sessionStorage.setItem('livr', JSON.stringify(this.livr));
    return {
      content: [
        {
          columns: [
            [

            ],
          ]
        },
        {
          text: 'Bon de Livraison',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 20,20, 20]
        },

        {
          columns: [
            [{
              text: 'Numero : '+ this.livr.numero ,
              style: 'ligne',
              margin: [0,10, 0, 0]
            },
            {
              text: ' Date : ' +this.livr.date_mvt,
              style: 'ligne',
              margin: [0,10, 0, 0]
             },
            {
              text: 'Code :  '+ this.livr.code ,
              style: 'ligne1',
             },
            {
              text: 'Client :  '+ this.livr.chefService ,
              style: 'ligne1',

            },
            {
              text: 'Adresse  :  '+ this.client.adresse ,
              style: 'ligne1',

            },
            {
              text: 'Tel  :  '+ this.client.tel ,
              style: 'ligne1',
            },
            {
              text: 'Mat Fiscale   :  '+ this.client.matfisc ,
              style: 'ligne1',
              },
             ],
          ]
        },

        {
          text: ' ',
          style: 'header'
        },


       this.getDetails(this.livr.llivrs),
       {

       },

       {
        text: ' ',
        style: 'header'
      },

        {
          text: '  Tot ht  : ' + this.livr.totht +  '      Tot Rem  : ' + this.livr.totrem
          +'        Tot Tva   : ' + this.livr.tottva +'      Tot TTC  : ' + this.livr.totttc,
          style: 'total',

        },

        {
          text: 'Signature',
          style: 'sign',
          alignment : 'right'

        },

      ],

        styles: {
          header: {
            fontSize: 18,
            bold: true,

             alignment: 'center',
          },
          name: {
            fontSize: 16,
            bold: true
          },
          total: {
            fontSize: 12,
            bold: true,
            italics: true,

          },
          ligne: {
            fontSize: 12,
            bold: true,
            italics: true
          },
          ligne1: {
            fontSize: 12,
            bold: true,
            italics: true,
            margin: [300,10, 0,0]
          },
          sign: {
            margin: [0, 50, 20, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
            fontSize: 15,
            alignment: 'center',
          }
        }
    };
  }
   }

   getDetails(items: LigneCmdClient[]) {
    return {
      table: {
        widths: [ 200,50,50,50],
        body: [
          [
          {
            text: 'Désignation',
            style: 'tableHeader'
          },
          {
            text: 'Prix',
            style: 'tableHeader'
          },
          {
            text: 'Qté',
            style: 'tableHeader'
          },

          {
            text: 'Mont Ht',
            style: 'tableHeader'
          },
          ],

          ...items.map(ed => {
           return [ed.quantite, ed.produit.designation, ed.prix, ed.quantite*ed.prix];
          })
        ]
      }
    };
  }

  reportCommande = (report: ReportCommande): Observable<StringResult> => {
    const data = JSON.stringify(report);
    const urlSend = this.baseUrl+ "/reports/commande/pdf";
    return this.http.post<StringResult>(urlSend, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

  }

  public generateReport(id: number){
    return this.http.get<any>("http://localhost:8080/alAmine/report/pdf"+"/"+ id);
  }


}
