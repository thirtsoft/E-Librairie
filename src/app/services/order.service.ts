import { Injectable } from '@angular/core';
import { Order } from '../models/commande-client';
import { OrderItem } from '../models/ligne-cmd-client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8080/alAmine';

  formData: Order;
  orderItems: OrderItem[];

  constructor(private http: HttpClient) { }

  saveOrUpdateOrder() {
    var body = {
      ...this.formData,
      lcomms: this.orderItems
    };

    return this.http.post(`${this.baseUrl}/commandesClientes`, body);

  }

  getOrderList() {
    return this.http.get(`${this.baseUrl}/commandes`).toPromise();
  }

  getOrderByID(id:number):any {
    return this.http.get(`${this.baseUrl}/commandes/`+id).toPromise();
  }

  deleteOrder(id: number) {
    return this.http.delete(`${this.baseUrl}/commandes/${id}`, { responseType: 'text' }).toPromise();
  }


}
