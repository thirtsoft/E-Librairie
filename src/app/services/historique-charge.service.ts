import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { HistoriqueCharge } from './../models/historiqueCharge';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueChargeService {

  private baseUrl = environment.apiBaseUrl;


  choixmenu : string  = 'A';
  listData : HistoriqueCharge[];
  formData:  HistoriqueCharge;

  dataForm:  FormGroup;

  private listners = new Subject<any>();

  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

    constructor(private http: HttpClient) { }

    getAllHistoriqueCharges(): Observable<HistoriqueCharge[]> {
      return this.http.get<HistoriqueCharge[]>(`${this.baseUrl}/historiqueCharges/all`);
    }

    getAllHistoriqueChargesOrderDesc(): Observable<HistoriqueCharge[]> {
      return this.http.get<HistoriqueCharge[]>(`${this.baseUrl}/historiqueCharges/allHistoriqueChargeOrderDesc`);
    }

    getHistoriqueChargeByID(id:number):any {
     return this.http.get(`${this.baseUrl}/historiqueCharges/findById/`+id).toPromise();
    }

     public getHistoriqueChargeById(id: number): Observable<Object> {
       return this.http.get(`${this.baseUrl}/historiqueCharges/findById/${id}`);
     }

    createHistoriqueCharge(info: HistoriqueCharge): Observable<HistoriqueCharge> {
      return this.http.post<HistoriqueCharge>(`${this.baseUrl}/historiqueCharges/create`, info);
    }

    updateHistoriqueCharge(id: number, value: HistoriqueCharge): Observable<HistoriqueCharge> {
       return this.http.put<HistoriqueCharge>(`${this.baseUrl}/historiqueCharges/update/${id}`, value);
    }

    deleteHistoriqueCharge(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/historiqueCharges/delete/${id}`, { responseType: 'text' });
    }


}
