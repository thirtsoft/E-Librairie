import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Devis } from '../models/devis';

@Injectable({
  providedIn: 'root'
})
export class DevisService {

 // private baseUrl = 'http://localhost:8080/alAmine';
  private baseUrl = 'http://localhost:8081/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData: Devis[];

  public formData:  FormGroup;
  list: any={}
  public dataForm:  FormGroup;

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

  createDevis(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/devis`, info);
  }
  updateDevis(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/devis/${id}`, value);
  }

  deleteDevis(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/devis/${id}`, { responseType: 'text' });
  }
}
