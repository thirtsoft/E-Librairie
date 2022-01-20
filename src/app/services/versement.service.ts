import { Injectable } from '@angular/core';
import { Versement } from '../models/versement';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VersementService {

  baseUrl = environment.apiBaseUrl;

//  baseUrl = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

 // baseUrl = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";


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
    return this.http.get(`${this.baseUrl}/versements/all`);
  }

  getAllVersementsOrderDesc(): Observable<Versement[]> {
    return this.http.get<Versement[]>(`${this.baseUrl}/versements/allVersementderDesc`);
  }

  getVersementByID(id:number):any {
    return this.http.get(`${this.baseUrl}/versements/findById/`+id).toPromise();
  }

  public getVersementById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/versements/findById/${id}`);
  }

  createVersement(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/versements/create`, info);
  }

  public createVersementWithFile(versement, file:File) {
    const data:FormData= new FormData();
    data.append('versement',JSON.stringify(versement));
    data.append('file',file);

    return this.http.post(`${this.baseUrl}/versements/createVersement`, data, {responseType: 'text'});
  }

  public saveVersementWithFile(versement, file:File) {
    const formData:FormData= new FormData();
    formData.append('versement',JSON.stringify(versement));
    formData.append('file',file);

    return this.http.post(`${this.baseUrl}/versements/createVersementInPath`, formData, {responseType: 'text'});
  }

  uploadVersementFile(file: File, verId) {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.baseUrl+'/versements/uploadPdfFile/'+verId, formdata, {
      responseType: 'text'
    });

    return this.http.request(req);

  }

  uploadVersementFileInPah(file: File, verId) {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.baseUrl+'/versements/uploadPdfFileInPath/'+verId, formdata, {
      responseType: 'text'
    });

    return this.http.request(req);

  }

  public downloadFile(pathContrat: String){
  //  return this.http.get<any>("http://localhost:8081/alAmine/downloadVersementFile"+"/"+ pathContrat);

    return this.http.get<any>(`${this.baseUrl}/versements/downloadVersementFile/`+"/"+ pathContrat);

  //  return this.http.get<any>("http://localhost:8080/Library-0.0.1-SNAPSHOT/alAmine/downloadVersementFile"+"/"+ pathContrat);
  }


  updateVersement(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/versements/update/${id}`, value);
  }

  deleteVersement(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/versements/delete/${id}`, { responseType: 'text' });
  }

  listOfVersementeByEmploye(): Observable<any> {
    return this.http.get(`${this.baseUrl}/versements/searchListVersementsByEmployeId`);
  }

}
