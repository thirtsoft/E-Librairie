import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Article } from '../models/article';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { OnlineofflineService } from './onlineoffline.service';
import Dexie from 'dexie';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officiedocument.spreadsheetml.sheet;charset-UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {


  private baseUrl_1 = 'https://alamine-admin.herokuapp.com/prodApi';

  // private baseUrl_1 = 'http://localhost:8081/prodApi';
 // private baseUrl_1 = 'http://localhost:8081/prodApi';
  /* private db: Dexie;
  private tableProd: Dexie.Table<Article, number>; */

  Data;
  listDataProd: any[] = [];


 // private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : Article[];
  list : Article[];
  dataForm: FormGroup;
  formData: Article;

  private listners = new Subject<any>();
  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient,
    private offlineService: OnlineofflineService) {
    //  this.ouvrirStatusConnexion();
    //  this.connectToDatabase();
    //  this.addAllDataProdToIndexeddb();
   }

  getAllArticles(): Observable<any> {
    return this.http.get(`${this.baseUrl_1}/produits`);
  }

  getArticleByID(id:number):any {
    return this.http.get(`${this.baseUrl_1}/produits/`+id).toPromise();
  }

  public getArticleById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl_1}/produits/${id}`);
  }

  exportPdfArticle(): Observable<Blob> {
    return this.http.get(`${this.baseUrl_1}/createPdf`,{responseType: 'blob'});
  }

  createArticle(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl_1}/produits`, info);
  }

  private createArticleAPI(info: Article) {
    this.http.post(`${this.baseUrl_1}/produits`, info)
      .subscribe(
        ()=> alert('Article ajouté avec succes'),
        (err) => console.log('Erreur lors de ajout')
    );
  }


  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl_1}/produits`, info);
  }
  updateArticle(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl_1}/produits/${id}`, value);
  }
  deleteArticle(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/produits/${id}`, { responseType: 'text' });
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

    return this.http.post(`${this.baseUrl_1}/upload`, formData, httpOptions);

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
    this.http.get(`${this.baseUrl_1}/download/articles.xlsx`,{ observe: 'response', responseType: 'blob' }).subscribe(res => {
      const blob = new Blob([res.body], { type: 'application/vnd.ms-excel' });
      FileSaver.saveAs(blob, 'articles.xlsx');
    });

  }
  /**
   * methode permettant de generer un pdf depuis API Spring boot
   */
  exportPdfProduits(): Observable<Blob> {
    return this.http.get(`${this.baseUrl_1}/createPdf`, {responseType: 'blob'});
  }

   // Methode pour Offline&Online et DexieJS

  // Créer la BD et la table
  // ouvrir la base de données
  /* connectToDatabase(): void {
    this.db.open().catch((error) => {
      alert("Errod during connecting to database : " + error);
    });

  } */


  /**
   * Récuper les données depuis les services workers
   * Et les enregistrer dans Dexie database
   *
   */

 /*  async addDataToIndexedDB() {
    return fetch("http://localhost:8081/prodApi/**").then(resp => {
      this.Data = resp;
      this.db.transaction('rw', this.tableProd, async () => {
        console.log(this.Data);
        for (let i = 0; i < this.Data.length; i++) {
          this.tableProd.put(this.Data[i]);
        }
      });
    });

  } */

  createProduit(info: Article)  {
    if (this.offlineService.isOnLine) {
      this.createArticleAPI(info);
      console.log('Article ajouter via API');
    }else {
    //  this.createArticleToIndexedDb(info);
      console.log(info);
      console.log('Article ajouter via IndexedDb');
    }
  }

 /*  private async createArticleToIndexedDb(categorie: Article) {
    try {
      console.log(categorie);
      await this.tableProd.add(categorie);
      const todosCategorie: Article[] = await this.tableProd.toArray();
      console.log(categorie);
      console.log('Article ajouté non IndexedDb', todosCategorie);
    } catch (error) {
      console.log('erreur ajout categorie no indexedDb', error);
    }
  }

  private async sendDataFromIndexedDbToAPI() {
    const todosCategorie: Article[] = await this.tableProd.toArray();
    for(const categorie of todosCategorie) {
      this.createArticleAPI(categorie);
      await this.tableProd.delete(categorie.id);
      console.log('Categorie com id ${categorie.id} foi excluddo com successfull');
    }
  }


  private ouvrirStatusConnexion() {
    this.offlineService.statusConnexion
      .subscribe(online => {
        if(online) {
         this.sendDataFromIndexedDbToAPI();
        }else {
          console.log('Mode offline active');
        }
      });
  }

*/

}
