import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Login } from 'src/app/auth/login';
import { Register } from 'src/app/auth/register';
import { JwtResponse } from './jwt-response';
import { ProfileInfo, UpdateUsernameInfo, UpdatePasswordInfo } from './profile-info';


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

  private baseUrl_1 = 'http://localhost:8081/alAmine';

  choixmenu : string  = 'A';
  dataForm:  FormGroup;
  listData: ProfileInfo;
  listDataUsername: UpdateUsernameInfo;

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
  UpdatePasswordInfo
  updateUsername(item: UpdateUsernameInfo): Observable<UpdateUsernameInfo> {
    return this.http.patch<UpdateUsernameInfo>("//localhost:8081/alAmine/updateUsername", {
      username: item.username,
      newUsername: item.newUsername
    }, httpOptions);

  }

  updatePassword(item: UpdatePasswordInfo): Observable<UpdatePasswordInfo> {
    return this.http.patch <UpdatePasswordInfo>("//localhost:8081/alAmine/updateUsername", {
      username: item.username,
      password: item.password,
      newPassword: item.newPassword
    }, httpOptions);
  }


}
