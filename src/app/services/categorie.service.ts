import { Injectable } from '@angular/core';
import { Categorie } from '../models/categorie';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officiedocument.spreadsheetml.sheet;charset-UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = '/api/categories';
  choixmenu : string  = 'A';
  listData : Categorie[];

  public formData:  Categorie;

  public dataForm:  FormGroup;

  private listners = new Subject<any>();

  public jwtToken = null;
  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  loadToken() {
    this.jwtToken = localStorage.getItem('token');
  }

  getAllCategories(): Observable<any> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(`${this.baseUrl}/categories`);

  }

  getCategorieByID(id:number):any {
    return this.http.get(`${this.baseUrl}/categories/`+id).toPromise();
  }

  public getCategorieById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/categories/${id}`);
  }

  createCategorie(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/categories`, info);
  }

  /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllCategorieParPage(page: number, size: number) {
    return this.http.get(this.baseUrl+"/categories/chercherCategoriesParPages?page="+page+"&size="+size);
  }
  /**
   * Methode pour chercher des categories par nom
   */
  public getCategorieByKeyWord(mc: string, page: number, size: number) {
    return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/categories`, info);
  }

  updateCategorie(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/categories/${id}`, value);
  }

  deleteCategorie(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categories/${id}`, { responseType: 'text' });
  }

  /**
   * method pour importer les données de Excel à MySQL
   * @param formData
   */
  public uploadCategorieExcelFile(formData: FormData) {

    let headers = new HttpHeaders();

    headers.append('Content-Type','multipart/form-data');
    headers.append('Accept', 'application/json');

    const httpOptions = { headers: headers };

    return this.http.post(`${this.baseUrl}/uploadCategorie`, formData, httpOptions);

  }

  /**
   * methode permettant de generer un fichier excel depuis API Spring boot
   */

  generateExcelFile() {
    this.http.get(`${this.baseUrl}/download/categories.xlsx`,{ observe: 'response', responseType: 'blob' }).subscribe(res => {
      const blob = new Blob([res.body], { type: 'application/vnd.ms-excel' });
      FileSaver.saveAs(blob, 'categories.xlsx');
    });

  }
  /**
   * methode permettant de generer un pdf depuis API Spring boot
   */
  exportPdfCategories(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/createCategoriePdf`, {responseType: 'blob'});
  }

}
