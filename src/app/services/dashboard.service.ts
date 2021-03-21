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

  private baseUrl_Creance = 'http://localhost:8081/alAmine';

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
  getNumberOfProduitByScategorie(): Observable<any> {
    return this.http.get(`${this.baseUrl_Com}/searchCountProduitsByStock`);
  }
  getNumberOfProductByStock(): Observable<any> {
    return this.http.get(`${this.baseUrl_Com}/countProduitsByStock`);
  }
  getNumberOfProductWhenStockEqualStockInit(): Observable<any> {
    return this.http.get(`${this.baseUrl_Com}/countProduitsWhenQStockEqualStockInit`);
  }
  getNumberOfProductWhenStockInfStockInit(): Observable<any> {
    return this.http.get(`${this.baseUrl_Com}/countProduitsWhenQStockInfStockInit`);
  }
  getNumberOfCommandes(): Observable<any> {
    return this.http.get(`${this.baseUrl_Com}/NumberOfCommande`);
  }
  getNumberOfVentesByDay(): Observable<any> {
    return this.http.get(`${this.baseUrl_Seller}/NumberOfVenteByDay`);
  }

  getNumbersOfClients(): Observable<any> {
    return this.http.get(`${this.baseUrl_Com}/NumberOfClients`);
  }

  getNumbersOfFournisseurs(): Observable<any> {
    return this.http.get(`${this.baseUrl_Creance}/countFournisseurs`);
  }
  getSumTotalOfCommandes(): Observable<any> {
    return this.http.get(`${this.baseUrl_Com}/NumbersOfCommandes`);
  }

  getSumTotalOfVentes(): Observable<any> {
    return this.http.get(`${this.baseUrl_Seller}/SumsOfVentes`);
  }

  getSumsOfVentesByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl_Seller}/SumsOfVentesByMonth`);
  }

  getSumsOfVentesByYear(): Observable<any> {
    return this.http.get(`${this.baseUrl_Seller}/SumsOfVentesByYear`);
  }
  getSumsOfCommandesByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl_Com}/SumsOfCommandesByMonth`);
  }
  getSumsOfCommandesByYear(): Observable<any> {
    return this.http.get(`${this.baseUrl_Com}/SumsOfCommandesByYear`);
  }

  getSumListOfCreancesByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl_Creance}/sumTotalOfCreanceByMonth`);
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
