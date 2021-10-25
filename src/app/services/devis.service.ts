import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Devis } from '../models/devis';

@Injectable({
  providedIn: 'root'
})
export class DevisService {

//  private baseUrl = 'http://localhost:8080/Library-0.0.1-SNAPSHOT/alAmine';

 // private baseUrl = 'http://localhost:8080/alAmine';
  private baseUrl = 'http://localhost:8081/alAmine';
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

  getAllDevis(): Observable<any> {
    return this.http.get(`${this.baseUrl}/devis`);
  }

  getDevisByID(id:number):any {
    return this.http.get(`${this.baseUrl}/devis/`+id).toPromise();
  }

  getDevisById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/devis/${id}`);
  }

  createDevis(info: Devis, id:number) {
    return this.http.post(`${this.baseUrl}/devis/create?id=`+id, info);
  }

 /*  createDevis(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/devis`, info);
  } */

  updateDevis(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/devis/${id}`, value);
  }

  deleteDevis(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/devis/${id}`, { responseType: 'text' });
  }

  generateNumeroDevis(): Observable<any> {
    return this.http.get(`${this.baseUrl}/generateNumeroDevis`);
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
