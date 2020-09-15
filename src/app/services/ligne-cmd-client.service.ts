import { Injectable } from '@angular/core';
import { LigneCmdClient } from '../models/ligne-cmd-client';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LigneCmdClientService {

  private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = '/api/categories';
  choixmenu : string  = 'A';
  listData : LigneCmdClient[];

  public dataForm:  FormGroup;

  constructor(private http: HttpClient) { }

  getAllLigneCmdClients(): Observable<LigneCmdClient[]> {
    return this.http.get<LigneCmdClient[]>(`${this.baseUrl}/ligneCommandes`);
  }

  public getLigneCmdClientId(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/ligneCommandes/${id}`);
  }

  createLigneCmdClient(info: LigneCmdClient): Observable<Object> {
    return this.http.post(`${this.baseUrl}/ligneCommandes`, info);
  }

  /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllLigneCmdClientParPage(page: number, size: number) {
    return this.http.get(this.baseUrl+"/ligneCommandes/chercherCategoriesParPages?page="+page+"&size="+size);
  }
  /**
   * Methode pour chercher des categories par nom
   */
  public getLigneCmdClientByKeyWord(mc: string, page: number, size: number) {
    return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/ligneCommandes`, info);
  }

  updateLigneCmdClient(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/ligneCommandes/${id}`, value);
  }

  deleteLigneCmdClient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/ligneCommandes/${id}`, { responseType: 'text' });
  }

}
