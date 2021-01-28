import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vente } from '../models/vente';
import { HttpClient } from '@angular/common/http';
import { LigneVente } from '../models/ligne-vente';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

   choixmenu : string  = 'A';
   listData : Vente[];
   public formData:  FormGroup;
   list: any={};
   vente: Vente;

   listLigneVente: LigneVente[];


   orderItems: LigneVente[];

   constructor(private http: HttpClient) { }

   getAllVentes(): Observable<Vente[]> {
     return this.http.get<Vente[]>(`${this.baseUrl}/ventes`);
   }

   public getVenteById(id: number): Observable<Object> {
     return this.http.get(`${this.baseUrl}/ventes/${id}`);
   }

   getVenteID(id:number):any {
     return this.http.get(`${this.baseUrl}/ventes/${id}`).toPromise();
   }

   getSumVenteByDay(): Observable<any> {
     return this.http.get(`${this.baseUrl}/searchSumsOfVenteByDay`);
   }

   createVente() {
     var body = {
       ...this.formData,
       ligneVentes: this.orderItems
     };
     return this.http.post(`${this.baseUrl}/ventes`, body);
   }

   saveVente(info: Object) {
    return this.http.post(`${this.baseUrl}/ventes`, info);
  }


   createData(info: Object): Observable<Object> {
     return this.http.post(`${this.baseUrl}/ventes`, info);
   }

   updateVente(id: number, value: any): Observable<Object> {
     return this.http.put(`${this.baseUrl}/ventes/${id}`, value);
   }

   deleteVente(id: number): Observable<any> {
     return this.http.delete(`${this.baseUrl}/ventes/${id}`, { responseType: 'text' });
   }

}
