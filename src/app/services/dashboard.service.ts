import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Vente } from '../models/vente';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommandeClient } from '../models/commande-client';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

   choixmenu : string  = 'A';
   listDataVente : Vente[];
   listDataCmd : CommandeClient[];
   listDataClient : Client[];

   public dataForm:  FormGroup;

   private listners = new Subject<any>();
   listen(): Observable<any> {
     return this.listners.asObservable();
   }
   filter(filterBy: string) {
     this.listners.next(filterBy);
   }

   constructor(private http: HttpClient) { }

   getNumberOfCommandes(): Observable<any> {
     return this.http.get(`${this.baseUrl}/NumberOfCommande`);
   }

   getSumTotalOfCommandes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/NumbersOfCommandes`);
  }

  getNumbersOfClients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/NumberOfClients`);
  }

  getSumTotalOfVentes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/SumsOfVentes`);
  }

   getCreancetByID(id:number):any {
     return this.http.get(`${this.baseUrl}/creances/`+id).toPromise();
   }

   public getCreanceById(id: number): Observable<Object> {
     return this.http.get(`${this.baseUrl}/creances/${id}`);
   }

   createCreance(info: Object): Observable<Object> {
     return this.http.post(`${this.baseUrl}/creances`, info);
   }

   /**
    * Methode pour afficher la liste des categories par pages
    */
   public getAllCreanceParPage(page: number, size: number) {
     return this.http.get(this.baseUrl+"/creances/chercherCategoriesParPages?page="+page+"&size="+size);
   }
   /**
    * Methode pour chercher des categories par nom
    */
   public getCreanceByKeyWord(mc: string, page: number, size: number) {
     return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

   }

   createData(info: Object): Observable<Object> {
     return this.http.post(`${this.baseUrl}/creances`, info);
   }

   updateCreance(id: number, value: any): Observable<Object> {
     return this.http.put(`${this.baseUrl}/creances/${id}`, value);
   }

   deleteCreance(id: number): Observable<any> {
     return this.http.delete(`${this.baseUrl}/creances/${id}`, { responseType: 'text' });
   }

}
