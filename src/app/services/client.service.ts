import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = '/api/categories';
  choixmenu : string  = 'A';
  listData : Client[];

  public dataForm:  FormGroup;

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<any> {

    return this.http.get(`${this.baseUrl}/clients`);
  }

  /* getClientById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/clients/${id}`);
  } */

  public getClientById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/clients/${id}`);
  }


  createClient(info: Object): Observable<Object> {
    return this.http.post<Object>(`${this.baseUrl}/clients`, info);
  }

  /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllClientParPage(page: number, size: number) {
    return this.http.get(this.baseUrl+"/categories/chercherCategoriesParPages?page="+page+"&size="+size);
  }
  /**
   * Methode pour chercher des categories par nom
   */
  public getClientByKeyWord(mc: string, page: number, size: number) {
    return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/clients`, info);
  }

  updateClient(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/clients/${id}`, value);
  }

  deleteClient(id: number): Observable<any> {

    return this.http.delete(`${this.baseUrl}/clients/${id}`, { responseType: 'text' });
  }

}
