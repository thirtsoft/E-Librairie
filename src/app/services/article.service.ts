import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Article } from '../models/article';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officiedocument.spreadsheetml.sheet;charset-UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : Article[];
  list : Article[];
  public dataForm:  FormGroup;

  private listners = new Subject<any>();
  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllArticles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/produits`);
  }

  getArticleByID(id:number):any {
    return this.http.get(`${this.baseUrl}/produits/`+id).toPromise();
  }

  public getArticleById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/produits/${id}`);
  }

  exportPdfArticle(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/createPdf`,{responseType: 'blob'});
  }

  createArticle(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/produits`, info);
  }

  /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllArticleParPage(page: number, size: number) {
    return this.http.get(this.baseUrl+"/produits/chercherCategoriesParPages?page="+page+"&size="+size);
  }
  /**
   * Methode pour chercher des categories par nom
   */
  public getArticleByKeyWord(mc: string, page: number, size: number) {
    return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/produits`, info);
  }
  updateArticle(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/produits/${id}`, value);
  }
  deleteArticle(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/produits/${id}`, { responseType: 'text' });
  }
  /**
   * method pour importer les données de Excel à MySQL
   * @param formData
   */
  public uploadExcelFile(formData: FormData) {

    let headers = new HttpHeaders();

    headers.append('Content-Type','multipart/form-data');
    headers.append('Accept', 'application/json');

    const httpOptions = { headers: headers };

    return this.http.post(`${this.baseUrl}/upload`, formData, httpOptions);

  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: {'data': worksheet}, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array'});
    this.saveAsExcelFile(excelBuffer, excelFileName);

  }

  public saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);

  }

  /**
   * methode permettant de generer un fichier excel depuis API Spring boot
   */

  generateExcelFile() {
    this.http.get(`${this.baseUrl}/download/articles.xlsx`,{ observe: 'response', responseType: 'blob' }).subscribe(res => {
      const blob = new Blob([res.body], { type: 'application/vnd.ms-excel' });
      FileSaver.saveAs(blob, 'articles.xlsx');
    });

  }
  /**
   * methode permettant de generer un pdf depuis API Spring boot
   */
  exportPdfProduits(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/createPdf`, {responseType: 'blob'});
  }



}
