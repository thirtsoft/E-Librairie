import { Injectable } from '@angular/core';
import { LigneAppro } from '../models/ligne-appro';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LigneApproService {

  private baseUrl = 'https://alamine-admin.herokuapp.com/alAmine';
 // private baseUrl = 'http://localhost:8081/alAmine';

 // private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : LigneAppro[];

  public dataForm:  FormGroup;

  constructor(private http: HttpClient) { }

  getAllLigneAppros(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ligneApprovisionnements`);
  }

  getAllByNumero(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/lappros/${id}`);
  }

  public getLigneApproId(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/ligneApprovisionnements/${id}`);
  }

   /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllLigneApproByAppro(approId: number) {
    return this.http.get(`${this.baseUrl}/searchListLigneApproByApprovisionnementId/${approId}`);
  }

  createLigneAppro(info: LigneAppro): Observable<Object> {
    return this.http.post(`${this.baseUrl}/ligneApprovisionnements`, info);
  }
  updateLigneAppro(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/ligneApprovisionnements/${id}`, value);
  }

  deleteLigneAppro(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/ligneApprovisionnements/${id}`, { responseType: 'text' });
  }

}
