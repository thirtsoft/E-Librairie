import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Prestation } from './../models/prestation';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrestationService {

//  baseUrl_1 = environment.apiBaseUrl;

 // baseUrl_1 = 'https://62.171.128.8/gestionstock-alamine/v1';

  baseUrl_1 = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

  choixmenu : string  = 'A';
  listData : Prestation[];
  formData:  Prestation;

  dataForm:  FormGroup;

  private listners = new Subject<any>();

  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) {
  }

  getAllPrestations(): Observable<Prestation[]> {
    return this.http.get<Prestation[]>(`${this.baseUrl_1}/prestations/all`);
  }

  getAllPrestationsOrderDesc(): Observable<Prestation[]> {
    return this.http.get<Prestation[]>(`${this.baseUrl_1}/prestations/allPrestationOrderDesc`);
  }

  public getPrestationById(id: number): Observable<Prestation> {
    return this.http.get<Prestation>(`${this.baseUrl_1}/prestations/findById/${id}`);
  }

  createPrestation(info: Prestation): Observable<Prestation> {
    return this.http.post<Prestation>(`${this.baseUrl_1}/prestations/create`, info);
  }

  updatePrestation(id: number, value: Prestation): Observable<Prestation> {
    return this.http.put<Prestation> (`${this.baseUrl_1}/prestations/update/${id}`, value);
  }

  getSumsOfPrestationsByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl_1}/prestations/searchSumsOfPrestationByMonth`);
  }

  getSumsOfPrestationsByYear(): Observable<any> {
    return this.http.get(`${this.baseUrl_1}/prestations/searchSumsOfPrestationByYear`);
  }

  deletePrestation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/prestations/delete/${id}`, { responseType: 'text' });
  }



}
