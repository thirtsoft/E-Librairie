import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = '/api/categories';
  choixmenu : string  = 'A';
  listData : Article[];

  public dataForm:  FormGroup;

  constructor(private http: HttpClient) { }

  getAllArticles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/produits`);
  }

  public getArticleById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/produits/${id}`);
  }

  exportPdfArticle(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/createPdf`,{responseType: 'blob'});
  }

  createArticle(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/produits`, info);
  }



  /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllArticleParPage(page: number, size: number) {
    return this.http.get(this.baseUrl+"/produits/chercherCategoriesParPages?page="+page+"&size="+size);
  }
  /**
   * Methode pour chercher des categories par nom
   */
  public getArticleByKeyWord(mc: string, page: number, size: number) {
    return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/produits`, info);
  }

  updateArticle(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/produits/${id}`, value);
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/produits/${id}`, { responseType: 'text' });
  }

}
