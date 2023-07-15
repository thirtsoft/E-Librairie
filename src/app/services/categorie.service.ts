import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import Dexie from 'dexie';
import relationships from 'dexie-relationships';
import { OnlineofflineService } from './onlineoffline.service';


import { Categorie } from '../models/categorie';
import { Produit } from '../models/produit';
import { Scategorie } from '../models/scategorie';
import { CommandeClient } from '../models/commande-client';
import { LigneCmdClient } from '../models/ligne-cmd-client';
import { Vente } from '../models/vente';
import { LigneVente } from '../models/ligne-vente';
import { Client } from '../models/client';
import { Creance } from '../models/creance';
import { LigneCreance } from '../models/ligne-creance';
import { Appro } from '../models/appro';
import { LigneAppro } from '../models/ligne-appro';
import { Fournisseur } from '../models/fournisseur';

import { environment } from './../../environments/environment';


import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officiedocument.spreadsheetml.sheet;charset-UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

 baseUrl_1 = environment.apiBaseUrl;
 
//  baseUrl_1 = "http://localhost:8080/Library-0.0.1-SNAPSHOT/gestionstock-alamine/v1";

  private db: Dexie;
  private tableCat: Dexie.Table<Categorie, number>;
  private tableProd: Dexie.Table<Produit, number>;
  private tableScat: Dexie.Table<Scategorie, number>;
  private tableCmdClient: Dexie.Table<CommandeClient, number>;
  private tableLcmd: Dexie.Table<LigneCmdClient, number>;
  private tableVent: Dexie.Table<Vente, number>;
  private tableLvent: Dexie.Table<LigneVente, number>;
  private tableClient: Dexie.Table<Client, number>;
  private tableCreance: Dexie.Table<Creance, number>;
  private tableLCreance: Dexie.Table<LigneCreance, number>;
  private tableAppro: Dexie.Table<Appro, number>;
  private tableLAppro: Dexie.Table<LigneAppro, number>;
  private tableFour: Dexie.Table<Fournisseur, number>

  Data;
  listDataCat: any[] = [];
  listDataScat: any[] = [];
  listDataProd: any[] = [];
  listDataClient: any[] = [];
  listDataCommande: any[] = [];
  listDataLigneCommande: any[] = [];
  //vente
  listDataVente: any[] = [];
  listDataLigneVente: any[] = [];


