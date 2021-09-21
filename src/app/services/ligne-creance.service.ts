import { Injectable } from '@angular/core';
import { LigneCreance } from '../models/ligne-creance';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LigneCreanceService {

  private baseUrl = 'http://localhost:8080/Library-0.0.1-SNAPSHOT/alAmine';
//  private baseUrl = 'http://localhost:8081/alAmine';

 // private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : LigneCreance[];
  public dataForm:  FormGroup;
  public formData:  FormGroup;

  lcreance: LigneCreance = new LigneCreance();
  lcreanceList: LigneCreance[];

  constructor(private http: HttpClient) { }

  getAllLigneCreances(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ligneCreances`);
  }

  getAllByNumero(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/lcreances/${id}`);
  }

  public getLigneCreanceId(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/ligneCreances/${id}`);
  }

  createLigneCreance(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/ligneCreances`, info);
  }

  /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllLigneCreanceByCreance(creanceId: number) {
    return this.http.get(`${this.baseUrl}/searchListLigneCreanceByCreanceId/${creanceId}`);
  }

  updateLigneCreance(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/ligneCreances/${id}`, value);
  }

  deleteLigneCreance(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/ligneCreances/${id}`);
  }

}
