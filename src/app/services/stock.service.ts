import { Injectable } from '@angular/core';
import { Stock } from '../models/stock';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private baseUrl = 'https://alamine-admin.herokuapp.com/alAmine';
 // private baseUrl = 'http://localhost:8081/alAmine';

 // private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

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
  updateStock(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/stocks/${id}`, value);
  }

  deleteStock(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/stocks/${id}`, { responseType: 'text' });
  }

}
