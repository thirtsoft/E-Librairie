import { Injectable } from '@angular/core';
import { Versement } from '../models/versement';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersementService {

  private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = '/api/categories';
  choixmenu : string  = 'A';
  listData : Versement[];

  public dataForm:  FormGroup;

  private listners = new Subject<any>();
  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllVersements(): Observable<any> {
    return this.http.get(`${this.baseUrl}/versements`);
  }

  public getVersementById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/versements/${id}`);
  }

  createVersement(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/versements`, info);
  }

  /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllVersementParPage(page: number, size: number) {
    return this.http.get(this.baseUrl+"/versements/chercherCategoriesParPages?page="+page+"&size="+size);
  }
  /**
   * Methode pour chercher des categories par nom
   */
  public getVersementByKeyWord(mc: string, page: number, size: number) {
    return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/versements`, info);
  }

  updateVersement(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/versements/${id}`, value);
  }

  deleteVersement(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/versements/${id}`, { responseType: 'text' });
  }

}
