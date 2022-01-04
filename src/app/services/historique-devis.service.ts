import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { HistoriqueDevis } from './../models/historiqueDevis';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueDevisService {

  //baseUrl = environment.apiBaseUrl;

  baseUrl = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

 // baseUrl = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";


  choixmenu : string  = 'A';
  listData : HistoriqueDevis[];
  formData:  HistoriqueDevis;

  dataForm:  FormGroup;

  private listners = new Subject<any>();

  listen(): Observable<any> {
   return this.listners.asObservable();
  }

  filter(filterBy: string) {
   this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllHistoriqueDeviss(): Observable<HistoriqueDevis[]> {
    return this.http.get<HistoriqueDevis[]>(`${this.baseUrl}/historiqueDeviss/all`);
  }

  getAllHistoriqueDevissOrderDesc(): Observable<HistoriqueDevis[]> {
    return this.http.get<HistoriqueDevis[]>(`${this.baseUrl}/historiqueCreances/allHistoriqueCreanceOrderDesc`);
  }

  getHistoriqueDevisByID(id:number):any {
    return this.http.get(`${this.baseUrl}/historiqueDeviss/findById/`+id).toPromise();
  }

  public getHistoriqueDevisById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/historiqueDeviss/findById/${id}`);
  }

  createHistoriqueDevis(info: HistoriqueDevis): Observable<HistoriqueDevis> {
   return this.http.post<HistoriqueDevis>(`${this.baseUrl}/historiqueDeviss/create`, info);
  }

  updateHistoriqueDevis(id: number, value: HistoriqueDevis): Observable<HistoriqueDevis> {
    return this.http.put<HistoriqueDevis>(`${this.baseUrl}/historiqueDeviss/update/${id}`, value);
  }

  deleteHistoriqueDevis(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/historiqueDeviss/delete/${id}`, { responseType: 'text' });
  }

}
