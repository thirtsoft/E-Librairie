import { Router } from '@angular/router';
import { CreanceService } from 'src/app/services/creance.service';
import { ArticleService } from 'src/app/services/article.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Creance } from 'src/app/models/creance';
import { Article } from 'src/app/models/article';
import { Component, OnInit } from '@angular/core';

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
  compteurCreance = 0;
  creanceLimit;
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

  dateEndCreance;

  endDate: Date;
  dateResult: Date;
  dateResult2;
  currentDay: Date;
  numberDay;
  dateJour;
  NbreJourLimit;
  convertNumber = 1000 * 60 * 60 * 24;



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

    this.getListCreancesLimiteDateOut();

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

  getListCreancesLimiteDateOut() {
    this.creanceService.getAllCreances().subscribe(response => {
      this.listDataCreance = response;
      for (let i = 0; i < this.listDataCreance.length; i++) {
        this.endDate = new Date(this.listDataCreance[i].dateCreance);
        this.numberDay = this.listDataCreance[i].nbreJours
        console.log("End Date : " +this.endDate);
        this.dateResult = new Date(this.endDate);
        this.dateResult2 = new Date(this.dateResult.setDate(this.dateResult.getDate() + this.numberDay));
        console.log("Data Result : " +this.dateResult2);
        this.dateJour = new Date();

        this.NbreJourLimit = ((this.dateResult2.getTime())-(this.dateJour.getTime()));

        this.creanceLimit = Math.floor((this.NbreJourLimit)/(this.convertNumber));

        console.log("Date jour : " +this.dateJour);
        console.log("Creance Limit : " +this.creanceLimit);
      //  this.nbcreanceRef = this.listDataCreance[i].nbreJours;
        if (this.creanceLimit <= 7) {
        //  this.creanceInit++;
          this.compteurCreance++;
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

  goToListCreances() {
    this.router.navigate(['/home/creances']);
  }

  goToResume() {
    this.router.navigate(['/home/tableau']);
  }



}
