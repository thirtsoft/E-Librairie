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
  roles: string[];

  isLoggedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  showAssocieBoard = false;
  showGerantBoard = false;
  showVendeurBoard = false;


  username: string;
  email : String ;
  user : Utilisateur = new Utilisateur();
  id : number;

  constructor(private authService: AuthenticationService,
              private tokenService: TokenStorageService,
              private router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showManagerBoard = this.roles.includes("ROLE_MANAGER");
      this.showAssocieBoard = this.roles.includes('ROLE_ASSOCIE');
      this.showGerantBoard = this.roles.includes('ROLE_GERANT');
      this.showVendeurBoard = this.roles.includes('ROLE_VENDEUR');

      this.username = user.username;
      this.id = user.id;
    }

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
