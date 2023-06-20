import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Fournisseur } from '../models/fournisseur';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  baseUrl = environment.apiBaseUrl

   choixmenu : string  = 'A';
   listData : Fournisseur[];
   formData:  Fournisseur;

   dataForm:  FormGroup;

  private listners = new Subject<any>();

  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

   constructor(private http: HttpClient) { }

   getAllFournisseurs(): Observable<any> {
     return this.http.get(`${this.baseUrl}/fournisseurs/all`);
   }

  getAllFournisseursOrderDesc(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.baseUrl}/fournisseurs/allFournisseurOrderDesc`);
  }

   getFournisseurByID(id:number):any {
    return this.http.get(`${this.baseUrl}/fournisseurs/findById/`+id).toPromise();
  }

   public getFournisseurById(id: number): Observable<Fournisseur> {
     return this.http.get<Fournisseur>(`${this.baseUrl}/fournisseurs/findById/${id}`);
   }

  createFournisseur(info: Fournisseur): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(`${this.baseUrl}/fournisseurs/create`, info);
  }

   updateFournisseur(id: number, value: Fournisseur): Observable<Fournisseur> {
     return this.http.put<Fournisseur>(`${this.baseUrl}/fournisseurs/update/${id}`, value);
   }

   deleteFournisseur(id: number): Observable<any> {
     return this.http.delete(`${this.baseUrl}/fournisseurs/delete/${id}`, { responseType: 'text' });
   }

}
