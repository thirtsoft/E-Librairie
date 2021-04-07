import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthenticationService } from '../services/authentication.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  info: any;
  private roles: string[];

  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  showVendeurBoard = false;

  constructor(private authService: AuthenticationService,
    private tokenService: TokenStorageService,
    private router: Router,
    private location: Location) {}

  ngOnInit() {
  //  this.reloadCurrentRoute();


    /*
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      authorities: this.tokenService.getAuthorities(),

    }
    this.roles = this.tokenService.getAuthorities();
    this.showAdminBoard = this.roles.includes("ROLE_ADMIN");
    this.showVendeurBoard = this.roles.includes("ROLE_VENDEUR");
    this.showUserBoard = this.roles.includes("ROLE_USER");
    */
  }

  logout() {
    this.tokenService.signOut();
   // window.location.reload();
    this.router.navigateByUrl("login");
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isUser() {
    return this.authService.isUser();
  }

  isAuthenticated() {
    this.authService.isAuthenticated();
  }

  reloadPage() {
    window.location.reload();
  }

  reloadCurrentRoute() {
    location.reload();
  }

}



