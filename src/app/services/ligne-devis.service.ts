import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LigneDevis } from '../models/ligne-devis';

@Injectable({
  providedIn: 'root'
})
export class LigneDevisService {

  private baseUrl = 'http://localhost:8080/alAmine';
  // private baseUrl = window["cfgApiBaseUrl"];

   choixmenu : string  = 'A';
   listData : LigneDevis[];
   public dataForm:  FormGroup;
   public formData:  FormGroup;

   lcreance: LigneDevis = new LigneDevis();
   lcreanceList: LigneDevis[];

   constructor(private http: HttpClient) { }

   getAllLigneDevis(): Observable<any> {
     return this.http.get(`${this.baseUrl}/ligneDevis`);
   }
   getAllByNumero(id: number): Observable<Object> {
     return this.http.get(`${this.baseUrl}/ligneDevis/${id}`);
   }

    /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllLigneDevisByDevis(devId: number) {
    return this.http.get(`${this.baseUrl}/searchListLigneDevisByDevisId/${devId}`);
  }

  getLigneDevisId(id: number): Observable<Object> {
     return this.http.get(`${this.baseUrl}/ligneDevis/${id}`);
   }

   createLigneDevis(info: Object): Observable<Object> {
     return this.http.post(`${this.baseUrl}/ligneDevis`, info);
   }

   updateLigneDevis(id: number, value: any): Observable<Object> {
     return this.http.put(`${this.baseUrl}/ligneDevis/${id}`, value);
   }

   deleteLigneDevis(id: number): Observable<any> {
     return this.http.delete(`${this.baseUrl}/ligneDevis/${id}`);
   }

}
