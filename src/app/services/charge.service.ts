import { Injectable } from '@angular/core';
import { Charge } from '../models/charge';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {

  baseUrl = environment.apiBaseUrl;

 // baseUrl = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

//  baseUrl = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";

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

  getAllCharges(): Observable<Charge[]> {
    return this.http.get<Charge[]>(`${this.baseUrl}/charges/all`);
  }

  getAllChargesOrderDesc(): Observable<Charge[]> {
    return this.http.get<Charge[]>(`${this.baseUrl}/charges/allChargeOrderDesc`);
  }

  getChargeByID(id:number):any {
    return this.http.get(`${this.baseUrl}/charges/findById/`+id).toPromise();
  }

  public getChargeById(id: number): Observable<Charge> {
    return this.http.get<Charge>(`${this.baseUrl}/charges/findById/${id}`);
  }

  createCharge(info: Charge): Observable<Charge> {
    return this.http.post<Charge>(`${this.baseUrl}/charges/create`, info);
  }

  createData(info: Charge): Observable<Charge> {
    return this.http.post<Charge>(`${this.baseUrl}/charges/crate`, info);
  }

  updateCharge(id: number, value: Charge): Observable<Charge> {
    return this.http.put<Charge>(`${this.baseUrl}/charges/update/${id}`, value);
  }

  deleteCharge(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/charges/delete/${id}`, { responseType: 'text' });
  }

}
