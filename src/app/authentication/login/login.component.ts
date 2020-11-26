import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mode: number = 0;
  constructor(private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  onLogin(user) {
    this.authService.login(user)
      .subscribe(resp => {
        let jwt = resp.headers.get('Authorization');
        //console.log(jwt);
        this.authService.saveToken(jwt);
        this.router.navigateByUrl("/");
      }, err=> {
        this.mode = 1;
      });
  }

  onRegister() {

  }

}
