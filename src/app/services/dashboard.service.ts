import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Vente } from '../models/vente';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommandeClient } from '../models/commande-client';
import { Client } from '../models/client';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://localhost:8081/alAmine';

 // private baseUrl = 'http://localhost:8080/alAmine';
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
  getNumberOfProduitByStock(): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchCountProduitsByStock`);
  }

  getNumberOfCommandes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/NumberOfCommande`);
  }

  getNumberOfVentesByDay(): Observable<any> {
    return this.http.get(`${this.baseUrl}/NumberOfVenteByDay`);
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

  getNumberTotalOfCommandeByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchNumberOfCommandeByMonth`);
  }

  getNumberTotalOfVenteByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchNumberOfVenteByMonth`);
  }

  getSumTotalOfCommandeByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchSumCommandeByMonth`);
  }

  getSumTotalOfVenteByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchSumVenteByMonth`);
  }

  getSumTotalOfVenteByYear(): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchSumVenteByYears`);
  }

}
