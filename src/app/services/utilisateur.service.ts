import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Fournisseur } from '../models/fournisseur';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private baseUrl = 'http://localhost:8081/alAmine';

  choixmenu : string  = 'A';
  listData : Utilisateur[];
  formData:  Fournisseur;

  dataForm:  FormGroup;

  userId;

  private listners = new Subject<any>();
  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }

  getAllUtilisateurs() {
    return this.http.get(`${this.baseUrl}/utilisateurs`);
  }

  getUtilisateurById(id: number) {
    return this.http.get(`${this.baseUrl}/utilisateurs/${id}`);
  }


}
