import { Injectable } from '@angular/core';
import { Creance } from '../models/creance';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreanceService {

  private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = '/api/categories';
  choixmenu : string  = 'A';
  listData : Creance[];

  public dataForm:  FormGroup;

  private listners = new Subject<any>();
  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllCreances(): Observable<any> {
    return this.http.get(`${this.baseUrl}/creances`);
  }

  public getCreanceById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/creances/${id}`);
  }

  createCreance(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/creances`, info);
  }

  /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllCreanceParPage(page: number, size: number) {
    return this.http.get(this.baseUrl+"/creances/chercherCategoriesParPages?page="+page+"&size="+size);
  }
  /**
   * Methode pour chercher des categories par nom
   */
  public getCreanceByKeyWord(mc: string, page: number, size: number) {
    return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/creances`, info);
  }

  updateCreance(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/creances/${id}`, value);
  }

  deleteCreance(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/creances/${id}`, { responseType: 'text' });
  }

}
