import { Injectable } from '@angular/core';
import { LigneAvoir } from '../models/ligne-avoir';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LigneAvoirService {

  private baseUrl = 'http://localhost:8081/alAmine';

 // private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : LigneAvoir[];
  public dataForm:  FormGroup;
  public formData:  FormGroup;

  lcreance: LigneAvoir = new LigneAvoir();
  lcreanceList: LigneAvoir[];

  constructor(private http: HttpClient) { }

  getAllLigneAvoirs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ligneAvoirs`);
  }
  getAllByNumero(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/lavoirs/${id}`);
  }

  public getLigneAvoirId(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/ligneAvoirs/${id}`);
  }

  createLigneAvoir(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/ligneAvoirs`, info);
  }

  /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllLigneAvoirByAvoir(avoirId: number) {
    return this.http.get(`${this.baseUrl}/searchListLigneAvoirByAvoirId/${avoirId}`);
  }
  updateLigneAvoir(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/ligneAvoirs/${id}`, value);
  }

  deleteLigneAvoir(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/ligneAvoirs/${id}`);
  }

}
