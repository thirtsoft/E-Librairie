import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public baseUrl = 'http://localhost:8081/alAmine';

  choixmenu : string  = 'A';
  listData : Role[];

  private listners = new Subject<any>();
  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  constructor(private http: HttpClient) { }
  getListOfRoles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/roles`);
  }
  getRoleById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/roles/${id}`);
  }


}
