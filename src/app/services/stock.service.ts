import { Injectable } from '@angular/core';
import { Stock } from '../models/stock';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private baseUrl = 'http://localhost:8080/alAmine';
  // private baseUrl = '/api/categories';
  choixmenu : string  = 'A';
  listData : Stock[];

  public dataForm:  FormGroup;

  constructor(private http: HttpClient) { }

  getAllStocks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stocks`);
  }

  public getStockById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/stocks/${id}`);
  }

  exportPdfArticle(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/createPdf`,{responseType: 'blob'});
  }

  createStock(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/stocks`, info);
  }

   /**
    * Methode pour afficher la liste des categories par pages
    */
  public getAllStockParPage(page: number, size: number) {
    return this.http.get(this.baseUrl+"/stocks/chercherCategoriesParPages?page="+page+"&size="+size);
  }
   /**
    * Methode pour chercher des categories par nom
    */
  public getStockByKeyWord(mc: string, page: number, size: number) {
    return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/stocks`, info);
  }

  updateStock(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/stocks/${id}`, value);
  }

  deleteStock(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/stocks/${id}`, { responseType: 'text' });
  }

}
