import { Injectable } from '@angular/core';
import { Fournisseur } from '../models/fournisseur';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private baseUrl = 'http://localhost:8080/alAmine';
  //private baseUrl = window["cfgApiBaseUrl"];

   choixmenu : string  = 'A';
   listData : Fournisseur[];
   formData:  Fournisseur;

   public dataForm:  FormGroup;

   private listners = new Subject<any>();
  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

   constructor(private http: HttpClient) { }

   getAllFournisseurs(): Observable<any> {
     return this.http.get(`${this.baseUrl}/fournisseurs`);
   }

   getFournisseurByID(id:number):any {
    return this.http.get(`${this.baseUrl}/fournisseurs/`+id).toPromise();
  }

   public getFournisseurById(id: number): Observable<Object> {
     return this.http.get(`${this.baseUrl}/fournisseurs/${id}`);
   }


   createFournisseur(info: Object): Observable<Object> {
     return this.http.post(`${this.baseUrl}/fournisseurs`, info);
   }

   /**
    * Methode pour afficher la liste des categories par pages
    */
   public getAllFournisseurParPage(page: number, size: number) {
     return this.http.get(this.baseUrl+"/fournisseurs/chercherCategoriesParPages?page="+page+"&size="+size);
   }
   /**
    * Methode pour chercher des categories par nom
    */
   public getFournisseurByKeyWord(mc: string, page: number, size: number) {
     return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

   }

   createData(info: Object): Observable<Object> {
     return this.http.post(`${this.baseUrl}/fournisseurs`, info);
   }

   updateFournisseur(id: number, value: any): Observable<Object> {
     return this.http.put(`${this.baseUrl}/fournisseurs/${id}`, value);
   }

   deleteFournisseur(id: number): Observable<any> {
     return this.http.delete(`${this.baseUrl}/fournisseurs/${id}`, { responseType: 'text' });
   }

}
