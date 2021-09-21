import { Injectable } from '@angular/core';
import { LigneVente } from '../models/ligne-vente';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LigneVenteService {


//  private baseUrl_1 = 'http://localhost:8081/apiSeller';

  private baseUrl_1 = 'http://localhost:8080/Library-0.0.1-SNAPSHOT/apiSeller';

//  private baseUrl_1 = 'http://localhost:8081/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : LigneVente[];

  public dataForm:  FormGroup;

  constructor(private http: HttpClient) { }

  getAllLigneVentes(): Observable<LigneVente[]> {
    return this.http.get<LigneVente[]>( `${this.baseUrl_1}/ligneVentes`);
  }

  getAllByNumero(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl_1}/lventes/${id}`);
  }

   /**
   * Methode pour afficher la liste des categories par pages
   */
  public getLigneVentesByVente(venteId: number) {
    return this.http.get(`${this.baseUrl_1}/searchListLigneVentesByVenteId/${venteId}`);
   // return this.http.get(this.baseUrl+'/searchListLigneCmdClientByCommandeId/' + comId);
  }

  public getLigneVenteId(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl_1}/ligneVentes/${id}`);
  }

  createLigneVente(info: LigneVente): Observable<Object> {
    return this.http.post(`${this.baseUrl_1}/ligneVentes`, info);
  }

  updateLigneVente(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl_1}/ligneVentes/${id}`, value);
  }

  deleteLigneVente(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/ligneVentes/${id}`, { responseType: 'text' });
  }

}
