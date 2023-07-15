import { Injectable } from '@angular/core';
import { CommandeClient } from '../models/commande-client';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LigneCmdClient } from '../models/ligne-cmd-client';
import { ClientService } from './client.service';
import Dexie from 'dexie';
import { OnlineofflineService } from './onlineoffline.service';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommandeClientService {
  
  baseUrl_1 = environment.apiBaseUrl;

//  baseUrl_1 = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";

  private db: Dexie;
  private tableCmdClient: Dexie.Table<CommandeClient, number>;

  Data;
  listDataCmd: any[] = [];

 // private baseUrl_1 = window["cfgApibaseUrl_1"];

  choixmenu : string  = 'A';
  listData : CommandeClient[];
  formData:  FormGroup;
  list: any={}

  commande: CommandeClient;

  listLigneCmd: LigneCmdClient[];
  orderItems: LigneCmdClient[];

  livr    : any={};
  client : any={};

  numero;
  numCommande;

  private listners = new Subject<any>();

  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  constructor(private http: HttpClient,
              private clientService: ClientService,
              private offlineService: OnlineofflineService) {
             /*  this.ouvrirStatusConnexion();
              this.connectToDatabase();
              this.addAllDataCommandeToIndexeddb(); */
  }

  getAllCommandeClients(): Observable<CommandeClient[]> {
    return this.http.get<CommandeClient[]>(`${this.baseUrl_1}/commandes/all`);
  }

  getAllCommandesOrderDesc(): Observable<CommandeClient[]> {
    return this.http.get<CommandeClient[]>(`${this.baseUrl_1}/commandes/allCommandeClientOrderDesc`);
  }

  getAllCommandesOf3LatestMonths(): Observable<CommandeClient[]> {
    return this.http.get<CommandeClient[]>(`${this.baseUrl_1}/commandes/allCommandeClientOf3LatestMonths`);
  }

  getTop500CommandesOrderByIdDesc(): Observable<CommandeClient[]> {
    return this.http.get<CommandeClient[]>(`${this.baseUrl_1}/commandes/findTop500OfCommandeClientOrderByIdDesc`);
  }

  public getCommandeClientById(id: number): Observable<CommandeClient> {
    return this.http.get<CommandeClient> (`${this.baseUrl_1}/commandes/findById/${id}`);
  }

  getOrderByID(id:number):any {
    return this.http.get(`${this.baseUrl_1}/commandes/findById/`+id).toPromise();
  }


  createCommandeClient() {
    var body = {
      ...this.formData,
      lcomms: this.orderItems
    };
    return this.http.post(`${this.baseUrl_1}/commandes/commandesClientes`, body);
  }

  saveCommande(info: CommandeClient, id:number) {
    return this.http.post(`${this.baseUrl_1}/commandes/commandesClientes?id=`+id, info);
  }


/*   saveCommande(info: Object) {
    return this.http.post(`${this.baseUrl_1}/commandesClientes`, info);
  } */
  updateCommandeClient(id: number, value: CommandeClient): Observable<CommandeClient> {
    return this.http.put<CommandeClient>(`${this.baseUrl_1}/commandes/update/${id}`, value);
  }

  deleteCommandeClient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/commandes/delete/${id}`, { responseType: 'text' });
  }

  deleteCommande(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/commandes/delete/${id}`, { responseType: 'text' });
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

  public generateReport(id: number){
  //  return this.http.get<any>("http://localhost:8080/alAmine/report/pdf"+"/"+ id);

    return this.http.get(`${this.baseUrl_1}/commandes/report/pdf`+"/"+ id);
  }

  generateNumCommande(): Observable<any> {
  //  return this.http.get("http://localhost:8081/prodApi/generateCodeCommand");

    return this.http.get(`${this.baseUrl_1}/commandes/generateCodeCommand`);
  }

  getNumeroCommande() {
    this.generateNumCommande().subscribe(
      response =>{
        this.numCommande = response;
        console.log("Numero Vente:" + this.numCommande);
      }
    );
  }

  // ouvrir la base de données
  connectToDatabase(): void {
    this.db.open().catch((error) => {
      alert("Errod during connecting to database : " + error);
    });

  }

  async addAllDataCommandeToIndexeddb() {
    await this.http.get<CommandeClient[]>(`${this.baseUrl_1}/commandes`).subscribe(response => {
      this.listDataCmd = response;
      this.db.transaction('rw', this.tableCmdClient, async ()=> {
        console.log(this.listDataCmd);
        for (let i = 0; i < this.listDataCmd.length; i++) {
          this.tableCmdClient.put(this.listDataCmd[i]);
        }
      });
    })
  }

  private async sendDataFromIndexedDbToAPI() {
    const todosCategorie: CommandeClient[] = await this.tableCmdClient.toArray();
    console.log(todosCategorie);
    for(const categorie of todosCategorie) {
      console.log(categorie);
 //     this.createCategorieAPI(categorie);
      await this.tableCmdClient.delete(categorie.id);
      console.log('Categorie com id ${categorie.id} foi excluddo com successfull');
    }
  }


  private ouvrirStatusConnexion() {
    this.offlineService.statusConnexion
      .subscribe(online => {
        if(online) {
         this.sendDataFromIndexedDbToAPI();
        }else {
          console.log('Mode offline active');
        }
      });
  }



}
