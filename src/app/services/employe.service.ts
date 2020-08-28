import { Injectable } from '@angular/core';
import { Employe } from '../models/employe';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = '/api/categories';
  choixmenu : string  = 'A';
  listData : Employe[];

  public dataForm:  FormGroup;

  constructor(private http: HttpClient) { }

  getAllEmployes(): Observable<any> {

    return this.http.get(`${this.baseUrl}/employes`);
  }

  public getEmployeById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/employes/${id}`);
  }


  createEmploye(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/employes`, info);
  }

  /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllEmployeParPage(page: number, size: number) {
    return this.http.get(this.baseUrl+"/employes/chercherCategoriesParPages?page="+page+"&size="+size);
  }
  /**
   * Methode pour chercher des categories par nom
   */
  public getEmployeByKeyWord(mc: string, page: number, size: number) {
    return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/employes`, info);
  }

  updateEmploye(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/employes/${id}`, value);
  }

  deleteEmploye(id: number): Observable<any> {

    return this.http.delete(`${this.baseUrl}/employes/${id}`, { responseType: 'text' });
  }

}
