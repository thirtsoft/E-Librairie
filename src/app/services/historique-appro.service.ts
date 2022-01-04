import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { HistoriqueAppro } from './../models/historiqueAppro';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueApproService {

  // baseUrl = environment.apiBaseUrl;

  baseUrl = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

//  baseUrl = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";

  //  private baseUrl = 'http://localhost:8080/Library-0.0.1-SNAPSHOT/alAmine';

    //private baseUrl = window["cfgApiBaseUrl"];

     choixmenu : string  = 'A';
     listData : HistoriqueAppro[];
     formData:  HistoriqueAppro;

    dataForm:  FormGroup;

    private listners = new Subject<any>();

    listen(): Observable<any> {
      return this.listners.asObservable();
    }

    filter(filterBy: string) {
      this.listners.next(filterBy);
    }

    constructor(private http: HttpClient) { }

    getAllHistoriqueApprovisionnements(): Observable<HistoriqueAppro[]> {
      return this.http.get<HistoriqueAppro[]>(`${this.baseUrl}/historiqueApprovisionnements/all`);
    }

    getAllHistoriqueApprosOrderDesc(): Observable<HistoriqueAppro[]> {
      return this.http.get<HistoriqueAppro[]>(`${this.baseUrl}/historiqueApprovisionnements/allHistoriqueApprovisionnementOrderDesc`);
    }

    getHistoriqueApproByID(id:number):any {
     return this.http.get(`${this.baseUrl}/historiqueApprovisionnements/findById/`+id).toPromise();
    }

     public getHistoriqueApproById(id: number): Observable<Object> {
       return this.http.get(`${this.baseUrl}/historiqueApprovisionnements/findById/${id}`);
     }

    createHistoriqueAppro(info: HistoriqueAppro): Observable<HistoriqueAppro> {
      return this.http.post<HistoriqueAppro>(`${this.baseUrl}/historiqueApprovisionnements/create`, info);
    }

    updateHistoriqueAppro(id: number, value: HistoriqueAppro): Observable<HistoriqueAppro> {
       return this.http.put<HistoriqueAppro>(`${this.baseUrl}/historiqueApprovisionnements/update/${id}`, value);
    }

    deleteHistoriqueAppro(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/historiqueApprovisionnements/delete/${id}`, { responseType: 'text' });
    }

}
