import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { Appro } from '../models/appro';
import { LigneAppro } from '../models/ligne-appro';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApproService {

// baseUrl = environment.apiBaseUrl;

  baseUrl = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : Appro[];

  public formData:  FormGroup;

  commande: Appro;

  listLigneAppro: LigneAppro[];

  list: any={}

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
    return this.http.get<Appro[]>(`${this.baseUrl}/approvisionnements/allApprovisionnementOrderDesc`);
  }

  getAllApprosOf3LatestMonths(): Observable<Appro[]> {
    return this.http.get<Appro[]>(`${this.baseUrl}/approvisionnements/allApprovisionnementOfLatest3Months`);
  }

  getTop500ApprosOrderByIdDesc(): Observable<Appro[]> {
    return this.http.get<Appro[]>(`${this.baseUrl}/approvisionnements/findTop500OfApprovisionnementOrderByIdDesc`);
  }

  public getApprovisionnementById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/approvisionnements/findById/${id}`);
  }

  getApprovisionnementByID(id:number):any {
    return this.http.get(`${this.baseUrl}/approvisionnements/findById/${id}`).toPromise();
  }

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
    return this.http.get(`${this.baseUrl}/approvisionnemenrs/generateCodeAppro`);
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
    return this.http.patch<any>(`${this.baseUrl}/approvisionnemenrs/updateStatusApproById/`+id+'?status='+data.status, {headers: headers});

//    return this.http.patch<any>("http://localhost:8081/alAmine/updateStatusApproById/"+id+"?status="+data.status, {headers: headers});

  }

  updateMontantAvanceAppro(id: number, montantAvance: number): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    let data = {"montantAvance":montantAvance};

    return this.http.patch<any>(`${this.baseUrl}/approvisionnemenrs/updateMontantAvanceApproById/`+id+'?montantAvance='+data.montantAvance, {headers: headers});

  //  return this.http.patch<any>("http://localhost:8081/alAmine/updateMontantAvanceApproById/"+id+"?montantAvance="+data.montantAvance, {headers: headers});

  }


}
