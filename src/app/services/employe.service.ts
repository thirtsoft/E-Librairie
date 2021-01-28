import { Injectable } from '@angular/core';
import { Employe } from '../models/employe';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : Employe[];
  public formData:  Employe;
  public dataForm:  FormGroup;

  private listners = new Subject<any>();
  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllEmployes(): Observable<any> {

    return this.http.get(`${this.baseUrl}/employes`);
  }

  getEmployeByID(id:number):any {
    return this.http.get(`${this.baseUrl}/employes/`+id).toPromise();
  }

  public getEmployeById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/employes/${id}`);
  }


  createEmploye(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/employes`, info);
  }
  updateEmploye(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/employes/${id}`, value);
  }

  deleteEmploye(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/employes/${id}`, { responseType: 'text' });
  }

}
