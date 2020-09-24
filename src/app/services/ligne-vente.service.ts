import { Injectable } from '@angular/core';
import { LigneVente } from '../models/ligne-vente';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LigneVenteService {

  private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = '/api/categories';
  choixmenu : string  = 'A';
  listData : LigneVente[];

  public dataForm:  FormGroup;

  constructor(private http: HttpClient) { }

  getAllLigneVentes(): Observable<LigneVente[]> {
    return this.http.get<LigneVente[]>(`${this.baseUrl}/ligneVentes`);
  }

  public getLigneVenteId(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/ligneVentes/${id}`);
  }

  createLigneVente(info: LigneVente): Observable<Object> {
    return this.http.post(`${this.baseUrl}/ligneVentes`, info);
  }

  /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllLigneVenteParPage(page: number, size: number) {
    return this.http.get(this.baseUrl+"/ligneVentes/chercherCategoriesParPages?page="+page+"&size="+size);
  }
  /**
   * Methode pour chercher des categories par nom
   */
  public getLigneVenteByKeyWord(mc: string, page: number, size: number) {
    return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/ligneVentes`, info);
  }

  updateLigneVente(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/ligneVentes/${id}`, value);
  }

  deleteLigneVente(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/ligneVentes/${id}`, { responseType: 'text' });
  }

}