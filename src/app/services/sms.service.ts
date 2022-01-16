import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

//  private baseUrl = 'http://localhost:8080/alAmine';

//  baseUrl = environment.apiBaseUrl;

  baseUrl = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

 // baseUrl = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";
  //private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';

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

  public sendSMSToFournisseur(info: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/sendSMSToFournisseur`, info);
  }

  public sendSMSToCustomer(info: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/sendSMSToCustomer`, info);
  }

}
