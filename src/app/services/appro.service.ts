import { Injectable } from '@angular/core';
import { Appro } from '../models/appro';
import { LigneAppro } from '../models/ligne-appro';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApproService {

  private baseUrl = 'http://localhost:8081/alAmine';

 // private baseUrl = 'http://localhost:8080/alAmine';
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

  private listners = new Subject<any>();
  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllAppros(): Observable<Appro[]> {
    return this.http.get<Appro[]>(`${this.baseUrl}/approvisionnements`);
  }

  public getApprovisionnementById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/approvisionnements/${id}`);
  }

  getApprovisionnementByID(id:number):any {
    return this.http.get(`${this.baseUrl}/approvisionnements/${id}`).toPromise();
  }

  /* createCommandeClient(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/commandesClientes`, info);
  } */

  createApprovisionnement() {
    var body = {
      ...this.formData,
      ligneApprovisionnements: this.orderItems
    };

    return this.http.post(`${this.baseUrl}/approvisionnements`, body);

  }

  saveApprovisionnement(info: Object) {
    return this.http.post(`${this.baseUrl}/approvisionnements`, info);
  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/approvisionnements`, info);
  }

  updateApprovisionnement(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/approvisionnements/${id}`, value);
  }

  deleteApprovisionnement(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/approvisionnements/${id}`, { responseType: 'text' });
  }
  generateCodeApprovisionnement(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/generateCodeAppro`);
  }
  updateStatusApproCreance(id: number, status: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    let data = {"status":status};
    return this.http.patch<any>("http://localhost:8081/alAmine/updateStatusApproById/"+id+"?status="+data.status, {headers: headers});
  }

  updateMontantAvanceAppro(id: number, montantAvance: number): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    let data = {"montantAvance":montantAvance};

    return this.http.patch<any>("http://localhost:8081/alAmine/updateMontantAvanceApproById/"+id+"?montantAvance="+data.montantAvance, {headers: headers});

  }



}
