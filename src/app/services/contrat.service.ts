import { Injectable } from '@angular/core';
import { Contrat } from '../models/contrat';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  private baseUrl = environment.apiBaseUrl;

//  private baseUrl = 'http://localhost:8080/Library-0.0.1-SNAPSHOT/alAmine';

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

  getAllContrats(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.baseUrl}/contrats/all`);
  }

  getAllContratsOrderDesc(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.baseUrl}/contrats/allContratOrderDesc`);
  }

  getContratByID(id:number):any {
    return this.http.get(`${this.baseUrl}/contrats/findById/`+id).toPromise();
  }

  public getContratById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/contrats/findById/${id}`, { responseType: 'text' });
  }

  createContrat(info: Contrat): Observable<Contrat> {
    return this.http.post<Contrat>(`${this.baseUrl}/contrats/create`, info);
  }

  public createContrat2(formData, fileContrat:File) {
    const data:FormData= new FormData();
    data.append('contrat',JSON.stringify(formData));
    data.append('file',fileContrat);

    return this.http.post(`${this.baseUrl}/contrats/createContrats`, data,  {responseType: 'text'});
  }

  uploadContratFile(file: File, contId) {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.baseUrl+'/contrats/uploadFilePdf/'+contId, formdata, {
      responseType: 'text'
    });

    return this.http.request(req);

  }

  public downloadFile(pathContrat: String){
  //  return this.http.get<any>("http://localhost:8081/alAmine/downloadContratFile"+"/"+ pathContrat);

    return this.http.get<any>(`${this.baseUrl}/contrats/downloadContratFile`+"/"+ pathContrat);

  //  return this.http.get<any>("http://localhost:8080/Library-0.0.1-SNAPSHOT/alAmine/downloadContratFile"+"/"+ pathContrat);
  }

  updateContrat(id: number, value: any): Observable<Contrat> {
    return this.http.put<Contrat> (`${this.baseUrl}/contrats/update/${id}`, value);
  }

  deleteContrat(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/contrats/Delete/${id}`, { responseType: 'text' });
  }

}
