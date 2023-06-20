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

  baseUrl = environment.apiBaseUrl

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
    return this.http.get<Prestation[]>(`${this.baseUrl}/prestations/all`);
  }

  getAllPrestationsOrderDesc(): Observable<Prestation[]> {
    return this.http.get<Prestation[]>(`${this.baseUrl}/prestations/allPrestationOrderDesc`);
  }

  public getPrestationById(id: number): Observable<Prestation> {
    return this.http.get<Prestation>(`${this.baseUrl}/prestations/findById/${id}`);
  }

  createPrestation(info: Prestation): Observable<Prestation> {
    return this.http.post<Prestation>(`${this.baseUrl}/prestations/create`, info);
  }

  updatePrestation(id: number, value: Prestation): Observable<Prestation> {
    return this.http.put<Prestation> (`${this.baseUrl}/prestations/update/${id}`, value);
  }

  getSumsOfPrestationsByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/prestations/searchSumsOfPrestationByMonth`);
  }

  getSumsOfPrestationsByYear(): Observable<any> {
    return this.http.get(`${this.baseUrl}/prestations/searchSumsOfPrestationByYear`);
  }

  deletePrestation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/prestations/delete/${id}`, { responseType: 'text' });
  }



}
