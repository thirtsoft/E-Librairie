import { Injectable } from '@angular/core';
import { CmdClient } from '../models/cmd-client';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CmdClientService {

  private baseUrl = 'http://localhost:8080/alAmine';

   choixmenu : string  = 'A';
   listData : CmdClient[];

   public dataForm:  FormGroup;

   public formData:  FormGroup;

   constructor(private http: HttpClient) { }

   getListCmdClients(): Observable<any> {

     return this.http.get(`${this.baseUrl}/commandes`);
   }

   public getCmdClientById(id: number): Observable<Object> {
     return this.http.get(`${this.baseUrl}/commandes/${id}`);
   }


   createCmdClient(info: Object): Observable<Object> {
     return this.http.post<Object>(`${this.baseUrl}/commandes`, info);
   }

   /**
    * Methode pour afficher la liste des categories par pages
    */
   public getAllCmdClientParPage(page: number, size: number) {
     return this.http.get(this.baseUrl+"/commandes/chercherCategoriesParPages?page="+page+"&size="+size);
   }
   /**
    * Methode pour chercher des categories par nom
    */
   public getCmdClientByKeyWord(mc: string, page: number, size: number) {
     return this.http.get(this.baseUrl+"/chercherCategoryParMotCleParPage?mc="+mc+"&page="+page+"&size="+size);

   }

   createData(info: Object): Observable<Object> {
     return this.http.post(`${this.baseUrl}/commandes`, info);
   }

   updateCmdClient(id: number, value: any): Observable<Object> {
     return this.http.put(`${this.baseUrl}/commandes/${id}`, value);
   }

   deleteCmdClient(id: number): Observable<any> {
     return this.http.delete(`${this.baseUrl}/commandes/${id}`, { responseType: 'text' });
   }

}
