import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Avoir } from '../models/avoir';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvoirService {

  private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : Avoir[];
  formData:  FormGroup;
  list: any={};

  public dataForm:  FormGroup;

  private listners = new Subject<any>();
  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllAvoirs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/avoirs`);
  }

  getAvoirByID(id:number):any {
    return this.http.get(`${this.baseUrl}/avoirs/`+id).toPromise();
  }

  public getAvoirById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/avoirs/${id}`);
  }

  createAvoir(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/avoirs`, info);
  }

  updateAvoir(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/avoirs/${id}`, value);
  }

  deleteAvoir(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/avoirs/${id}`, { responseType: 'text' });
  }

}
