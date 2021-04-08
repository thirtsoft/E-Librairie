import { Injectable } from '@angular/core';
import { Versement } from '../models/versement';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersementService {

  private baseUrl = 'http://localhost:8081/alAmine';

 // private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : Versement[];

  public dataForm:  FormGroup;

  private listners = new Subject<any>();
  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllVersements(): Observable<any> {
    return this.http.get(`${this.baseUrl}/versements`);
  }

  getVersementByID(id:number):any {
    return this.http.get(`${this.baseUrl}/versements/`+id).toPromise();
  }

  public getVersementById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/versements/${id}`);
  }

  createVersement(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/versements`, info);
  }

  public createVersementWithFile(versement, file:File) {
    const data:FormData= new FormData();
    data.append('versement',JSON.stringify(versement));
    data.append('file',file);

    return this.http.post(`${this.baseUrl}/createVersement`, data, {responseType: 'text'});
  }
/*
  public createVersementWithFile(formData, fileContrat:File) {
    const data:FormData= new FormData();
    data.append('versement',JSON.stringify(formData));
    data.append('file',fileContrat);

    return this.http.post(`${this.baseUrl}/createContrats`, data,  {responseType: 'text'});
  }
  */

  uploadVersementFile(file: File, verId) {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.baseUrl+'/uploadPdfFile/'+verId, formdata, {
      responseType: 'text'
    });

    return this.http.request(req);

  }
  public downloadFile(pathContrat: String){
    return this.http.get<any>("http://localhost:8081/alAmine/downloadVersementFile"+"/"+ pathContrat);
  }


  updateVersement(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/versements/${id}`, value);
  }
  deleteVersement(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/versements/${id}`, { responseType: 'text' });
  }

  listOfVersementeByEmploye(): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchListVersementsByEmployeId`);
  }

}
