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

  baseUrl = environment.apiBaseUrl

  Data;
  listDataClt: any[] = [];

 // private baseUrl = window["cfgApibaseUrl"];

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
    return this.http.get<Client[]>(`${this.baseUrl}/clients/all`);
  }

  getAllClientsOrderDesc(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/clients/allClientOrderDesc`);
  }

  public getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/clients/findById/${id}`);
  }

  getClientByID(id:number):any {
    return this.http.get(`${this.baseUrl}/clients/findById/`+id).toPromise();
  }

  createClient(info: Client): Observable<Client> {
    return this.http.post<Client>(`${this.baseUrl}/clients/create`, info);
  }

  createData(info: Client): Observable<Client> {
    return this.http.post<Client>(`${this.baseUrl}/clients/create`, info);
  }

  updateClient(id: number, value: Client): Observable<Client> {
    return this.http.put<Client> (`${this.baseUrl}/clients/update/${id}`, value);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/clients/delete/${id}`, { responseType: 'text' });
  }

  getClientGroupByRaisonSocial() {
    return this.http.get(`${this.baseUrl}/clients/ListClientGroupByRaisonSocial`);
  }


}
