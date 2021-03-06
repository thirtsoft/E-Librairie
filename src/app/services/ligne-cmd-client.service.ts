import { Injectable } from '@angular/core';
import { LigneCmdClient } from '../models/ligne-cmd-client';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Dexie from 'dexie';
import { OnlineofflineService } from './onlineoffline.service';

@Injectable({
  providedIn: 'root'
})
export class LigneCmdClientService {

  private baseUrl_1 = 'http://localhost:8081/prodApi';
  private db: Dexie;
  private tableLcmd: Dexie.Table<LigneCmdClient, number>;

  Data;
  listDataLcmd: any[] = [];


//  private baseUrl_1 = 'http://localhost:8080/alAmine';
 // private baseUrl_1 = window["cfgApibaseUrl_1"];

  choixmenu : string  = 'A';
  listData : LigneCmdClient[];
  public dataForm:  FormGroup;
  public formData:  FormGroup;

  lcommande: LigneCmdClient = new LigneCmdClient();
  lcommandeList: LigneCmdClient[];

  constructor(private http: HttpClient,
    private offlineService: OnlineofflineService) {
     /*  this.ouvrirStatusConnexion();

      this.connectToDatabase();
      this.addAllDataLigneCmdToIndexeddb(); */
  }

  getAllLigneCmdClients(): Observable<any> {
    return this.http.get(`${this.baseUrl_1}/ligneCommandes`);
  }
  getAllByNumero(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl_1}/lcomms/${id}`);
  }

  public getLigneCmdClientId(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl_1}/ligneCommandes/${id}`);
  }

  createLigneCmdClient(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl_1}/ligneCommandes`, info);
  }

  /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllLigneCmdClientByCommande(comId: number) {
    return this.http.get(`${this.baseUrl_1}/searchListLigneCmdClientByCommandeId/${comId}`);
  }
  updateLigneCmdClient(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl_1}/ligneCommandes/${id}`, value);
  }

  deleteLigneCmdClient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/ligneCommandes/${id}`);
  }



  connectToDatabase(): void {
    this.db.open().catch((error) => {
      alert("Errod during connecting to database : " + error);
    });
  }

  async addAllDataLigneCmdToIndexeddb() {
    await this.http.get<LigneCmdClient[]>(`${this.baseUrl_1}/ligneCommandes`).subscribe(response => {
      this.listDataLcmd = response;
      this.db.transaction('rw', this.tableLcmd, async ()=> {
        console.log(this.listDataLcmd);
        for (let i = 0; i < this.listDataLcmd.length; i++) {
          this.tableLcmd.put(this.listDataLcmd[i]);
        }
      });
    })

  }

  private async sendDataFromIndexedDbToAPI() {
    const todosCategorie: LigneCmdClient[] = await this.tableLcmd.toArray();
    console.log(todosCategorie);
    for(const categorie of todosCategorie) {
      console.log(categorie);
    //  this.createCategorieAPI(categorie);
      await this.tableLcmd.delete(categorie.id);
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

}
