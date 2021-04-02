import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Fournisseur } from '../models/fournisseur';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  public baseUrl = 'http://localhost:8081/alAmine';

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
  getAllUtilisateurs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/utilisateurs`);
  }
  getUtilisateurById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/utilisateurs/${id}`);
  }

  getPhotoUtilisateur() {
    return this.http.get(`${this.baseUrl}/photoUser`);
  }

  uploadPhotoUtilisateur(file: File, userId): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.baseUrl+'/uploadUserPhoto/'+userId, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }






}
