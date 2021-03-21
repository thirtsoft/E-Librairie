import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  sumVenteByMonth;
  sumVenteByYear;
  sumCommandeByMonth;
  sumCommandeByYear;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getSumOfVentesByMonth();
    this.getSumVentesByYear();
    this.getSumCommandesByMonth();
    this.getSumCommandesByYear();
  }

  getSumOfVentesByMonth(): void {
    this.dashboardService.getSumsOfVentesByMonth().subscribe(data => {
      this.sumVenteByMonth = data;
      console.log("Vente Par mois " +this.sumVenteByMonth);
    });
  }

  getSumVentesByYear() {
    this.dashboardService.getSumsOfVentesByYear().subscribe(response => {
      this.sumVenteByYear = response;
    });
  }

  getSumCommandesByMonth() {
    this.dashboardService.getSumsOfCommandesByMonth().subscribe(response => {
      this.sumCommandeByMonth = response;
    });
  }

  getSumCommandesByYear() {
    this.dashboardService.getSumsOfCommandesByYear().subscribe(response => {
      this.sumCommandeByYear = response;
    });
  }

}
