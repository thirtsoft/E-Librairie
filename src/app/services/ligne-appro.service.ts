import { Injectable } from '@angular/core';
import { LigneAppro } from '../models/ligne-appro';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LigneApproService {

 // private baseUrl = 'http://localhost:8080/alAmine';
  private baseUrl = window["cfgApiBaseUrl"];

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

  /* getAllLigneAppros(): Observable<LigneAppro[]> {
    return this.http.get<LigneAppro[]>(`${this.baseUrl}/ligneApprovisionnements`);
  } */

  public getLigneApproId(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/ligneApprovisionnements/${id}`);
  }

   /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllLigneApproByAppro(approId: number) {
    return this.http.get(`${this.baseUrl}/searchListLigneApproByApprovisionnementId/${approId}`);
   // return this.http.get(this.baseUrl+'/searchListLigneCmdClientByCommandeId/' + comId);
  }

  createLigneAppro(info: LigneAppro): Observable<Object> {
    return this.http.post(`${this.baseUrl}/ligneApprovisionnements`, info);
  }

  /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllLigneApproParPage(page: number, size: number) {
    return this.http.get(this.baseUrl+"/ligneApprovisionnements/chercherCategoriesParPages?page="+page+"&size="+size);
  }
  /**
   * Methode pour chercher des categories par nom
   */
  public getLigneApproByKeyWord(mc: string, page: number, size: number) {
    return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/ligneApprovisionnements`, info);
  }

  updateLigneAppro(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/ligneApprovisionnements/${id}`, value);
  }

  deleteLigneAppro(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/ligneApprovisionnements/${id}`, { responseType: 'text' });
  }

}
