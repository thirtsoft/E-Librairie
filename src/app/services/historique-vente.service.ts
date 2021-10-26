import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { HistoriqueVente } from './../models/historiqueVente';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueVenteService {


  private baseUrl = environment.apiBaseUrl;


  choixmenu : string  = 'A';
  listData : HistoriqueVente[];
  formData:  HistoriqueVente;

 dataForm:  FormGroup;

 private listners = new Subject<any>();

 listen(): Observable<any> {
   return this.listners.asObservable();
 }

 filter(filterBy: string) {
   this.listners.next(filterBy);
 }

 constructor(private http: HttpClient) { }

 getAllHistoriqueVentes(): Observable<HistoriqueVente[]> {
   return this.http.get<HistoriqueVente[]>(`${this.baseUrl}/historiqueVentes/all`);
 }

 getAllHistoriqueVentesOrderDesc(): Observable<HistoriqueVente[]> {
  return this.http.get<HistoriqueVente[]>(`${this.baseUrl}/historiqueVentes/allHistoriqueVenteOrderDesc`);
}

 getHistoriqueVenteByID(id:number):any {
  return this.http.get(`${this.baseUrl}/historiqueVentes/findById/`+id).toPromise();
 }

  public getHistoriqueVenteById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/historiqueVentes/findById/${id}`);
  }

 createHistoriqueVente(info: HistoriqueVente): Observable<HistoriqueVente> {
   return this.http.post<HistoriqueVente>(`${this.baseUrl}/historiqueVentes/create`, info);
 }

 updateHistoriqueVente(id: number, value: HistoriqueVente): Observable<HistoriqueVente> {
    return this.http.put<HistoriqueVente>(`${this.baseUrl}/historiqueVentes/update/${id}`, value);
 }

 deleteHistoriqueVente(id: number): Observable<any> {
   return this.http.delete(`${this.baseUrl}/historiqueVentes/delete/${id}`, { responseType: 'text' });
 }

}
