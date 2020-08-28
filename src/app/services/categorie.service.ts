import { Injectable } from '@angular/core';
import { Categorie } from '../models/categorie';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = '/api/categories';
  choixmenu : string  = 'A';
  listData : Categorie[];

  public dataForm:  FormGroup;

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  public getCategorieById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/categories/${id}`);
  }

  createCategorie(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/categories`, info);
  }

  /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllCategorieParPage(page: number, size: number) {
    return this.http.get(this.baseUrl+"/categories/chercherCategoriesParPages?page="+page+"&size="+size);
  }
  /**
   * Methode pour chercher des categories par nom
   */
  public getCategorieByKeyWord(mc: string, page: number, size: number) {
    return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/categories`, info);
  }

  updateCategorie(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/categories/${id}`, value);
  }

  deleteCategorie(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categories/${id}`, { responseType: 'text' });
  }

}
