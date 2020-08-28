import { Injectable } from '@angular/core';
import { Contrat } from '../models/contrat';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = '/api/categories';
  choixmenu : string  = 'A';
  listData : Contrat[];

  public dataForm:  FormGroup;

  constructor(private http: HttpClient) { }

  getAllContrats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/contrats`);
  }

  public getContratById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/contrats/${id}`);
  }

  createContrat(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/contrats`, info);
  }

  /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllContratParPage(page: number, size: number) {
    return this.http.get(this.baseUrl+"/contrats/chercherCategoriesParPages?page="+page+"&size="+size);
  }
  /**
   * Methode pour chercher des categories par nom
   */
  public getContratByKeyWord(mc: string, page: number, size: number) {
    return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/contrats`, info);
  }

  updateContrat(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/contrats/${id}`, value);
  }

  deleteContrat(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/contrats/${id}`, { responseType: 'text' });
  }

}
