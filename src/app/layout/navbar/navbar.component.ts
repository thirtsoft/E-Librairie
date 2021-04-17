import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Utilisateur } from 'src/app/models/utilisateur';
import { CreanceService } from 'src/app/services/creance.service';
import { Creance } from 'src/app/models/creance';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  info: any;
  private roles: string[];
  listData: Article[];
  listDataCreance: Creance[];
  notification = 0;
  creanceInit = 0;
  creanceLimit = 10;
  nbcreanceRef = 10;
  currentTime: number = 0;

  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  showVendeurBoard = false;

  username: string;
  email: String;
  userId;
  photo;

  constructor(private tokenService: TokenStorageService,
    public userService: UtilisateurService,
    public crudApi: ArticleService,
    public creanceService: CreanceService,
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
      this.photo = user.photo;

    }

    this.getListArticlesSoldOut();

    this.getListCreancesSoldOut();

  }


  logout() {
    this.tokenService.signOut();
    //  window.location.reload();
    this.router.navigateByUrl("");
  }

  getProfile() {
    this.router.navigate(['/home/profile/' + this.userId]);
  }

  getTS() {
    return this.currentTime;
  }
  getListArticlesSoldOut() {
    this.crudApi.getAllArticles().subscribe(res => {
      this.listData = res;
      for (var i = 0; i < this.listData.length; i++) {
        if ((this.listData[i].qtestock) < (this.listData[i].stockInitial)) {
          this.notification++;
        }

      }
    });
  }

  getListCreancesSoldOut() {
    this.creanceService.getAllCreances().subscribe(response => {
      this.listDataCreance = response;
      for (let i = 0; i < this.listDataCreance.length; i++) {
        this.nbcreanceRef = this.listDataCreance[i].nbreJours;
        if ((this.listDataCreance[i].nbreJours) == this.creanceLimit) {
          this.creanceInit++;
          this.nbcreanceRef--;
        }
      }
    })
  }

  goToListArticles() {
    this.router.navigate(['/home/articles']);
  }

  goToStockArticles() {
    this.router.navigate(['/home/stocks']);
  }


}
