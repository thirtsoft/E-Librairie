import { Injectable } from '@angular/core';
import { CommandeClient } from '../models/commande-client';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LigneCmdClient } from '../models/ligne-cmd-client';

@Injectable({
  providedIn: 'root'
})
export class CommandeClientService {

  private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = '/api/categories';
  choixmenu : string  = 'A';
  listData : CommandeClient[];

  commande: CommandeClient;

  listLigneCmd: LigneCmdClient[];

  //public dataForm:  FormGroup;

  list: LigneCmdClient[] = [];

  public formData:  CommandeClient;
  orderItems: LigneCmdClient[];

  constructor(private http: HttpClient) { }

  getAllCommandeClients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/commandes`);
  }

  public getCommandeClientById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/commandes/${id}`);
  }

  /* createCommandeClient(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/commandesClientes`, info);
  } */

  createCommandeClient() {
    var body = {
      ...this.formData,
      ligneCmdClients: this.orderItems
    };
    return this.http.post(`${this.baseUrl}/commandesClientes`, body);
  }

  /**
   * Methode pour afficher la liste des categories par pages
   */
  public getAllCommandeClientParPage(page: number, size: number) {
    return this.http.get(this.baseUrl+"/commandes/chercherCategoriesParPages?page="+page+"&size="+size);
  }
  /**
   * Methode pour chercher des categories par nom
   */
  public getCommandeClientByKeyWord(mc: string, page: number, size: number) {
    return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

  }

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/commandes`, info);
  }

  updateCommandeClient(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/commandes/${id}`, value);
  }

  deleteCommandeClient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/commandes/${id}`, { responseType: 'text' });
  }

}
