import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import Dexie from 'dexie';
import { OnlineofflineService } from './onlineoffline.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

//  private baseUrl_1 = 'http://localhost:8080/Library-0.0.1-SNAPSHOT/prodApi';
  private baseUrl_1 = 'http://localhost:8081/alAmine';
//  private baseUrl_1 = 'http://localhost:8081/prodApi'
 /*  private db: Dexie;
  private tableClient: Dexie.Table<Client, number>; */

  Data;
  listDataClt: any[] = [];


//  private baseUrl_1 = 'http://localhost:8080/alAmine';
 // private baseUrl_1 = window["cfgApibaseUrl_1"];
 // private baseUrl_1 = '/api/categories';
  choixmenu : string  = 'A';
  listData : Client[];
  public formData:  Client;

  public dataForm:  FormGroup;

  private listners = new Subject<any>();
  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient,
    private offlineService: OnlineofflineService) {
     /*  this.ouvrirStatusConnexion();
      this.connectToDatabase();
      this.addAllDataClientToIndexeddb(); */

  }

  getAllClients(): Observable<any> {
    return this.http.get(`${this.baseUrl_1}/clients`);
  }

  public getClientById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl_1}/clients/${id}`);
  }

  getClientByID(id:number):any {
    return this.http.get(`${this.baseUrl_1}/clients/`+id).toPromise();
  }

  createClient(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl_1}/clients`, info);
  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl_1}/clients`, info);
  }

  updateClient(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl_1}/clients/${id}`, value);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/clients/${id}`, { responseType: 'text' });
  }

  getClientGroupByRaisonSocial() {
    return this.http.get(`${this.baseUrl_1}/ListClientGroupByRaisonSocial`);
  }

  // ouvrir la base de données
  /* connectToDatabase(): void {
    this.db.open().catch((error) => {
      alert("Errod during connecting to database : " + error);
    });

  } */

 /*  async addAllDataClientToIndexeddb() {
    await this.http.get<Client[]>(`${this.baseUrl_1}/clients`).subscribe(response => {
      this.listDataClt = response;
      this.db.transaction('rw', this.tableClient, async ()=> {
        console.log(this.listDataClt);
        for (let i = 0; i < this.listDataClt.length; i++) {
          this.tableClient.put(this.listDataClt[i]);
        }
      });
    })
  }

  private async sendDataFromIndexedDbToAPI() {
    const todosCategorie: Client[] = await this.tableClient.toArray();
    console.log(todosCategorie);
    for(const categorie of todosCategorie) {
      console.log(categorie);
  //    this.createCategorieAPI(categorie);
      await this.tableClient.delete(categorie.id);
      console.log('Categorie com id ${categorie.id} foi excluddo com successfull');
    }
  } */
  /* private ouvrirStatusConnexion() {
    this.offlineService.statusConnexion
      .subscribe(online => {
        if(online) {
         this.sendDataFromIndexedDbToAPI();
        }else {
          console.log('Mode offline active');
        }
      });
  } */

}
