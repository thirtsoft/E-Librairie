import { Injectable } from '@angular/core';
import { Creance } from '../models/creance';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreanceService {

  baseUrl = environment.apiBaseUrl;

//  baseUrl = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

//  baseUrl = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";

  choixmenu : string  = 'A';
  listData : Creance[];

  formData:  FormGroup;
  list: any={}
  dataForm:  FormGroup;
  refCreance;

  private listners = new Subject<any>();

  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllCreances(): Observable<Creance[]> {
    return this.http.get<Creance[]>(`${this.baseUrl}/creances/all`);
  }

  getAllCreancesOrderDesc(): Observable<Creance[]> {
    return this.http.get<Creance[]>(`${this.baseUrl}/creances/allCreanceOrderDesc`);
  }

  getAllCreancesOf3LatestMonths(): Observable<Creance[]> {
    return this.http.get<Creance[]>(`${this.baseUrl}/creances/allCreanceOf3LatestMonths`);
  }

  getTop500CreancesOrderByIdDesc(): Observable<Creance[]> {
    return this.http.get<Creance[]>(`${this.baseUrl}/creances/findTop500OfCreanceOrderByIdDesc`);
  }

  getCreancetByID(id:number):any {
    return this.http.get(`${this.baseUrl}/creances/findById/`+id).toPromise();
  }

  public getCreanceById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/creances/findById/${id}`);
  }

  /* createCreance(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/creances`, info);
  } */

  createCreance(info: Creance, id:number) {
    return this.http.post(`${this.baseUrl}/creances/create?id=`+id, info);
  }

  updateCreance(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/creances/update/${id}`, value);
  }

  updateStatusCreance(id: number, status: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    let data = {"status":status};

    return this.http.patch<any>(`${this.baseUrl}/creances/setCreanceOnlyStatus/`+id+"?status="+data.status, {headers: headers});

  //  return this.http.patch<any>("http://localhost:8081/alAmine/setCreanceOnlyStatus/"+id+"?status="+data.status, {headers: headers});

  //  return this.http.patch<any>("http://localhost:8080/Library-0.0.1-SNAPSHOT/alAmine/setCreanceOnlyStatus/"+id+"?status="+data.status, {headers: headers});
  }

  updateAvanceCreance(id: number, avanceCreance: number): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    let data = {"avanceCreance":avanceCreance};

    return this.http.patch<any>(`${this.baseUrl}/creances/setCreanceOnlyAvanceCreance/`+id+"?avanceCreance="+data.avanceCreance, {headers: headers});

  //  return this.http.patch<any>("http://localhost:8081/alAmine/setCreanceOnlyAvanceCreance/"+id+"?avanceCreance="+data.avanceCreance, {headers: headers});

  //  return this.http.patch<any>("http://localhost:8080/Library-0.0.1-SNAPSHOT/alAmine/setCreanceOnlyAvanceCreance/"+id+"?avanceCreance="+data.avanceCreance, {headers: headers});

  }

  deleteCreance(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/creances/delete/${id}`, { responseType: 'text' });
  }

  generateReferenceCreance(): Observable<any> {
    return this.http.get(`${this.baseUrl}/creances/generateReferenceCreance`);
  }

  getReferenceCreance() {
    this.generateReferenceCreance().subscribe(
      response =>{
        this.refCreance = response;
        console.log("Numero Vente:" + this.refCreance);
      }
    );
  }
}
