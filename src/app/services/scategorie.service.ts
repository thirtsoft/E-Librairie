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

  private baseUrl = 'http://localhost:8080/alAmine';
  //private baseUrl = 'http://localhost:8080/alAmine';
  // private baseUrl = '/api/categories';
   choixmenu : string  = 'A';
   listData : Scategorie[];

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
     return this.http.get(`${this.baseUrl}/scategories`);
   }

   public getScategorieById(id: number): Observable<Object> {
     return this.http.get(`${this.baseUrl}/scategories/${id}`);
   }

   getListScategoriesByCategory(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchListScategoriesByCategoryId/?catId=${id}`);
  }

   getListScategoriesByCategoryId(id: number){
    return this.http.get('http://localhost:8080/alAmine/searchListScategoriesByCategoryId/' + id);
  }

   createScategorie(info: Object): Observable<Object> {
     return this.http.post(`${this.baseUrl}/scategories`, info);
   }

   /**
    * Methode pour afficher la liste des categories par pages
    */
   public getAllScategorieParPage(page: number, size: number) {
     return this.http.get(this.baseUrl+"/scategories/chercherCategoriesParPages?page="+page+"&size="+size);
   }
   /**
    * Methode pour chercher des categories par nom
    */
   public getScategorieByKeyWord(mc: string, page: number, size: number) {
     return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

   }

   createData(info: Object): Observable<Object> {
     return this.http.post(`${this.baseUrl}/scategories`, info);
   }

   updateScategorie(id: number, value: any): Observable<Object> {
     return this.http.put(`${this.baseUrl}/scategories/${id}`, value);
   }

   deleteScategorie(id: number): Observable<any> {
     return this.http.delete(`${this.baseUrl}/scategories/${id}`, { responseType: 'text' });
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

    return this.http.post(`${this.baseUrl}/uploadScategorie`, formData, httpOptions);

  }

  /**
   * methode permettant de generer un fichier excel depuis API Spring boot
   */

  generateExcelFile() {
    this.http.get(`${this.baseUrl}/download/scategories.xlsx`,{ observe: 'response', responseType: 'blob' }).subscribe(res => {
      const blob = new Blob([res.body], { type: 'application/vnd.ms-excel' });
      FileSaver.saveAs(blob, 'scategories.xlsx');
    });

  }
  /**
   * methode permettant de generer un pdf depuis API Spring boot
   */
  exportPdfScategories(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/createScategoriePdf`, {responseType: 'blob'});
  }

}
