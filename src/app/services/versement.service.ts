import { Injectable } from '@angular/core';
import { Versement } from '../models/versement';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersementService {

  private baseUrl = 'http://localhost:8081/alAmine';

 // private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : Versement[];

  public dataForm:  FormGroup;

  private listners = new Subject<any>();
  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllVersements(): Observable<any> {
    return this.http.get(`${this.baseUrl}/versements`);
  }

  getVersementByID(id:number):any {
    return this.http.get(`${this.baseUrl}/versements/`+id).toPromise();
  }

  public getVersementById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/versements/${id}`);
  }

  createVersement(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/versements`, info);
  }

  updateVersement(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/versements/${id}`, value);
  }

  deleteVersement(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/versements/${id}`, { responseType: 'text' });
  }

}
