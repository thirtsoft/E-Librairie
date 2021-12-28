import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { Produit } from '../models/produit';

import { OnlineofflineService } from './onlineoffline.service';
import Dexie from 'dexie';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officiedocument.spreadsheetml.sheet;charset-UTF-8';
const EXCEL_EXTENSION = '.xlsx';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

//  baseUrl_1 = environment.apiBaseUrl;

  baseUrl_1 = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

//  private baseUrl_1  = 'http://localhost:8080/Library-0.0.1-SNAPSHOT/prodApi';
  /* private db: Dexie;
  private tableProd: Dexie.Table<Produit, number>; */

  Data;
  listDataProd: any[] = [];

 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : Produit[];
  list : Produit[];
  dataForm: FormGroup;
  formData: Produit;

  listDataProduit : Produit[];
  listProduit : Produit[];
  formDataProduit: Produit;

  private listners = new Subject<any>();

  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient,
              private offlineService: OnlineofflineService
  ) {
    //  this.ouvrirStatusConnexion();
    //  this.connectToDatabase();
    //  this.addAllDataProdToIndexeddb();
  }

  getAllProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.baseUrl_1}/produits/all`);
  }

  getAllProductsOrderDesc(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.baseUrl_1}/produits/allProduitOrderDesc`);
  }

  getProduitByID(id:number):any {
    return this.http.get(`${this.baseUrl_1}/produits/findById/`+id).toPromise();
  }

  public getProduitById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.baseUrl_1}/produits/findById/${id}`);
  }

  exportPdfProduit(): Observable<Blob> {
    return this.http.get(`${this.baseUrl_1}/produits/createPdf`,{responseType: 'blob'});
  }

  createProduits(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl_1}/produits/create`, info);
  }

  private createProduitAPI(info: Produit) {
    this.http.post(`${this.baseUrl_1}/produits/create`, info)
      .subscribe(
        ()=> alert('Produit ajouté avec succes'),
        (err) => console.log('Erreur lors de ajout')
    );
  }


  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl_1}/produits/create`, info);
  }

  saveProduit(info: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.baseUrl_1}/produits/create`, info);
  }

  updateProduit(id: number, value: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.baseUrl_1}/produits/update/${id}`, value);
  }

  deleteProduit(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/produits/delete/${id}`, { responseType: 'text' });
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

    return this.http.post(`${this.baseUrl_1}/produits/upload`, formData, httpOptions);


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
    this.http.get(`${this.baseUrl_1}/produits/download/articles.xlsx`,
    { observe: 'response', responseType: 'blob' })
      .subscribe(res => {
        const blob = new Blob([res.body], { type: 'application/vnd.ms-excel' });
        FileSaver.saveAs(blob, 'articles.xlsx');
        }
      );

  }

  /**
   * methode permettant de generer un pdf depuis API Spring boot
   */
  exportPdfProduits(): Observable<Blob> {
    return this.http.get(`${this.baseUrl_1}/produits/createPdf`, {responseType: 'blob'});
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

  createProduit(info: Produit)  {
    if (this.offlineService.isOnLine) {
      this.createProduitAPI(info);
      console.log('Produit ajouter via API');
    }else {
    //  this.createProduitToIndexedDb(info);
      console.log(info);
      console.log('Produit ajouter via IndexedDb');
    }
  }

 /*  private async createProduitToIndexedDb(categorie: Produit) {
    try {
      console.log(categorie);
      await this.tableProd.add(categorie);
      const todosCategorie: Produit[] = await this.tableProd.toArray();
      console.log(categorie);
      console.log('Produit ajouté non IndexedDb', todosCategorie);
    } catch (error) {
      console.log('erreur ajout categorie no indexedDb', error);
    }
  }

  private async sendDataFromIndexedDbToAPI() {
    const todosCategorie: Produit[] = await this.tableProd.toArray();
    for(const categorie of todosCategorie) {
      this.createProduitAPI(categorie);
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
  createProduitWithBarCode(info: Object): Observable<Produit> {
    return this.http.post<Produit>(`${this.baseUrl_1}/produits/createProduitWithBarcode`, info);
  }

  public getProduitByBarcode(barCode: string): Observable<Produit> {
  //  return this.http.get<Produit> ('http://localhost:8081/prodApi/produits/searchProduitByBarCode/' + barCode);

    return this.http.get<Produit>(`${this.baseUrl_1}/produits/searchProduitByBarCode/` + barCode);

  //  return this.http.get<Produit> ('http://localhost:8080/Library-0.0.1-SNAPSHOT/prodApi/produits/searchProduitByBarCode/' + barCode);

  }

  createProduitWithQrCode(info: Object): Observable<Produit> {
    return this.http.post<Produit>(`${this.baseUrl_1}/produits/createProduitWithQrcode`, info);
  }


  public getProduitByQrcode(qrCode: string): Observable<Produit> {
    return this.http.get<Produit>(`${this.baseUrl_1}/produits/searchProduitByQrCode/${qrCode}`);
  }


}
