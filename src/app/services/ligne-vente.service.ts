import { Injectable } from '@angular/core';
import { LigneVente } from '../models/ligne-vente';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LigneVenteService {

  //baseUrl_1 = environment.apiBaseUrl;

  baseUrl_1 = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

//  baseUrl_1 = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";

  choixmenu : string  = 'A';
  listData : LigneVente[];

  public dataForm:  FormGroup;

  constructor(private http: HttpClient) { }

  getAllLigneVentes(): Observable<LigneVente[]> {
    return this.http.get<LigneVente[]>( `${this.baseUrl_1}/ligneVentes/all`);
  }

  getAllLigneVenteOrderDesc(): Observable<LigneVente[]> {
    return this.http.get<LigneVente[]>(`${this.baseUrl_1}/ligneVentes/allLigneVenteOrderDesc`);
  }

  getAllByNumero(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl_1}/ligneVentes/findByNumero/${id}`);
  }

   /**
   * Methode pour afficher la liste des categories par pages
   */
  public getLigneVentesByVente(venteId: number) {
    return this.http.get(`${this.baseUrl_1}/ligneVentes/searchListLigneVentesByVenteId/${venteId}`);
   // return this.http.get(this.baseUrl+'/searchListLigneCmdClientByCommandeId/' + comId);
  }

  public getLigneVenteId(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl_1}/ligneVentesfindById/${id}`);
  }

  createLigneVente(info: LigneVente): Observable<Object> {
    return this.http.post(`${this.baseUrl_1}/ligneVentes/create`, info);
  }

  updateLigneVente(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl_1}/ligneVentes/update/${id}`, value);
  }

  deleteLigneVente(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/ligneVentes/delete/${id}`, { responseType: 'text' });
  }

}
