import { Injectable } from '@angular/core';
import { Contrat } from '../models/contrat';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  private baseUrl = 'http://localhost:8081/alAmine';

 // private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu: string  = 'A';
  listData: Contrat[];
  formData: Contrat = new Contrat();

  dataForm:  FormGroup;

  private listners = new Subject<any>();

  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllContrats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/contrats`);
  }
  getContratByID(id:number):any {
    return this.http.get(`${this.baseUrl}/contrats/`+id).toPromise();
  }

  public getContratById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/contrats/${id}`, { responseType: 'text' });
  }

  createContrat(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/contrats`, info);
  }

  public createContrat2(formData, fileContrat:File) {
    const data:FormData= new FormData();
    data.append('contrat',JSON.stringify(formData));
    data.append('file',fileContrat);

    return this.http.post(`${this.baseUrl}/createContrats`, data,  {responseType: 'text'});
  }

  uploadContratFile(file: File, contId) {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.baseUrl+'/uploadFilePdf/'+contId, formdata, {
      responseType: 'text'
    });

    return this.http.request(req);

  }

  public downloadFile(pathContrat: String){
    return this.http.get<any>("http://localhost:8081/alAmine/downloadContratFile"+"/"+ pathContrat);
  }

  updateContrat(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/contrats/${id}`, value);
  }

  deleteContrat(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/contrats/${id}`, { responseType: 'text' });
  }

}
