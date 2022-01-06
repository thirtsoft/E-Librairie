import { Injectable } from '@angular/core';
import { Stock } from '../models/stock';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  //baseUrl = environment.apiBaseUrl;

  baseUrl = environment.apiBaseUrl;

// baseUrl = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

//  baseUrl = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";


  choixmenu : string  = 'A';
  listData : Stock[];

  public dataForm:  FormGroup;

  private listners = new Subject<any>();

  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllStocks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stocks/qll`);
  }

  public getStockById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/stocks/findById/${id}`);
  }

  exportPdfArticle(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/produits/createPdf`,{responseType: 'blob'});
  }

  createStock(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/stocks/create`, info);
  }

  updateStock(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/stocks/update/${id}`, value);
  }

  deleteStock(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/stocks/delete/${id}`, { responseType: 'text' });
  }

}
