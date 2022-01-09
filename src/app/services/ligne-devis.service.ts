import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LigneDevis } from '../models/ligne-devis';

@Injectable({
  providedIn: 'root'
})
export class LigneDevisService {

  baseUrl = environment.apiBaseUrl;

//  baseUrl = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

 // baseUrl = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";

   choixmenu : string  = 'A';
   listData : LigneDevis[];
   public dataForm:  FormGroup;
   public formData:  FormGroup;

   lcreance: LigneDevis = new LigneDevis();
   lcreanceList: LigneDevis[];

   constructor(private http: HttpClient) { }

   getAllLigneDevis(): Observable<LigneDevis[]> {
     return this.http.get<LigneDevis[]>(`${this.baseUrl}/ligneDevis/all`);
   }

   getAllByNumero(id: number): Observable<Object> {
     return this.http.get(`${this.baseUrl}/ligneDevis/${id}`);
   }

   getAllLigneDevissOrderDesc(): Observable<LigneDevis[]> {
    return this.http.get<LigneDevis[]>(`${this.baseUrl}/ligneDevis/allLigneDevisOrderDesc`);
  }

    /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllLigneDevisByDevis(devId: number) {
    return this.http.get(`${this.baseUrl}/ligneDevis/searchListLigneDevisByDevisId/${devId}`);
  }

  getLigneDevisId(id: number): Observable<Object> {
     return this.http.get(`${this.baseUrl}/ligneDevis/${id}`);
   }

   createLigneDevis(info: Object): Observable<Object> {
     return this.http.post(`${this.baseUrl}/ligneDevis/create`, info);
   }

   updateLigneDevis(id: number, value: any): Observable<Object> {
     return this.http.put(`${this.baseUrl}/ligneDevis/update/${id}`, value);
   }

   deleteLigneDevis(id: number): Observable<any> {
     return this.http.delete(`${this.baseUrl}/ligneDevis/delete/${id}`);
   }

}
