import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Role } from '../models/role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseUrl = environment.apiBaseUrl

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
  getListOfRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/roles`);
  }
  getRoleById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/roles/${id}`);
  }


}
