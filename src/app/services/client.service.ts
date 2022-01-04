import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import Dexie from 'dexie';
import { OnlineofflineService } from './onlineoffline.service';

import { Client } from '../models/client';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

 // baseUrl_1 = environment.apiBaseUrl;

 // baseUrl_1 = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

  baseUrl_1 = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";

//  private baseUrl_1 = 'http://localhost:8080/Library-0.0.1-SNAPSHOT/prodApi';

 /*  private db: Dexie;
  private tableClient: Dexie.Table<Client, number>; */

  Data;
  listDataClt: any[] = [];

 // private baseUrl_1 = window["cfgApibaseUrl_1"];

  choixmenu : string  = 'A';
  listData : Client[];
  formData:  Client;

  dataForm:  FormGroup;

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

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl_1}/clients/all`);
  }

  getAllClientsOrderDesc(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl_1}/clients/allClientOrderDesc`);
  }

  public getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl_1}/clients/findById/${id}`);
  }

  getClientByID(id:number):any {
    return this.http.get(`${this.baseUrl_1}/clients/findById/`+id).toPromise();
  }

  createClient(info: Client): Observable<Client> {
    return this.http.post<Client>(`${this.baseUrl_1}/clients/create`, info);
  }

  createData(info: Client): Observable<Client> {
    return this.http.post<Client>(`${this.baseUrl_1}/clients/create`, info);
  }

  updateClient(id: number, value: Client): Observable<Client> {
    return this.http.put<Client> (`${this.baseUrl_1}/clients/update/${id}`, value);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/clients/delete/${id}`, { responseType: 'text' });
  }

  getClientGroupByRaisonSocial() {
    return this.http.get(`${this.baseUrl_1}/clients/ListClientGroupByRaisonSocial`);
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