//  private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : Categorie[];

  public formData:  Categorie;

  public dataForm:  FormGroup;

  private listners = new Subject<any>();

  public jwtToken = null;
  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient,
              private offlineService: OnlineofflineService
  ) {
  //   this.ouvrirStatusConnexion();
     this.makeDatabase();
     this.connectToDatabase();
  //   this.addAllDataToIndexeddb();
//    this.addAllDataScatToIndexeddb();

 //   this.addAllDataProdToIndexeddb();
 //   this.addAllDataClientToIndexeddb();

 //   this.addAllDataCommandeToIndexeddb();
//    this.addAllDataLigneCmdToIndexeddb();

 //   this.addAllDataVenteToIndexeddb();
 //   this.addAllDataLigneVenteToIndexeddb();

  }


  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.baseUrl_1}/categories/all`);
  }

  getAllCategoriesOrderDesc(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.baseUrl_1}/categories/allCategoryOrderDesc`);
  }

  getCategorieByID(id:number):any {
    return this.http.get(`${this.baseUrl_1}/categories/findById/`+id).toPromise();
  }

  public getCategorieById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.baseUrl_1}/categories/findById/${id}`);
  }

  saveCategorie(info: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(`${this.baseUrl_1}/categories/create`, info);
  }

  public createCategorieAPI(info: Categorie) {
    this.http.post(`${this.baseUrl_1}/categories/create`, info)
      .subscribe(
        ()=> alert('Categorie ajouté avec succes'),
        (err) => console.log('Erreur lors de ajout')
    );
  }

  updateCategorie(id: number, value: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.baseUrl_1}/categories/update/${id}`, value);
  }

  deleteCategorie(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/categories/delete/${id}`, { responseType: 'text' });
  }

  /**
   * method pour importer les données de Excel à MySQL
   * @param formData
   */

  public uploadCategorieExcelFile(formData: FormData) {

    let headers = new HttpHeaders();

    headers.append('Content-Type','multipart/form-data');
    headers.append('Accept', 'application/json');

    const httpOptions = { headers: headers };

    return this.http.post(`${this.baseUrl_1}/categories/uploadCategorie`, formData, httpOptions);

  }

  /**
   * methode permettant de generer un fichier excel depuis API Spring boot
   */

  generateExcelFile() {
    this.http.get(`${this.baseUrl_1}/categories/download/categories.xlsx`,
      { observe: 'response', responseType: 'blob' }
    ).subscribe(res => {
      const blob = new Blob([res.body], { type: 'application/vnd.ms-excel' });
      FileSaver.saveAs(blob, 'categories.xlsx');
    });

  }

  /**
   * methode permettant de generer un pdf depuis API Spring boot
   */
  exportPdfCategories(): Observable<Blob> {
    return this.http.get(`${this.baseUrl_1}/categories/createCategoriePdf`, {responseType: 'blob'});
  }

  // Methode pour Offline&Online et DexieJS

  // Créer la BD et la table
  makeDatabase(): void {
    this.db = new Dexie('alamine', {addons: [relationships]});
    this.db.version(1).stores({
      categorie: '++id, code, designation',
      produit: '++id, reference, designation, prixAchat, prixVente, prixDetail,tva,qtestock,stockInitial,scatId->scategorie.id',
      scategorie: '++id,code,libelle, catId->categorie.id',
      client:'++id,codeClient,raisonSocial,chefService,adresse,telephone,email,subject,message',
      commandeClient:'++id,numeroCommande,totalCommande,status,dateCommande,clientId->client.id',
      ligneCmdClient:'++id,numero,quantite,qteStock,prix,prixCommande,comId->commandeClient.id,prodId->produit.id',
      vente:'++id,numeroVente,totalVente,status,dateVente',
      ligneVente:'++id,numero,quantite,prixVente,venteId->vente.id,prodId->produit.id',
      creance:'++id,reference,libelle,codeCreance,soldeCreance,avanceCreance,nbreJours,totalCreance,status,dateCreance,clientId->client.id',
      ligneCreance:'++id,numero,quantite,prix,total,creanceId->creande.id,prodId->produit.id',
      approvisionnement:'++id,code,montantAvance,totalAppro,status,observation,dateApprovisionnement,fourId->fournisseur.id',
      ligneApprovisionnement:'++id,numero,quantite,prix,prixAppro,approId->approvisionnement,prodId->produit.id',
      fournisseur:'++id,code,raisonSociale,prenom,nom,nomBank,numeroCompte,adresse,telephone,fax,email,subject,message',

    });

    this.tableCat = this.db.table('categorie');
    this.tableProd = this.db.table('produit');
    this.tableScat = this.db.table('scategorie');
    this.tableClient = this.db.table('client');
    this.tableCmdClient = this.db.table('commandeClient');
    this.tableLcmd = this.db.table('ligneCmdClient');
    this.tableVent = this.db.table('vente');
    this.tableLvent = this.db.table('ligneVente');
    this.tableCreance = this.db.table('creance');
    this.tableLCreance = this.db.table('ligneCreance');
    this.tableAppro = this.db.table('approvisionnement');
    this.tableLAppro = this.db.table('ligneApprovisionnement');
    this.tableFour = this.db.table('fournisseur');

  }

  // ouvrir la base de données
  connectToDatabase(): void {
    this.db.open().catch((error) => {
      alert("Errod during connecting to database : " + error);
    });

  }

  /**
   * Récuper les données depuis les services workers
   * Et les enregistrer dans Dexie database
   *
   */

 /*  async addAllDataToIndexeddb() {
    await this.http.get<Categorie[]>(`${this.baseUrl}/categories`).subscribe(response => {
      this.listDataCat = response;
      this.db.transaction('rw', this.tableCat, async ()=> {
        console.log(this.listDataCat);
        for (let i = 0; i < this.listDataCat.length; i++) {
          this.tableCat.put(this.listDataCat[i]);
        }
      });

    })

  } */

  /* async addAllDataScatToIndexeddb() {
    await this.http.get<Scategorie[]>(`${this.baseUrl_1}/scategories`).subscribe(response => {
      this.listDataScat = response;
      this.db.transaction('rw', this.tableScat, async ()=> {
        console.log(this.listDataScat);
        for (let i = 0; i < this.listDataScat.length; i++) {
          this.tableScat.put(this.listDataScat[i]);
        }
      });
    })
  }

  private async addAllDataProdToIndexeddb() {
    await this.http.get<Produit[]>('http://localhost:8080/Library-0.0.1-SNAPSHOT/prodApi/produits').subscribe(response => {
      this.listDataProd = response;
      this.db.transaction('rw', this.tableProd, async ()=> {
        console.log("Produit :" +this.listDataProd);
        for (let i = 0; i < this.listDataProd.length; i++) {
          this.tableProd.put(this.listDataProd[i]);
        }
      });
    })

  }

  private async addAllDataClientToIndexeddb() {
    await this.http.get<Client[]>('http://localhost:8080/Library-0.0.1-SNAPSHOT/prodApi/clients').subscribe(response => {
      this.listDataClient = response;
      console.log("Debut Client:" +this.listDataClient);
      this.db.transaction('rw', this.tableClient, async ()=> {
        console.log("Client: " +this.listDataClient);
        for (let i = 0; i < this.listDataClient.length; i++) {
          this.tableClient.put(this.listDataClient[i]);
        }
      });
    })
  }

  async addAllDataCommandeToIndexeddb() {
    await this.http.get<CommandeClient[]>(`${this.baseUrl_1}/commandes`).subscribe(response => {
      this.listDataCommande = response;
      this.db.transaction('rw', this.tableCmdClient, async ()=> {
        console.log(this.listDataCommande);
        for (let i = 0; i < this.listDataCommande.length; i++) {
          this.tableCmdClient.put(this.listDataCommande[i]);
        }
      });
    })

  }

  async addAllDataLigneCmdToIndexeddb() {
    await this.http.get<LigneCmdClient[]>(`${this.baseUrl_1}/ligneCommandes`).subscribe(response => {
      this.listDataLigneCommande = response;
      this.db.transaction('rw', this.tableLcmd, async ()=> {
        console.log(this.listDataLigneCommande);
        for (let i = 0; i < this.listDataLigneCommande.length; i++) {
          this.tableLcmd.put(this.listDataLigneCommande[i]);
        }
      });
    })

  }

  private async addAllDataVenteToIndexeddb() {
    await this.http.get<Vente[]>(`${this.baseUrl_2}/ventes`).subscribe(response => {
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
    await this.http.get<Vente[]>(`${this.baseUrl_2}/ligneVentes`).subscribe(response => {
      this.listDataLigneVente = response;
      this.db.transaction('rw', this.tableLvent, async ()=> {
        console.log(this.listDataLigneVente);
        for (let i = 0; i < this.listDataLigneVente.length; i++) {
          this.tableLvent.put(this.listDataLigneVente[i]);
        }
      });
    })

  }
  async addDataToIndexedDB() {
    return fetch("http://localhost:8080/Library-0.0.1-SNAPSHOT/api/**").then(resp => {
      this.Data = resp;
      this.db.transaction('rw', this.tableCat, async () => {
        console.log(this.Data);
        for (let i = 0; i < this.Data.length; i++) {
          this.tableCat.put(this.Data[i]);
        }
      });
    });

  }

  async addDataProdToIndexedDB() {
    return fetch("http://localhost:8080/Library-0.0.1-SNAPSHOT/prodApi/**").then(resp => {
      this.Data = resp;
      this.db.transaction('rw', this.tableProd, async () => {
        console.log(this.Data);
        for (let i = 0; i < this.Data.length; i++) {
          this.tableProd.put(this.Data[i]);
        }
      });
    });

  }

  createCategorie(info: Categorie)  {
    if (this.offlineService.isOnLine) {
      this.createCategorieAPI(info);
      console.log('Categorie ajouter via API');
    }else {
      console.log(info);
      this.createCategorieToIndexedDb(info);
      console.log('Categorie ajouter via IndexedDb');
    }
  }

  private async createCategorieToIndexedDb(categorie: Categorie) {
    try {
      console.log(categorie);
      await this.tableCat.add(categorie);
      const todosCategorie: Categorie[] = await this.tableCat.toArray();
      console.log(categorie);
      console.log('Categorie ajouté non IndexedDb', todosCategorie);
    } catch (error) {
      console.log('erreur ajout categorie no indexedDb', error);
    }
  }

  private async sendDataFromIndexedDbToAPI() {
    const todosCategorie: Categorie[] = await this.tableCat.toArray();
    console.log(todosCategorie);
    for(const categorie of todosCategorie) {
      console.log(categorie);
      this.createCategorieAPI(categorie);
      await this.tableCat.delete(categorie.id);
      console.log('Categorie com id ${categorie.id} foi excluddo com successfull');
    }
  }


  private ouvrirStatusConnexion() {
    this.offlineService.statusConnexion
      .subscribe(online => {
        if(online) {
         this.sendDataVenteFromIndexedDbToAPI();
        }else {
          console.log('Mode offline active');
        }
      });
  }

  createVenteAPI(vente: Vente) {
    return this.http.post(`${this.baseUrl_2}/ventes`, vente);
  }

  creerVente(info: Vente)  {
    if (this.offlineService.isOnLine) {
      console.log("Debut Ajout via API");
      this.createVenteAPI(info);
      console.log('Vente ajouter via API');
    }else {
      console.log(info);
      this.createOrderToIndexedDB(info);
      console.log('Vente ajouter via IndexedDb');
    }
  }

  private async createOrderToIndexedDB(order: Vente) {
    const orderitems: LigneVente[] = [];
    await this.tableVent.add(order).then((id)  => {
      this.tableLvent.bulkAdd(orderitems).then(ids => {return true;}).catch(err => {
          console.log(`error while creating the order items ${err}`);
          throw new Error("failed to create the order and order items");
        });
      });
  }

  private async sendDataVenteFromIndexedDbToAPI() {
    const todosVente: Vente[] = await this.tableVent.toArray();
    console.log(todosVente);
    for(const vente of todosVente) {
      console.log(vente);
      this.createVenteAPI(vente);
      await this.tableVent.delete(vente.id);
      console.log('Vente com id ${categorie.id} foi excluddo com successfull');
    }
  } */

}
