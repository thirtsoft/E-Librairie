import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/auth/login';
import { Register } from 'src/app/auth/register';
import { JwtResponse } from './jwt-response';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8081/api/auth/signin';
  private signupUrl = 'http://localhost:8081/api/auth/signup';

  constructor(private http: HttpClient) {

  }

  attemptAuth(credentials: Login): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions)
  }

  signUp(info: Register): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
}
