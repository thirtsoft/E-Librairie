import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Employe } from '../models/employe';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

//  baseUrl = environment.apiBaseUrl;

  baseUrl = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

 // baseUrl = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";

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

  getAllEmployes(): Observable<Employe[]> {
    return this.http.get<Employe[]>(`${this.baseUrl}/employes/all`);
  }

  getAllEmployesOrderDesc(): Observable<Employe[]> {
    return this.http.get<Employe[]>(`${this.baseUrl}/employes/allEmployeOrderDesc`);
  }

  getEmployeByID(id:number):any {
    return this.http.get(`${this.baseUrl}/employes/findById/`+id).toPromise();
  }

  public getEmployeById(id: number): Observable<Employe> {
    return this.http.get<Employe>(`${this.baseUrl}/employes/findById/${id}`);
  }

  createEmploye(info: Employe): Observable<Employe> {
    return this.http.post<Employe>(`${this.baseUrl}/employes/create`, info);
  }

  updateEmploye(id: number, value: any): Observable<Employe> {
    return this.http.put<Employe>(`${this.baseUrl}/employes/update/${id}`, value);
  }

  deleteEmploye(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/employes/delete/${id}`, { responseType: 'text' });
  }

}
