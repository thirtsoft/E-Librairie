import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Devis } from '../models/devis';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevisService {

  //baseUrl = environment.apiBaseUrl;

//  baseUrl = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

  baseUrl = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";

 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData: Devis[];

  formData:  FormGroup;
  list: any={}
  dataForm:  FormGroup;
  numDevis;

  private listners = new Subject<any>();

  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllDevis(): Observable<Devis[]> {
    return this.http.get<Devis[]>(`${this.baseUrl}/devis/all`);
  }

  getAllDevisOrderDesc(): Observable<Devis[]> {
    return this.http.get<Devis[]>(`${this.baseUrl}/devis/allDevisOrderDesc`);
  }

  getDevisByID(id:number):any {
    return this.http.get(`${this.baseUrl}/devis/findById/`+id).toPromise();
  }

  getDevisById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/devis/findById/${id}`);
  }

  createDevis(info: Devis, id:number) {
    return this.http.post(`${this.baseUrl}/devis/create?id=`+id, info);
  }


  updateDevis(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/devis/update/${id}`, value);
  }

  deleteDevis(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/devis/delete/${id}`, { responseType: 'text' });
  }

  generateNumeroDevis(): Observable<any> {
    return this.http.get(`${this.baseUrl}/devis/generateNumeroDevis`);
  }

  getNumeroDevis() {
    this.generateNumeroDevis().subscribe(
      response =>{
        this.numDevis = response;
        console.log("Numero Vente:" + this.numDevis);
      }
    );
  }

}
