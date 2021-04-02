import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Utilisateur } from 'src/app/models/utilisateur';

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
  currentTime: number = 0;

  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  showVendeurBoard = false;

  username: string;
  email : String ;
  userId;
 
  constructor(private authService: AuthenticationService,
    private tokenService: TokenStorageService,
    private userService: UtilisateurService,
    public crudApi: ArticleService,
    private route: ActivatedRoute,
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
      this.userId = user.id;
    
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
    
    this.getAllArticlees();

  }

 
  logout() {
    this.tokenService.signOut();
  //  window.location.reload();
    this.router.navigateByUrl("");
  }

  getProfile() {
    this.router.navigate(['/home/profile/'+this.userId]);
  }

  getTS() {
    return this.currentTime;
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
