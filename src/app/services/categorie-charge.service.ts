import { Injectable } from '@angular/core';
import { CategorieCharge } from '../models/categorieCharge';
import { FormGroup } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieChargeService {

 // baseUrl = environment.apiBaseUrl;

  baseUrl = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

 // baseUrl = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";

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

  getAllCategorieCharges(): Observable<CategorieCharge[]> {
    return this.http.get<CategorieCharge[]>(`${this.baseUrl}/categorieCharges/all`);
  }

  getAllCategorieChargesOrderDesc(): Observable<CategorieCharge[]> {
    return this.http.get<CategorieCharge[]>(`${this.baseUrl}/categorieCharges/allCategorieChargeOrderDesc`);
  }

  getCategorieChargeByID(id:number):any {
    return this.http.get(`${this.baseUrl}/categorieCharges/findById/`+id).toPromise();
  }

  public getCategorieChargeById(id: number): Observable<CategorieCharge> {
    return this.http.get<CategorieCharge>(`${this.baseUrl}/categorieCharges/findById/${id}`);
  }

  createCategorieCharge(info: CategorieCharge): Observable<CategorieCharge> {
    return this.http.post<CategorieCharge>(`${this.baseUrl}/categorieCharges/create`, info);
  }

  updateCategorieCharge(id: number, value: CategorieCharge): Observable<CategorieCharge> {
    return this.http.put<CategorieCharge>(`${this.baseUrl}/categorieCharges/update/${id}`, value);
  }

  deleteCategorieCharge(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categorieCharges/delete/${id}`, { responseType: 'text' });
  }

}
