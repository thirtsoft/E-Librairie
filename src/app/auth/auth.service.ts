import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Login } from 'src/app/auth/login';
import { Register } from 'src/app/auth/register';
import { JwtResponse } from './jwt-response';
import { catchError, map } from 'rxjs/operators';
import { ProfileInfo, UpdateUsernameInfo, UpdatePasswordInfo, UpdateProfilInfo } from './profile-info';
import { TokenStorageService } from './token-storage.service';
import { IUser } from '../models/utilisateur';

const AUTH_API = 'http://localhost:8081/api/auth/';

//const AUTH_API  = 'http://localhost:8080/Library-0.0.1-SNAPSHOT/api/auth/';

const TOKEN_KEY = 'AuthToken';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8081/api/auth/signin';
  private signupUrl = 'http://localhost:8081/api/auth/signup';


 /*  private loginUrl = 'http://localhost:8080/Library-0.0.1-SNAPSHOT/api/auth/signin';
  private signupUrl = 'http://localhost:8080/Library-0.0.1-SNAPSHOT/api/auth/signup';
 */
  private baseUrl = 'http://localhost:8081/api/auth';

  private baseUrl_1 = 'http://localhost:8081/alAmine';

/*   private baseUrl = 'http://localhost:8080/Library-0.0.1-SNAPSHOT/api/auth';

  private baseUrl_1 = 'http://localhost:8080/Library-0.0.1-SNAPSHOT/alAmine'; */

  choixmenu : string  = 'A';
  dataForm:  FormGroup;
  listData: ProfileInfo;
  listDataUsername: UpdateUsernameInfo;

  islogin = false ;

  profileInfo: ProfileInfo = {} as ProfileInfo;
  userId;
  user;
  currentUser = {};

  constructor(private http: HttpClient,
    private tokenService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  signUp(info: Register): Observable<Register> {
    return this.http.post<Register>(AUTH_API + 'signup', info , httpOptions);
  }


  attemptAuth(credentials: Login): Observable<any> {
    return this.http.post(this.loginUrl, {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
    this.islogin = true;
  }



/*
  attemptAuth(user: Utilisateur) {
    return this.http.post<any>(this.loginUrl, user)
      .subscribe((res: any) => {
        window.sessionStorage.setItem(TOKEN_KEY, res.token);
        this.getUserProfile(res.id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['home/profile/' + res.msg.id]);
        })
      })
  }
*/



  getUserProfile(id): Observable<any> {
    return this.http.get(`${this.baseUrl_1}/utilisateurs/${id}`, httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/getUserByUsername/${username}`);
  }
  getUserById(id: any) {
    return this.http.get(`${this.baseUrl_1}/utilisateurs/${id}`);
  }

  updateProfil(item: UpdateProfilInfo): Observable<UpdateProfilInfo> {
    return this.http.patch<UpdateProfilInfo>("//localhost:8081/alAmine/updateProfil", {
      name: item.name,
      username: item.username,
      email: item.email,
      password: item.password,
      confirmPassword: item.confirmPassword
    }, httpOptions);

  }

  updateUsername(item: UpdateUsernameInfo): Observable<UpdateUsernameInfo> {
    return this.http.patch<UpdateUsernameInfo>("//localhost:8081/alAmine/updateUsername", {
      username: item.username,
      newUsername: item.newUsername
    }, httpOptions);

  }

  updatePassword(item: UpdatePasswordInfo): Observable<UpdatePasswordInfo> {
    return this.http.patch<UpdatePasswordInfo>("//localhost:8081/alAmine/updatePassword", {
      username: item.username,
      oldPassword: item.oldPassword,
      newPassword: item.newPassword
    }, httpOptions);
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }



}
