import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { HistoriqueCreance } from './../models/historiqueCreance';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueCreanceService {

  //baseUrl = environment.apiBaseUrl;

  baseUrl = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';


  choixmenu : string  = 'A';
  listData : HistoriqueCreance[];
  formData:  HistoriqueCreance;

  dataForm:  FormGroup;

  private listners = new Subject<any>();

  listen(): Observable<any> {
   return this.listners.asObservable();
  }

  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllHistoriqueCreances(): Observable<HistoriqueCreance[]> {
    return this.http.get<HistoriqueCreance[]>(`${this.baseUrl}/historiqueCreances/all`);
  }

  getAllHistoriqueCreancesOrderDesc(): Observable<HistoriqueCreance[]> {
    return this.http.get<HistoriqueCreance[]>(`${this.baseUrl}/historiqueCreances/allHistoriqueCreanceOrderDesc`);
  }


  getHistoriqueCreanceByID(id:number):any {
    return this.http.get(`${this.baseUrl}/historiqueCreances/findById/`+id).toPromise();
  }

  public getHistoriqueCreanceById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/historiqueCreances/findById/${id}`);
  }

  createHistoriqueCreance(info: HistoriqueCreance): Observable<HistoriqueCreance> {
   return this.http.post<HistoriqueCreance>(`${this.baseUrl}/historiqueCreances/create`, info);
  }

  updateHistoriqueCreance(id: number, value: HistoriqueCreance): Observable<HistoriqueCreance> {
    return this.http.put<HistoriqueCreance>(`${this.baseUrl}/historiqueCreances/update/${id}`, value);
  }

  deleteHistoriqueCreance(id: number): Observable<any> {
   return this.http.delete(`${this.baseUrl}/historiqueCreances/delete/${id}`, { responseType: 'text' });
  }


}
