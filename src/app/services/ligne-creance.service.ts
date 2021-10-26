import { Injectable } from '@angular/core';
import { LigneCreance } from '../models/ligne-creance';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LigneCreanceService {

  private baseUrl = environment.apiBaseUrl;

  choixmenu : string  = 'A';
  listData : LigneCreance[];
  public dataForm:  FormGroup;
  public formData:  FormGroup;

  lcreance: LigneCreance = new LigneCreance();
  lcreanceList: LigneCreance[];

  constructor(private http: HttpClient) { }

  getAllLigneCreances(): Observable<LigneCreance[]> {
    return this.http.get<LigneCreance[]>(`${this.baseUrl}/ligneCreances/all`);
  }

  getAllLigneCreancesOrderDesc(): Observable<LigneCreance[]> {
    return this.http.get<LigneCreance[]>(`${this.baseUrl}/ligneCreances/allLigneCreanceOrderDesc`);
  }

  getAllByNumero(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/ligneCreances/findByNumero/${id}`);
  }

  public getLigneCreanceId(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/ligneCreances/findById/${id}`);
  }

  createLigneCreance(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/ligneCreances/create`, info);
  }

  /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllLigneCreanceByCreance(creanceId: number) {
    return this.http.get(`${this.baseUrl}/ligneCreances/searchListLigneCreanceByCreanceId/${creanceId}`);
  }

  updateLigneCreance(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/ligneCreances/update/${id}`, value);
  }

  deleteLigneCreance(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/ligneCreances/delete/${id}`);
  }

}
