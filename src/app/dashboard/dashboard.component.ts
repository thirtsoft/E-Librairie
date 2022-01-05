import { TokenStorageService } from './../auth/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';


declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  sumCommandes;
  sumVentes;
  sumVenteByMonth;
  sumCommandeByMonth;

  numberCommandes;
  numberClients;
  numberOfFournisseurs;
  numberVentesByDay;
  numberOfVenteByMonth;
  numberProductByScategorie;
  numberOfProductByStock;
  numberOfProductWhenStockEqualStockInit;
  numberOfProductWhenStockInfStockInit;

  info: any;
  roles: string[];

  isLoggedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  showAssocieBoard = false;
  showGerantBoard = false;
  showVendeurBoard = false;

  constructor(private dashboardService: DashboardService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {

    this.getNumberOfCommandes();
    this.getNumberOfClients();
    this.getNumberOfFournisseurs();

    this.getSumOfCommandesByMonth();
    this.getSumOfCommandes();
    this.getSumOfVentes();
    this.getSumOfVentesByMonth();

    this.getNumberOfVentesByDay();
    this.getNumberOfVentesByMonth();

  //  this.getNumberOfProductsByScategorie();
    this.getNumberOfProductsByStock();
    this.getNumberOfProductsWhenQStockEqualStockInital();
    this.getNumberOfProductsWhenQStockInfStockInital();

   // this.reloadPage();

   this.isLoggedIn = !!this.tokenService.getToken();
   if (this.isLoggedIn) {
     const user = this.tokenService.getUser();
     this.roles = user.roles;

     this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
     this.showManagerBoard = this.roles.includes("ROLE_MANAGER");
     this.showAssocieBoard = this.roles.includes('ROLE_ASSOCIE');
     this.showGerantBoard = this.roles.includes('ROLE_GERANT');
     this.showVendeurBoard = this.roles.includes('ROLE_VENDEUR');

   }



  }

  getNumberOfClients(): void {
    this.dashboardService.getNumbersOfClients().subscribe(data => {
      this.numberClients = data;
    });
  }

  getNumberOfFournisseurs(): void {
    this.dashboardService.getNumbersOfFournisseurs().subscribe(data => {
      this.numberOfFournisseurs = data;
    });
  }

  getNumberOfProductsByScategorie(): void {
    this.dashboardService.getNumberOfProduitByScategorie().subscribe(response => {
      this.numberProductByScategorie = response;
    });
  }

  getNumberOfProductsByStock(): void {
    this.dashboardService.getNumberOfProductByStock().subscribe(response => {
      this.numberOfProductByStock = response;
    });
  }

  getNumberOfProductsWhenQStockEqualStockInital(): void {
    this.dashboardService.getNumberOfProductWhenStockEqualStockInit()
      .subscribe(response => {
      this.numberOfProductWhenStockEqualStockInit = response;
    });
  }

  getNumberOfProductsWhenQStockInfStockInital(): void {
    this.dashboardService.getNumberOfProductWhenStockInfStockInit()
      .subscribe(response => {
      this.numberOfProductWhenStockInfStockInit = response;
    });
  }

  getSumOfCommandes(): void {
    this.dashboardService.getSumTotalOfCommandes().subscribe(data => {
      this.sumCommandes = data;
      console.log(this.sumCommandes);
    });
  }

  getNumberOfCommandes(): void {
    this.dashboardService.getNumberOfCommandes().subscribe(data => {
     this.numberCommandes = data;
    });
 }

 getNumberOfVentesByDay(): void {
   this.dashboardService.getNumberOfVentesByDay().subscribe(data => {
    this.numberVentesByDay = data;
   });
 }

 getNumberOfVentesByMonth(): void {
   this.dashboardService.getNumberTotalOfVenteByMonth().subscribe(response => {
     this.numberOfVenteByMonth = response;
   });
 }

  getSumOfVentes(): void {
    this.dashboardService.getSumTotalOfVentes().subscribe(data => {
      this.sumVentes = data;
      console.log(this.sumVentes);
    });
  }

  getSumOfVentesByMonth(): void {
    this.dashboardService.getSumsOfVentesByMonth().subscribe(data => {
      this.sumVenteByMonth = data;
      console.log("Vente Par mois " +this.sumVenteByMonth);
    });
  }

  getSumOfCommandesByMonth(): void {
    this.dashboardService.getSumsOfCommandesByMonth().subscribe(data => {
      this.sumCommandeByMonth = data;
      console.log("Commande Par mois " +this.sumCommandeByMonth);
    });
  }

  reloadPage() {
    window.location.reload();
  }

}
