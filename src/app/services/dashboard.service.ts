import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { TokenStorageService } from './../auth/token-storage.service';
import { Vente } from '../models/vente';
import { HttpClient } from '@angular/common/http';
import { CommandeClient } from '../models/commande-client';
import { Client } from '../models/client';

import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = environment.apiBaseUrl;

//  baseUrl = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

//  baseUrl = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";

 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listDataVente : Vente[];
  listDataCmd : CommandeClient[];
  listDataClient : Client[];

  generatedNumber;
  id;

  dataForm:  FormGroup;

  private listners = new Subject<any>();

  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient,
              private tokenService: TokenStorageService
  ) { }

  getNumberOfProduitByScategorie(): Observable<any> {
    return this.http.get(`${this.baseUrl}/produits/searchCountProduitsByStock`);
  }

  getNumberOfProductByStock(): Observable<any> {
    return this.http.get(`${this.baseUrl}/produits/countProduitsByStock`);
  }

  getNumberOfProductWhenStockEqualStockInit(): Observable<any> {
    return this.http.get(`${this.baseUrl}/produits/countProduitsWhenQStockEqualStockInit`);
  }

  getNumberOfProductWhenStockInfStockInit(): Observable<any> {
    return this.http.get(`${this.baseUrl}/produits/countProduitsWhenQStockInfStockInit`);
  }

  getNumberOfCommandes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/commandes/NumberOfCommande`);
  }

  getNumberOfVentesByDay(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ventes/NumberOfVenteByDay`);
  }

  getNumbersOfClients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/clients/NumberOfClients`);
  }

  getNumbersOfFournisseurs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/fournisseurs/countFournisseurs`);
  }

  getSumTotalOfCommandes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/commandes/NumbersOfCommandes`);
  }

  getSumTotalOfVentes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ventes/SumsOfVentes`);
  }

  getSumsOfVentesByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ventes/SumsOfVentesByMonth`);
  }

  getSumsOfVentesByYear(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ventes/SumsOfVentesByYear`);
  }

  getSumsOfCommandesByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/commandes/SumsOfCommandesByMonth`);
  }

  getSumsOfCommandesByYear(): Observable<any> {
    return this.http.get(`${this.baseUrl}/commandes/SumsOfCommandesByYear`);
  }

  getSumListOfCreancesByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/creances/sumTotalOfCreanceByMonth`);
  }

  getNumberTotalOfCommandeByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/commandes/searchNumberOfCommandeByMonth`);
  }

  getNumberTotalOfVenteByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ventes/searchNumberOfVenteByMonth`);
  }

  getSumTotalOfCommandeByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/commandes/searchSumCommandeByMonth`);
  }

  getSumTotalOfVenteByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ventes/searchSumVenteByMonth`);
  }

  getSumTotalOfVenteByYear(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ventes/searchSumVenteByYears`);
  }

  getSumMontantTotalOfChargeByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/charges/sumMontantTotalChargeByMonth`);
  }

  getSumTotalOfCreanceByYear(): Observable<any> {
    return this.http.get(`${this.baseUrl}/creances/SumTotalOfCreanceByYear`);
  }

  generateNumCommande(): Observable<any> {
    return this.http.get(`${this.baseUrl}/commandes/generateCodeCommand`);
  }

  getNumeroCommande(): void {
    this.generateNumCommande().subscribe(
      response =>{
        this.generatedNumber = response;
        console.log("Numero Vente:" + this.generatedNumber);
      }
    );
  }

  getCurrentUser(): Observable<any> {
    return this.tokenService.getUser();
  }

  getUserId() {
    const user = this.tokenService.getUser();
    this.id = user.id
  }


}
