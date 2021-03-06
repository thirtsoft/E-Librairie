import { Injectable } from '@angular/core';
import { Charge } from '../models/charge';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {

  private baseUrl = 'http://localhost:8081/alAmine';

 // private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : Charge[];
  public formData: Charge;

  public dataForm: FormGroup;

  private listners = new Subject<any>();
  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllCharges(): Observable<any> {
    return this.http.get(`${this.baseUrl}/charges`);
  }

  getChargeByID(id:number):any {
    return this.http.get(`${this.baseUrl}/charges/`+id).toPromise();
  }

  public getChargeById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/charges/${id}`);
  }

  createCharge(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/charges`, info);
  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/charges`, info);
  }

  updateCharge(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/charges/${id}`, value);
  }

  deleteCharge(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/charges/${id}`, { responseType: 'text' });
  }


}
