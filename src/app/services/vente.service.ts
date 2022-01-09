import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Vente } from '../models/vente';
import { HttpClient } from '@angular/common/http';
import { LigneVente } from '../models/ligne-vente';
import { FormGroup } from '@angular/forms';
import Dexie from 'dexie';
import { OnlineofflineService } from './onlineoffline.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { UtilisateurService } from './utilisateur.service';
import { Utilisateur } from '../models/utilisateur';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ProfileInfo } from '../auth/profile-info';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  //baseUrl_1 = environment.apiBaseUrl;

  baseUrl_1 = environment.apiBaseUrl;

//  baseUrl_1 = 'https://alamine-admin.herokuapp.com/gestionstock-alamine/v1';

//  baseUrl_1 = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";

  private db: Dexie;
  private tableVent: Dexie.Table<Vente, number>;
  private tableLvent: Dexie.Table<LigneVente, number>;


  Data;
  listDataVente: any[] = [];
  listDataLigneVente: any[] = [];

 // private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : Vente[];
  formData:  FormGroup;
  list: any={};
  vente: Vente;
  NumVente;
  idUser;
  username;

  listLigneVente: LigneVente[];

  profileInfo: ProfileInfo = {} as ProfileInfo;

  orderItems: LigneVente[];

  id;
  currentUser: any = {};

  private listners = new Subject<any>();

  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient,
              private offlineService: OnlineofflineService,
              private tokenService: TokenStorageService,
              private authService: AuthService,
              public route: ActivatedRoute
  ) {

  /*   this.ouvrirStatusConnexion();
    this.addAllDataVenteToIndexeddb();
    this.addAllDataLigneVenteToIndexeddb(); */
  }

  getAllVentes(): Observable<Vente[]> {
    return this.http.get<Vente[]>(`${this.baseUrl_1}/ventes/all`);
  }

  getAllVentesOrderDesc(): Observable<Vente[]> {
    return this.http.get<Vente[]>(`${this.baseUrl_1}/ventes/allVenteOrderDesc`);
  }

  getAllVentesOf3LatestMonths(): Observable<Vente[]> {
    return this.http.get<Vente[]>(`${this.baseUrl_1}/ventes/allVenteOf3LatestMonths`);
  }

  getTop500OfVentesOrderByIdDesc(): Observable<Vente[]> {
    return this.http.get<Vente[]>(`${this.baseUrl_1}/ventes/findTop500OfVenteOrderByIdDesc`);
  }

  public getVenteById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl_1}/ventes/findById/${id}`);
  }

  getVenteID(id:number):any {
    return this.http.get(`${this.baseUrl_1}/ventes/findById/${id}`).toPromise();
  }

  getSumVenteByDay(): Observable<any> {
    return this.http.get(`${this.baseUrl_1}/ventes/searchSumsOfVenteByDay`);
  }

  createVente() {
    var body = {
      ...this.formData,
      ligneVentes: this.orderItems
    };
    let id: number;
    return this.http.post(`${this.baseUrl_1}/ventes/create?id=`+id, body);
  }

  saveVente(info: Vente, id:number) {
    return this.http.post(`${this.baseUrl_1}/ventes/create?id=`+id, info);
  }

  saveVenteWithBarcode(info: Vente, id:number) {
    return this.http.post(`${this.baseUrl_1}/ventes/venteWithbarCode?id=`+id, info);
  }


  createData(info: Object, id: number): Observable<Object> {
    return this.http.post(`${this.baseUrl_1}/ventes/create?id=`+id, info);
  }

  updateVente(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl_1}/ventes/update/${id}`, value);
  }

  deleteVente(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/ventes/delete/${id}`, { responseType: 'text' });
  }

  // Dexie and OffLine&OnLine

  private async addAllDataVenteToIndexeddb() {
    await this.http.get<Vente[]>(`${this.baseUrl_1}/ventes`).subscribe(response => {
      this.listDataVente = response;
      this.db.transaction('rw', this.tableVent, async ()=> {
        console.log(this.listDataVente);
        for (let i = 0; i < this.listDataVente.length; i++) {
          this.tableVent.put(this.listDataVente[i]);
        }
      });
    })

  }

  private async addAllDataLigneVenteToIndexeddb() {
    await this.http.get<LigneVente[]>(`${this.baseUrl_1}/ligneVentes`).subscribe(response => {
      this.listDataLigneVente = response;
      this.db.transaction('rw', this.tableLvent, async ()=> {
        console.log(this.listDataLigneVente);
        for (let i = 0; i < this.listDataLigneVente.length; i++) {
          this.tableLvent.put(this.listDataLigneVente[i]);
        }
      });
    })

  }

  createVenteAPI(vente: Vente, id: number) {
    return this.http.post(`${this.baseUrl_1}/ventes?id=`+id, vente);
  }


  creerVente(info: Vente, id: number)  {
    if (this.offlineService.isOnLine) {
      console.log("Debut Ajout via API");
      this.createVenteAPI(info, id);
      console.log('Vente ajouter via API');
    }else {
      console.log(info);
      this.createOrderToIndexedDB(info);
      console.log('Vente ajouter via IndexedDb');
    }
  }

  private async createOrderToIndexedDB(order: Vente) {
    const orderitems: LigneVente[] = [];
    await this.tableVent.put(order).then((id)  => {
      this.tableLvent.bulkPut(orderitems).then(ids => {return true;}).catch(err => {
          console.log(`error while creating the order items ${err}`);
          throw new Error("failed to create the order and order items");
        });
      });
  }

/*
  private async createVenteToIndexedDb(categorie: Vente) {
    try {
      console.log(categorie);
      await this.tableVent.add(categorie);
      const todosCategorie: Vente[] = await this.tableVent.toArray();
      console.log(categorie);
      console.log('Categorie ajouté non IndexedDb', todosCategorie);
    } catch (error) {
      console.log('erreur ajout categorie no indexedDb', error);
    }
  }
 */

  private async sendDataFromIndexedDbToAPI() {
    const todosVente: Vente[] = await this.tableVent.toArray();
    console.log(todosVente);
    for(const vente of todosVente) {
      console.log(vente);
      this.createVenteAPI(vente, this.idUser);
      await this.tableVent.delete(vente.id);
      console.log('Categorie com id ${categorie.id} foi excluddo com successfull');
    }
  }

  private ouvrirStatusConnexion() {
    this.offlineService.statusConnexion
      .subscribe(online => {
        if(online) {
         this.sendDataFromIndexedDbToAPI();
        }else {
          console.log('Mode offline active');
        }
      });
  }

  generateNumeroVente(): Observable<any> {
    return this.http.get(`${this.baseUrl_1}/ventes/generateNumeroVente`);
  }

  getNumeroVente() {
    this.generateNumeroVente().subscribe(
      response =>{
        this.NumVente = response;
        console.log("Numero Vente:" + this.NumVente);
      }
    );
  }

  getCurrentUser(): Observable<any> {
    return this.tokenService.getUser();
  }

  getUserId() {
    const user = this.tokenService.getUser();
    this.id = user.id
    /* this.authService.getUserById(this.id).subscribe(arg => {
      this.currentUser = arg;
      console.log(this.currentUser);
    });
    ; */
  }

  listOfVenteByUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl_1}.ventes/searchListVenteByEmpId`);
  }


}
