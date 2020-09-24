import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Avoir } from '../models/avoir';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvoirService {

  private baseUrl = 'http://localhost:8080/alAmine';

  choixmenu : string  = 'A';
  listData : Avoir[];

  public dataForm:  FormGroup;

  constructor(private http: HttpClient) { }

  getAllAvoirs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/avoirs`);
  }

  public getAvoirById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/avoirs/${id}`);
  }

  createAvoir(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/avoirs`, info);
  }

  /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllAvoirParPage(page: number, size: number) {
    return this.http.get(this.baseUrl+"/avoirs/chercherCategoriesParPages?page="+page+"&size="+size);
  }
  /**
   * Methode pour chercher des categories par nom
   */
  public getAvoirByKeyWord(mc: string, page: number, size: number) {
    return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/avoirs`, info);
  }

  updateAvoir(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/avoirs/${id}`, value);
  }

  deleteAvoir(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/avoirs/${id}`, { responseType: 'text' });
  }

}
