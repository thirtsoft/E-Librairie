import { Injectable } from '@angular/core';
import { LigneAvoir } from '../models/ligne-avoir';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LigneAvoirService {

//  baseUrl = environment.apiBaseUrl;

  baseUrl = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

//  baseUrl = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";

  choixmenu : string  = 'A';
  listData : LigneAvoir[];
  public dataForm:  FormGroup;
  public formData:  FormGroup;

  lcreance: LigneAvoir = new LigneAvoir();
  lcreanceList: LigneAvoir[];

  constructor(private http: HttpClient) { }

  getAllLigneAvoirs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ligneAvoirs/all`);
  }

  getAllLigneAvoirsOrderDesc(): Observable<LigneAvoir[]> {
    return this.http.get<LigneAvoir[]>(`${this.baseUrl}/ligneAvoirs/allLigneAvoirOrderDesc`);
  }

  getAllByNumero(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/lavoirs/findByNumero/${id}`);
  }

  public getLigneAvoirId(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/ligneAvoirs/findById/${id}`);
  }

  createLigneAvoir(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/ligneAvoirs/create`, info);
  }

  /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllLigneAvoirByAvoir(avoirId: number) {
    return this.http.get(`${this.baseUrl}/ligneAvoirs/searchListLigneAvoirByAvoirId/${avoirId}`);
  }

  updateLigneAvoir(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/ligneAvoirs/update/${id}`, value);
  }

  deleteLigneAvoir(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/ligneAvoirs/delete/${id}`);
  }

}
