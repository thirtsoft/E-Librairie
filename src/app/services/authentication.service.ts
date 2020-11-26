import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  host: string = "http://localhost:8080";

  jwtToken = null;
  jwt: string;
  username: string;
  roles: Array<string>;

  constructor(private http: HttpClient) { }

  login(user) {
    return this.http.post(this.host+"/login", user, {observe: 'response'});
  }

  saveToken(jwt: string) {
    localStorage.setItem('token', jwt);
    this.jwt = jwt;
    this.parseJWT();
  }

  parseJWT() {
    let jwtHelper = new JwtHelperService();
    let objJWT = jwtHelper.decodeToken(this.jwt);
    this.username = objJWT.obj;
    this.roles = objJWT.roles;

  }

  logout() {
    localStorage.removeItem('token');
  }

  isAdmin() {
    return this.roles.indexOf('ADMIN')>=0;
  }

  isUser() {
    return this.roles.indexOf('USER')>=0;
  }

  isAuthenticated() {
    return this.roles && (this.isAdmin() || this.isUser());
  }

  register(info: Object): Observable<Object> {
    return this.http.post(`${this.host}/alamine/register`, info);
  }

}
