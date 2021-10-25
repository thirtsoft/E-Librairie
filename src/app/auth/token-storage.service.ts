import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const NAME_KEY = 'AuthName';
const EMAIL_KEY = 'AuthEmail';
const USER_KEY = 'auth-user';
const USER_ID = 'aut-userId';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private roles: Array<string> = [];

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    const token = sessionStorage.getItem(TOKEN_KEY);
    return token;
  }
/*
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
*/
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
/*
  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
*/
  public saveUserId(id) {
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, id);
  }
  public getUserId() {
    return sessionStorage.getItem(USER_ID);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveName(name: string): void {
    window.sessionStorage.removeItem(NAME_KEY);
    window.sessionStorage.setItem(NAME_KEY, name);
  }

  public getName(): string {
    return sessionStorage.getItem(NAME_KEY);
  }

  public saveEmail(email: string): void {
    window.sessionStorage.removeItem(EMAIL_KEY);
    window.sessionStorage.setItem(EMAIL_KEY, email);
  }

  public getEmail(): string {
    return sessionStorage.getItem(EMAIL_KEY);
  }


  public saveAuthorities(autorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(autorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(
        authority => {
          this.roles.push(authority.authority);
        }
      );

    }
    return this.roles;
  }

}
