import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  sumCommandes;
  sumVentes;
  numberCommandes;
  numberClients;
  numberVentesByDay;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getSumOfCommandes();
    this.getNumberOfCommandes();
    this.getNumberOfClients();
    this.getSumOfVentes();
    this.getNumberOfVentesByDay();
  }

  getSumOfCommandes(): void {
    this.dashboardService.getSumTotalOfCommandes().subscribe(data => {
      this.sumCommandes = data;
      console.log(this.sumCommandes);
    });
  }

  getSumOfVentes(): void {
    this.dashboardService.getSumTotalOfVentes().subscribe(data => {
      this.sumVentes = data;
      console.log(this.sumVentes);
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

  getNumberOfClients(): void {
    this.dashboardService.getNumbersOfClients().subscribe(data => {
      this.numberClients = data;
    });
  }



}
