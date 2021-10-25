import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Login } from 'src/app/auth/login';
import { Utilisateur } from 'src/app/models/utilisateur';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  loginInfo: Login;
 // loginInfo: any;

  constructor(private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private location: Location

  ) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
     // this.roles = this.tokenStorage.getAuthorities();
      this.roles = this.tokenStorage.getUser().roles;
      console.log("Login start : " + this.roles);
    }

  }

  onSubmit() {
    console.log(this.form);
    this.loginInfo = new Login(
      this.form.username,
      this.form.password,
    );

    this.authService.attemptAuth(this.loginInfo).subscribe(data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.tokenStorage.saveUsername(data.username);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        console.log("Login Success");
        console.log(this.roles);
        this.router.navigateByUrl("home").then(() => {
          window.location.reload();
        });
      //  this.reloadHomePage();

      //  this.reloadPage();


      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    location.reload();
  }

  reloadHomePage() {
    this.router.navigateByUrl("/home", { skipLocationChange: true }).then(() => {
      this.router.navigate(['login']);
    });
  }

}


