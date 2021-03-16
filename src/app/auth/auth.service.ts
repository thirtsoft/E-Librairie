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

  private baseUrl = 'http://localhost:8081/api/auth';

  islogin = false ;

  constructor(private http: HttpClient) {

  }

  attemptAuth(credentials: Login): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);

    this.islogin = true;
  }

  signUp(info: Register): Observable<Register> {
    return this.http.post<Register>(this.signupUrl, info, httpOptions);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/getUserByUsername/${username}`);
  }

}
