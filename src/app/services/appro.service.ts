import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { Appro } from '../models/appro';
import { LigneAppro } from '../models/ligne-appro';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApproService {


  private baseUrl = environment.apiBaseUrl;

//  private baseUrl  = 'http://localhost:8080/Library-0.0.1-SNAPSHOT/alAmine';

 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : Appro[];
 // public formData:  Appro;

  public formData:  FormGroup;

  commande: Appro;

  listLigneAppro: LigneAppro[];

 // listLigneCmd: LigneAppro[];

  //public dataForm:  FormGroup;

  list: any={}

  //list: LigneAppro[] = [];


  orderItems: LigneAppro[];

  codeAppro;

  private listners = new Subject<any>();
  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllAppros(): Observable<Appro[]> {
    return this.http.get<Appro[]>(`${this.baseUrl}/approvisionnements/all`);
  }

  getAllApprosOrderDesc(): Observable<Appro[]> {
    return this.http.get<Appro[]>(`${this.baseUrl}/approvisionnements/allApprosOrderDesc`);
  }

  public getApprovisionnementById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/approvisionnements/findById/${id}`);
  }


  getApprovisionnementByID(id:number):any {
    return this.http.get(`${this.baseUrl}/approvisionnements/findById/${id}`).toPromise();
  }

  /* createCommandeClient(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/commandesClientes`, info);
  } */

  createApprovisionnement() {
    var body = {
      ...this.formData,
      ligneApprovisionnements: this.orderItems
    };

    return this.http.post(`${this.baseUrl}/approvisionnements/create`, body);

  }

  saveApprovisionnement(info: Object) {
    return this.http.post(`${this.baseUrl}/approvisionnements/create`, info);
  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/approvisionnements/create`, info);
  }

  updateApprovisionnement(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/approvisionnements/update/${id}`, value);
  }

  deleteApprovisionnement(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/approvisionnements/delete/${id}`, { responseType: 'text' });
  }
  generateCodeApprovisionnement(): Observable<any> {
    return this.http.get(`${this.baseUrl}/approvisionnements/generateCodeAppro`);
  }

  getCodeApprovisionnement() {
    this.generateCodeApprovisionnement().subscribe(
      response =>{
        this.codeAppro = response;
        console.log("Numero Vente:" + this.codeAppro);
      }
    );
  }
  updateStatusApproCreance(id: number, status: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    let data = {"status":status};
    return this.http.patch<any>(`${this.baseUrl}/approvisionnements/updateStatusApproById/`+id+"?status="+data.status, {headers: headers});

//    return this.http.patch<any>("http://localhost:8081/alAmine/updateStatusApproById/"+id+"?status="+data.status, {headers: headers});

  }

  updateMontantAvanceAppro(id: number, montantAvance: number): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    let data = {"montantAvance":montantAvance};

    return this.http.patch<any>(`${this.baseUrl}/approvisionnements/updateMontantAvanceApproById/`+id+"?montantAvance="+data.montantAvance, {headers: headers});

  //  return this.http.patch<any>("http://localhost:8081/alAmine/updateMontantAvanceApproById/"+id+"?montantAvance="+data.montantAvance, {headers: headers});

  }


}
