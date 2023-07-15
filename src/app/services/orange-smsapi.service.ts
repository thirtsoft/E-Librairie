import { MessageModel } from './../models/messageModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrangeSMSapiService {
  
  baseUrl = environment.apiBaseUrl;

  //private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : MessageModel[];
  formData : MessageModel;

  public dataForm:  FormGroup;

  private listners = new Subject<any>();

  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  public sendSMS(info: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/sendSMS`, info);
  }



}
