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

  private baseUrl_Seller = 'http://localhost:8081/apiSeller';

  private baseUrl_Com = 'http://localhost:8081/prodApi';

 // private baseUrl_Custom = 'http://localhost:8081/prodApi';

 // private baseUrl_Prod = 'http://localhost:8081/alAmine';
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
    return this.http.get(`${this.baseUrl_Com}/searchCountProduitsByStock`);
  }

  getNumberOfCommandes(): Observable<any> {
    return this.http.get(`${this.baseUrl_Com}/NumberOfCommande`);
  }

  getNumberOfVentesByDay(): Observable<any> {
    return this.http.get(`${this.baseUrl_Seller}/NumberOfVenteByDay`);
  }

  getSumTotalOfCommandes(): Observable<any> {
    return this.http.get(`${this.baseUrl_Com}/NumbersOfCommandes`);
  }
  getNumbersOfClients(): Observable<any> {
    return this.http.get(`${this.baseUrl_Com}/NumberOfClients`);
  }
  getSumTotalOfVentes(): Observable<any> {
    return this.http.get(`${this.baseUrl_Seller}/SumsOfVentes`);
  }

  getNumberTotalOfCommandeByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl_Com}/searchNumberOfCommandeByMonth`);
  }

  getNumberTotalOfVenteByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl_Seller}/searchNumberOfVenteByMonth`);
  }

  getSumTotalOfCommandeByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl_Com}/searchSumCommandeByMonth`);
  }

  getSumTotalOfVenteByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl_Seller}/searchSumVenteByMonth`);
  }

  getSumTotalOfVenteByYear(): Observable<any> {
    return this.http.get(`${this.baseUrl_Seller}/searchSumVenteByYears`);
  }

}
