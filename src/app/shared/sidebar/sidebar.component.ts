import { Component, OnInit } from '@angular/core';

import { Utilisateur } from 'src/app/models/utilisateur';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  info: any;
  private roles: string[];

  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  showVendeurBoard = false;

  username: string;
  email : String ;
  user : Utilisateur = new Utilisateur();
  id : number;

  constructor(private authService: AuthenticationService,
    private tokenService: TokenStorageService,
    private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showVendeurBoard = this.roles.includes("ROLE_VENDEUR");
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
      this.id = user.id;
    }
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
  //  window.location.reload();
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

}
