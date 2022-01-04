import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { HistoriqueCommande } from './../models/historiqueCommande';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueCommandeService {

  //baseUrl = environment.apiBaseUrl;

 // baseUrl = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

  baseUrl = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";


  choixmenu : string  = 'A';
  listData : HistoriqueCommande[];
  formData:  HistoriqueCommande;

  dataForm:  FormGroup;

  private listners = new Subject<any>();

  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllHistoriqueCommandes(): Observable<HistoriqueCommande[]> {
    return this.http.get<HistoriqueCommande[]>(`${this.baseUrl}/historiqueCommandes/all`);
  }

  getAllHistoriqueCommandesOrderDesc(): Observable<HistoriqueCommande[]> {
    return this.http.get<HistoriqueCommande[]>(`${this.baseUrl}/historiqueCommandes/allHistoriqueCommandeOrderDesc`);
  }


  getHistoriqueCommandeByID(id:number):any {
    return this.http.get(`${this.baseUrl}/HistoriqueCommandes/findById/`+id).toPromise();
  }

  public getHistoriqueCommandeById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/historiqueCommandes/findById/${id}`);
  }

  createHistoriqueCommande(info: HistoriqueCommande): Observable<HistoriqueCommande> {
    return this.http.post<HistoriqueCommande>(`${this.baseUrl}/historiqueCommandes/create`, info);
  }

  updateHistoriqueCommande(id: number, value: HistoriqueCommande): Observable<HistoriqueCommande> {
    return this.http.put<HistoriqueCommande>(`${this.baseUrl}/historiqueCommandes/update/${id}`, value);
  }

  deleteHistoriqueCommande(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/historiqueCommandes/delete/${id}`, { responseType: 'text' });
  }


}
