import { Injectable } from '@angular/core';
import { LigneAppro } from '../models/ligne-appro';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LigneApproService {

 // baseUrl = environment.apiBaseUrl;

  baseUrl = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

 // baseUrl = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";

  choixmenu : string  = 'A';
  listData : LigneAppro[];

  public dataForm:  FormGroup;

  constructor(private http: HttpClient) { }

  getAllLigneAppros(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ligneApprovisionnements/all`);
  }

  getAllLigneApprosOrderDesc(): Observable<LigneAppro[]> {
    return this.http.get<LigneAppro[]>(`${this.baseUrl}/ligneApprovisionnements/allLigneApprovisionnementOrderDesc`);
  }

  getAllByNumero(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/lappros/findByNumero/${id}`);
  }

  public getLigneApproId(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/ligneApprovisionnements/findById/${id}`);
  }

   /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllLigneApproByAppro(approId: number) {
    return this.http.get(`${this.baseUrl}/ligneApprovisionnements/searchListLigneApproByApprovisionnementId/${approId}`);
  }

  createLigneAppro(info: LigneAppro): Observable<Object> {
    return this.http.post(`${this.baseUrl}/ligneApprovisionnements/create`, info);
  }

  updateLigneAppro(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/ligneApprovisionnements/update/${id}`, value);
  }

  deleteLigneAppro(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/ligneApprovisionnements/delete/${id}`, { responseType: 'text' });
  }

}
