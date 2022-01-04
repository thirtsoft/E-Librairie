import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { HistoriqueAvoir } from './../models/historiqueAvoir';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueAvoirService {

  //baseUrl = environment.apiBaseUrl;

 // baseUrl = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

  baseUrl = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";

  //  private baseUrl = 'http://localhost:8080/Library-0.0.1-SNAPSHOT/alAmine';

    //private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : HistoriqueAvoir[];
  formData:  HistoriqueAvoir;
  dataForm:  FormGroup;

  private listners = new Subject<any>();

  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllHistoriqueAvoirs(): Observable<HistoriqueAvoir[]> {
    return this.http.get<HistoriqueAvoir[]>(`${this.baseUrl}/historiqueAvoirs/all`);
  }

  getAllHistoriqueAvoirsOrderDesc(): Observable<HistoriqueAvoir[]> {
    return this.http.get<HistoriqueAvoir[]>(`${this.baseUrl}/historiqueAvoirs/allHistoriqueAvoirOrderDesc`);
  }

  getHistoriqueAvoirByID(id:number):any {
    return this.http.get(`${this.baseUrl}/historiqueAvoirs/findById/`+id).toPromise();
  }

  public getHistoriqueAvoirById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/historiqueAvoirs/findById/${id}`);
  }

  createHistoriqueAvoir(info: HistoriqueAvoir): Observable<HistoriqueAvoir> {
    return this.http.post<HistoriqueAvoir>(`${this.baseUrl}/historiqueAvoirs/create`, info);
  }

  updateHistoriqueAvoir(id: number, value: HistoriqueAvoir): Observable<HistoriqueAvoir> {
    return this.http.put<HistoriqueAvoir>(`${this.baseUrl}/historiqueAvoirs/update/${id}`, value);
  }

  deleteHistoriqueAvoir(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/historiqueAvoirs/delete/${id}`, { responseType: 'text' });
  }

}
