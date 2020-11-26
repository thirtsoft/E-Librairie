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

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getSumOfCommandes();
    this.getNumberOfCommandes();
    this.getNumberOfClients();
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

  getNumberOfClients(): void {
    this.dashboardService.getNumbersOfClients().subscribe(data => {
      this.numberClients = data;
    });
  }



}
