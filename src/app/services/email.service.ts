import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Email } from '../models/email';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  baseUrl = environment.apiBaseUrl;

//  baseUrl = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

 // baseUrl = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";

  //private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : Email[];
  formData : Email;

  public dataForm:  FormGroup;

  private listners = new Subject<any>();

  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllEmails(): Observable<any> {
    return this.http.get(`${this.baseUrl}/emails`);
  }

  public getFournisseurById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/fournisseurs/${id}`);
  }

  public sendEmail(info: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/sendEmail`, info);
  }

  public sendMail(info: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/sendMail`, info);
  }

  public sendMailToAllFournisseur(info: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/sendMailToAllFournisseur`, info);
  }

  public sendMailToCustomer(info: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/sendMailToCustomer`, info);
  }

  deleteFournisseur(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/emails/${id}`, { responseType: 'text' });
  }

}
