import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Scategorie } from '../models/scategorie';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officiedocument.spreadsheetml.sheet;charset-UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ScategorieService {

  private baseUrl_1 = 'http://localhost:8081/prodApi';

  //  private baseUrl = window["cfgApiBaseUrl"];
  // private baseUrl = '/api/categories';
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
     return this.http.get('http://localhost:8081/prodApi/scategories');
   }

   getScategorieByID(id:number):any {
    return this.http.get(`${this.baseUrl_1}/scategories/`+id).toPromise();
  }

   public getScategorieById(id: number): Observable<Object> {
     return this.http.get(`${this.baseUrl_1}/scategories/${id}`);
   }

   getListScategoriesByCategory(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl_1}/searchListScategoriesByCategoryId/?catId=${id}`);
  }

   getListScategoriesByCategoryId(id: number){
    return this.http.get('http://localhost:8081/prodApi/searchListScategoriesByCategoryId/' + id);
  }

   createScategorie(info: Object): Observable<Object> {
     return this.http.post(`${this.baseUrl_1}/scategories`, info);
   }

   updateScategorie(id: number, value: any): Observable<Object> {
     return this.http.put(`${this.baseUrl_1}/scategories/${id}`, value);
   }

   deleteScategorie(id: number): Observable<any> {
     return this.http.delete(`${this.baseUrl_1}/scategories/${id}`, { responseType: 'text' });
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

    return this.http.post(`${this.baseUrl_1}/uploadScategorie`, formData, httpOptions);

  }

  /**
   * methode permettant de generer un fichier excel depuis API Spring boot
   */

  generateExcelFile() {
    this.http.get(`${this.baseUrl_1}/download/scategories.xlsx`,{ observe: 'response', responseType: 'blob' }).subscribe(res => {
      const blob = new Blob([res.body], { type: 'application/vnd.ms-excel' });
      FileSaver.saveAs(blob, 'scategories.xlsx');
    });

  }
  /**
   * methode permettant de generer un pdf depuis API Spring boot
   */
  exportPdfScategories(): Observable<Blob> {
    return this.http.get(`${this.baseUrl_1}/createScategoriePdf`, {responseType: 'blob'});
  }

}
