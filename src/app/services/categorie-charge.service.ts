import { Injectable } from '@angular/core';
import { CategorieCharge } from '../models/categorieCharge';
import { FormGroup } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategorieChargeService {

  private baseUrl = 'http://localhost:8081/alAmine';

 // private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : CategorieCharge[];

  public formData:  CategorieCharge;

  public dataForm:  FormGroup;

  private listners = new Subject<any>();

  public jwtToken = null;
  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllCategorieCharges(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categorieCharges`);
  }

  getCategorieChargeByID(id:number):any {
    return this.http.get(`${this.baseUrl}/categorieCharges/`+id).toPromise();
  }

  public getCategorieChargeById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/categorieCharges/${id}`);
  }

  createCategorieCharge(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/categorieCharges`, info);
  }

  updateCategorieCharge(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/categorieCharges/${id}`, value);
  }

  deleteCategorieCharge(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categorieCharges/${id}`, { responseType: 'text' });
  }

}
