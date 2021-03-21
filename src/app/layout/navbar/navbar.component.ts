import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  info: any;
  private roles: string[];
  listData : Article[];
  notification = 0;

  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  showVendeurBoard = false;

  constructor(private authService: AuthenticationService,
    private tokenService: TokenStorageService,
    public crudApi: ArticleService,
    private router: Router) { }

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      authorities: this.tokenService.getAuthorities(),

    }
    this.roles = this.tokenService.getAuthorities();
    this.showAdminBoard = this.roles.includes("ROLE_ADMIN");
    this.showVendeurBoard = this.roles.includes("ROLE_VENDEUR");
    this.showUserBoard = this.roles.includes("ROLE_USER");

    this.getAllArticlees();

  }

  logout() {
    this.tokenService.signOut();
  //  window.location.reload();
    this.router.navigateByUrl("login");
  }

  getProfile() {
    let profil = this.tokenService.getUsername();
    this.router.navigate(['/profile/'+profil]);
  }


  getListArticles() {
    this.crudApi.getAllArticles().subscribe(
      response =>{this.listData = response;
    });
  }

  getAllArticlees(){
    this.crudApi.getAllArticles().subscribe(res => {
      this.listData = res;
      for(var i = 0; i< this.listData.length; i++) {
       // console.log(this.listData[i]);
        if ((this.listData[i].qtestock) < (this.listData[i].stockInitial)) {
          this.notification++;
       //   console.log(this.notification);
        }

      }
    });
  }


}
