import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vente } from '../models/vente';
import { HttpClient } from '@angular/common/http';
import { LigneVente } from '../models/ligne-vente';
import { FormGroup } from '@angular/forms';
import Dexie from 'dexie';
import { OnlineofflineService } from './onlineoffline.service';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

 // private baseUrl_1 = 'http://localhost:8081/apiSeller';
  private baseUrl_1 = 'http://localhost:8081/alAmine';
  private db: Dexie;
  private tableVent: Dexie.Table<Vente, number>;
  private tableLvent: Dexie.Table<LigneVente, number>;


  Data;
  listDataVente: any[] = [];
  listDataLigneVente: any[] = [];

 // private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

   choixmenu : string  = 'A';
   listData : Vente[];
   public formData:  FormGroup;
   list: any={};
   vente: Vente;

   listLigneVente: LigneVente[];


   orderItems: LigneVente[];

   constructor(private http: HttpClient,
    private offlineService: OnlineofflineService) {
      this.ouvrirStatusConnexion();

      this.addAllDataVenteToIndexeddb();
      this.addAllDataLigneVenteToIndexeddb();
  }

   getAllVentes(): Observable<Vente[]> {
     return this.http.get<Vente[]>(`${this.baseUrl_1}/ventes`);
   }

   public getVenteById(id: number): Observable<Object> {
     return this.http.get(`${this.baseUrl_1}/ventes/${id}`);
   }

   getVenteID(id:number):any {
     return this.http.get(`${this.baseUrl_1}/ventes/${id}`).toPromise();
   }

   getSumVenteByDay(): Observable<any> {
     return this.http.get(`${this.baseUrl_1}/searchSumsOfVenteByDay`);
   }

   createVente() {
     var body = {
       ...this.formData,
       ligneVentes: this.orderItems
     };
     return this.http.post(`${this.baseUrl_1}/ventes`, body);
   }

   saveVente(info: Object) {
    return this.http.post(`${this.baseUrl_1}/ventes`, info);
  }


   createData(info: Object): Observable<Object> {
     return this.http.post(`${this.baseUrl_1}/ventes`, info);
   }

   updateVente(id: number, value: any): Observable<Object> {
     return this.http.put(`${this.baseUrl_1}/ventes/${id}`, value);
   }

  deleteVente(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/ventes/${id}`, { responseType: 'text' });
  }

  // Dexie and OffLine&OnLine


  private async addAllDataVenteToIndexeddb() {
    await this.http.get<Vente[]>(`${this.baseUrl_1}/ventes`).subscribe(response => {
      this.listDataVente = response;
      this.db.transaction('rw', this.tableVent, async ()=> {
        console.log(this.listDataVente);
        for (let i = 0; i < this.listDataVente.length; i++) {
          this.tableVent.put(this.listDataVente[i]);
        }
      });
    })

  }

  private async addAllDataLigneVenteToIndexeddb() {
    await this.http.get<LigneVente[]>(`${this.baseUrl_1}/ligneVentes`).subscribe(response => {
      this.listDataLigneVente = response;
      this.db.transaction('rw', this.tableLvent, async ()=> {
        console.log(this.listDataLigneVente);
        for (let i = 0; i < this.listDataLigneVente.length; i++) {
          this.tableLvent.put(this.listDataLigneVente[i]);
        }
      });
    })

  }

  createVenteAPI(vente: Vente) {
    return this.http.post(`${this.baseUrl_1}/ventes`, vente);
  }


  creerVente(info: Vente)  {
    if (this.offlineService.isOnLine) {
      console.log("Debut Ajout via API");
      this.createVenteAPI(info);
      console.log('Vente ajouter via API');
    }else {
      console.log(info);
      this.createOrderToIndexedDB(info);
      console.log('Vente ajouter via IndexedDb');
    }
  }

  private async createOrderToIndexedDB(order: Vente) {
    const orderitems: LigneVente[] = [];
    await this.tableVent.put(order).then((id)  => {
      this.tableLvent.bulkPut(orderitems).then(ids => {return true;}).catch(err => {
          console.log(`error while creating the order items ${err}`);
          throw new Error("failed to create the order and order items");
        });
      });
  }
/*
  private async createVenteToIndexedDb(categorie: Vente) {
    try {
      console.log(categorie);
      await this.tableVent.add(categorie);
      const todosCategorie: Vente[] = await this.tableVent.toArray();
      console.log(categorie);
      console.log('Categorie ajouté non IndexedDb', todosCategorie);
    } catch (error) {
      console.log('erreur ajout categorie no indexedDb', error);
    }
  }
 */
  private async sendDataFromIndexedDbToAPI() {
    const todosVente: Vente[] = await this.tableVent.toArray();
    console.log(todosVente);
    for(const vente of todosVente) {
      console.log(vente);
      this.createVenteAPI(vente);
      await this.tableVent.delete(vente.id);
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
