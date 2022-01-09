import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Avoir } from '../models/avoir';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvoirService {

//  baseUrl = environment.apiBaseUrl;

  baseUrl = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

 // baseUrl = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";

 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : Avoir[];
  formData:  FormGroup;
  list: any={};

  dataForm:  FormGroup;
  refAvoir;

  private listners = new Subject<any>();
  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllAvoirs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/avoirs/all`);
  }

  getAllAvoirsOrderDesc(): Observable<Avoir[]> {
    return this.http.get<Avoir[]>(`${this.baseUrl}/avoirs/allAvoirOrderDesc`);
  }

  getAvoirByID(id:number):any {
    return this.http.get(`${this.baseUrl}/avoirs/findById/`+id).toPromise();
  }

  public getAvoirById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/avoirs/findById/${id}`);
  }

  createAvoir(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/avoirs/create`, info);
  }

  updateAvoir(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/avoirs/update/${id}`, value);
  }

  deleteAvoir(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/avoirs/delete/${id}`, { responseType: 'text' });
  }

  generateReferneceAvoir(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/avoirs/generateReferneceAvoir`);
  }

  getReferenceAvoir() {
    this.generateReferneceAvoir().subscribe(
      response =>{
        this.refAvoir = response;
        console.log("Numero Vente:" + this.refAvoir);
      }
    );
  }

}
