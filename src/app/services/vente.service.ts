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

 // private baseUrl = 'http://localhost:8080/alAmine';
  private baseUrl = window["cfgApiBaseUrl"];

   choixmenu : string  = 'A';
   listData : Vente[];
   public formData:  FormGroup;
   list: any={};
   vente: Vente;

   listLigneVente: LigneVente[];


   //public dataForm:  FormGroup;

  // list: LigneVente[] = [];

  // public formData:  Vente;
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

   /* createCommandeClient(info: Object): Observable<Object> {
     return this.http.post(`${this.baseUrl}/commandesClientes`, info);
   } */

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

   /**
    * Methode pour afficher la liste des categories par pages
    */
   public getAllVenteParPage(page: number, size: number) {
     return this.http.get(this.baseUrl+"/ventes/chercherCategoriesParPages?page="+page+"&size="+size);
   }
   /**
    * Methode pour chercher des categories par nom
    */
   public getVenteByKeyWord(mc: string, page: number, size: number) {
     return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

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
