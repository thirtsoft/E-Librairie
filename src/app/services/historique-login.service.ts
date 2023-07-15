import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { HistoriqueLogin } from './../models/historiqueLogin';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueLoginService {
  
  baseUrl = environment.apiBaseUrl;


 // baseUrl = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";


  choixmenu : string  = 'A';
  listData : HistoriqueLogin[];
  formData:  HistoriqueLogin;

 dataForm:  FormGroup;

 private listners = new Subject<any>();

 listen(): Observable<any> {
   return this.listners.asObservable();
 }

 filter(filterBy: string) {
   this.listners.next(filterBy);
 }

 constructor(private http: HttpClient) { }

 getAllHistoriqueLogins(): Observable<HistoriqueLogin[]> {
   return this.http.get<HistoriqueLogin[]>(`${this.baseUrl}/historiqueLogins/all`);
 }

 getAllHistoriqueLoginsOrderDesc(): Observable<HistoriqueLogin[]> {
  return this.http.get<HistoriqueLogin[]>(`${this.baseUrl}/historiqueLogins/allHistoriqueLoginOrderDesc`);
}

 getHistoriqueLoginByID(id:number):any {
  return this.http.get(`${this.baseUrl}/historiqueLogins/findById/`+id).toPromise();
 }

  public getHistoriqueLoginById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/historiqueLogins/findById/${id}`);
  }

 createHistoriqueLogin(info: HistoriqueLogin): Observable<HistoriqueLogin> {
   return this.http.post<HistoriqueLogin>(`${this.baseUrl}/historiqueLogins/create`, info);
 }

 updateHistoriqueLogin(id: number, value: HistoriqueLogin): Observable<HistoriqueLogin> {
    return this.http.put<HistoriqueLogin>(`${this.baseUrl}/historiqueLogins/update/${id}`, value);
 }

 deleteHistoriqueLogin(id: number): Observable<any> {
   return this.http.delete(`${this.baseUrl}/historiqueLogins/delete/${id}`, { responseType: 'text' });
 }


}
