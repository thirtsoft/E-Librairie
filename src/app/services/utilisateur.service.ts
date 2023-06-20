import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Fournisseur } from '../models/fournisseur';
import { Utilisateur } from '../models/utilisateur';

import { environment } from 'src/environments/environment';
import { Vente } from '../models/vente';

const TOKEN_KEY = 'AuthToken';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  baseUrl = environment.apiBaseUrl

  choixmenu : string  = 'A';
  listData : Utilisateur[];
  listVente : Vente[];
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

  getAllUtilisateurs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/utilisateurs/all`);
  }

  getAllUtilisateurOrderDesc(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.baseUrl}/utilisateurs/allUtilisateurOrderDesc`);
  }

  getUtilisateurById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/utilisateurs/findById/${id}`);
  }

  getPhotoUtilisateur(id: number) {
    return this.http.get(`${this.baseUrl}/utilisateurs/photoUser/`+ id);
  }

  public getUserAvatar(id: number){
    return this.http.get(`${this.baseUrl}/utilisateurs/avatar/`+ id);
  }

  updateUtilisateur(id: number, value: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.baseUrl}/utilisateurs/update/${id}`, value);
  }

  uploadPhotoUtilisateur(file: File, userId): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.baseUrl+'/utilisateurs/uploadUserPhoto/'+userId, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  /*
  uploadPhotoUtilisateur(file: File, userId): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.baseUrl+'/photo/'+userId, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }*/

  getAuthorities(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/utilisateurs/authorities`);

  }

  getAllVenteByEmployeId(userId: number): Observable<Vente[]> {
    return this.http.get<Vente[]>(`${this.baseUrl}/ventes/searchListVenteByEmpId/`+ userId, httpOptions);
  }

  






}
