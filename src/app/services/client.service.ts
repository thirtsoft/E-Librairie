import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];
 // private baseUrl = '/api/categories';
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

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/clients`);
  }

  public getClientById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/clients/${id}`);
  }

  getClientByID(id:number):any {
    return this.http.get(`${this.baseUrl}/clients/`+id).toPromise();
  }

  createClient(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/clients`, info);
  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/clients`, info);
  }

  updateClient(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/clients/${id}`, value);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/clients/${id}`, { responseType: 'text' });
  }

  getClientGroupByRaisonSocial() {
    return this.http.get(`${this.baseUrl}/ListClientGroupByRaisonSocial`);
  }

}
