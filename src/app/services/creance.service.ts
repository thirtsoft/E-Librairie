import { Injectable } from '@angular/core';
import { Creance } from '../models/creance';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreanceService {

  private baseUrl = 'http://localhost:8081/alAmine';

 // private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : Creance[];

  public formData:  FormGroup;
  list: any={}
  public dataForm:  FormGroup;

  private listners = new Subject<any>();
  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllCreances(): Observable<any> {
    return this.http.get(`${this.baseUrl}/creances`);
  }

  getCreancetByID(id:number):any {
    return this.http.get(`${this.baseUrl}/creances/`+id).toPromise();
  }

  public getCreanceById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/creances/${id}`);
  }

  createCreance(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/creances`, info);
  }
  updateCreance(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/creances/${id}`, value);
  }

  updateCreanceStatus(codeCreance: string, status: string): Observable<Object> {
    return this.http.put(`${this.baseUrl}/updateStatusCreance/${codeCreance}`, status);
  }
  updateStatusCreance(id: number, status: string): Observable<any> {
   let params = new HttpParams();
   const headers = new HttpHeaders();
   headers.set('Content-Type', 'application/json; charset=utf-8');
   const param = new HttpParams()
    .set("status",status);

  const fullURL = `${this.baseUrl}/${id}?${param.toString()}`;
  console.log({ fullURL });

  let data = {"status":status};
  console.log(data);
  console.log(data.status);
  return this.http.patch<any>("http://localhost:8080/alAmine/setCreanceOnlyStatus/"+id+"?status="+data.status, {headers: headers});

  }
  updateSoldeCreance(id: number, soldeCreance: number): Observable<any> {

    let params = new HttpParams();
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    const param = new HttpParams().set("soldeCreance",soldeCreance.toString());

    const fullURL = `${this.baseUrl}/${id}?${param.toString()}`;
    console.log({ fullURL });

    let data = {"soldeCreance":soldeCreance};
    console.log(data);
    console.log(data.soldeCreance);
    return this.http.patch<any>("http://localhost:8080/alAmine/setCreanceOnlySolde/"+id+"?soldeCreance="+data.soldeCreance, {headers: headers});

   }

  deleteCreance(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/creances/${id}`, { responseType: 'text' });
  }

}
