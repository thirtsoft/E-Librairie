import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Scategorie } from '../models/scategorie';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officiedocument.spreadsheetml.sheet;charset-UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ScategorieService {


  baseUrl_1 = environment.apiBaseUrl;

// baseUrl_1 = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

//  baseUrl_1 = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";


  //  private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : Scategorie[];

  public formData:  Scategorie;

  public dataForm:  FormGroup;

  private listners = new Subject<any>();

  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllScategories(): Observable<any> {
  //   return this.http.get('http://localhost:8081/prodApi/scategories');
     return this.http.get(`${this.baseUrl_1}/scategories/all`);
  }

  getAllScategorieOrderDesc(): Observable<Scategorie[]> {
    return this.http.get<Scategorie[]>(`${this.baseUrl_1}/scategories/allScategorieOrderDesc`);
  }

  getScategorieByID(id:number):any {
    return this.http.get(`${this.baseUrl_1}/scategories/findById/`+id).toPromise();
  }

  public getScategorieById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl_1}/scategories/findById/${id}`);
  }

  getListScategoriesByCategory(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl_1}/scategories/searchListScategoriesByCategoryId/?catId=${id}`);
  }

  getListScategoriesByCategoryId(id: number){

  //  return this.http.get('http://localhost:8081/prodApi/searchListScategoriesByCategoryId/' + id);

   return this.http.get('http://localhost:8080/Library-0.0.1-SNAPSHOT/prodApi/searchListScategoriesByCategoryId/' + id);
  }

  createScategorie(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl_1}/scategories/create`, info);
  }

  updateScategorie(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl_1}/scategories/update/${id}`, value);
  }

  deleteScategorie(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/scategories/delete/${id}`, { responseType: 'text' });
  }

   /**
   * method pour importer les données de Excel à MySQL
   * @param formData
   */
  public uploadScategorieExcelFile(formData: FormData) {
    let headers = new HttpHeaders();
    headers.append('Content-Type','multipart/form-data');
    headers.append('Accept', 'application/json');

    const httpOptions = { headers: headers };

    return this.http.post(`${this.baseUrl_1}/scategories/uploadScategorie`, formData, httpOptions);

  }

  /**
   * methode permettant de generer un fichier excel depuis API Spring boot
   */

  generateExcelFile() {
    this.http.get(`${this.baseUrl_1}/scategories/download/scategories.xlsx`,{ observe: 'response', responseType: 'blob' })
      .subscribe(res => {
        const blob = new Blob([res.body], { type: 'application/vnd.ms-excel' });
        FileSaver.saveAs(blob, 'scategories.xlsx');
      }
    );

  }

  /**
   * methode permettant de generer un pdf depuis API Spring boot
   */
  exportPdfScategories(): Observable<Blob> {
    return this.http.get(`${this.baseUrl_1}/scategories/createScategoriePdf`, {responseType: 'blob'});
  }

}
