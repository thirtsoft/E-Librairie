import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Scategorie } from '../models/scategorie';

@Injectable({
  providedIn: 'root'
})
export class ScategorieService {

  private baseUrl = 'http://localhost:8080/alAmine';
  //private baseUrl = 'http://localhost:8080/alAmine';
  // private baseUrl = '/api/categories';
   choixmenu : string  = 'A';
   listData : Scategorie[];

   public dataForm:  FormGroup;

   constructor(private http: HttpClient) { }

   getAllScategories(): Observable<any> {
     return this.http.get(`${this.baseUrl}/scategories`);
   }

   public getScategorieById(id: number): Observable<Object> {
     return this.http.get(`${this.baseUrl}/scategories/${id}`);
   }

   getListScategoriesByCategory(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchListScategoriesByCategoryId/?catId=${id}`);
  }

   getListScategoriesByCategoryId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchListScategoriesByCategoryId/${id}`);
  }

   createScategorie(info: Object): Observable<Object> {
     return this.http.post(`${this.baseUrl}/scategories`, info);
   }

   /**
    * Methode pour afficher la liste des categories par pages
    */
   public getAllScategorieParPage(page: number, size: number) {
     return this.http.get(this.baseUrl+"/scategories/chercherCategoriesParPages?page="+page+"&size="+size);
   }
   /**
    * Methode pour chercher des categories par nom
    */
   public getScategorieByKeyWord(mc: string, page: number, size: number) {
     return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

   }

   createData(info: Object): Observable<Object> {
     return this.http.post(`${this.baseUrl}/scategories`, info);
   }

   updateScategorie(id: number, value: any): Observable<Object> {
     return this.http.put(`${this.baseUrl}/scategories/${id}`, value);
   }

   deleteScategorie(id: number): Observable<any> {
     return this.http.delete(`${this.baseUrl}/scategories/${id}`, { responseType: 'text' });
   }
}
