import { Injectable } from '@angular/core';
import { Contrat } from '../models/contrat';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
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
  formData: Contrat;

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
    return this.http.get(`${this.baseUrl}/contrats/${id}`);
  }

  createContrat(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/contrats`, info);
  }

  public createContrat2(contrat, file:File) {

    const data:FormData= new FormData();
    data.append('contrat',JSON.stringify(contrat));
    data.append('file_contrat',file);

    return this.http.post<Contrat>(`${this.baseUrl}/createContrat`, data);
  }

  public downloadFile(pathContrat: String){

    return this.http.get<any>("http://localhost:8080/alAmine//downloadFile"+"/"+ pathContrat);
  }

  /**
   * Methode pour ajouter un nouveau produit avec sa photo
   */
  public saveContrat(formData, file:File): Observable<any> {
    const data:FormData= new FormData();
    data.append('contrat',JSON.stringify(formData));
    data.append('file',file);
    const req = new HttpRequest('POST', this.baseUrl+"/saveContrat", formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);

  }


  updateContrat(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/contrats/${id}`, value);
  }

  deleteContrat(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/contrats/${id}`, { responseType: 'text' });
  }

}
