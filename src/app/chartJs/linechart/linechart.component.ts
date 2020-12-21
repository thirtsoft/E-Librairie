import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ClientService } from 'src/app/services/client.service';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/app/models/client';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent implements OnInit {

  private baseUrl = 'http://localhost:8080/alAmine/ListClientGroupByRaisonSocial';

  data: Client[];
  Customer = [];
  RaisonSocial = [];
  ChefService = [];
  Linechart: any = [];

  constructor(private crudApi: ClientService,
    private http: HttpClient,
    private dashboardService: DashboardService) { }

  ngOnInit() {
    this.http.get(this.baseUrl).subscribe((result: Client[]) => {
      this.data = result.filter(r => {
        return r.raisonSocial;
      });
      this.data.forEach(y => {
        this.RaisonSocial.push(y.raisonSocial);
        this.ChefService.push(y.chefService);
      })
    });

  }

  public lineChartData: Array<any> = [
    {data: this.RaisonSocial, label: 'Raison Social'},
  ];
  public lineChartLabels: Array<any> = this.ChefService;
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'red',
      pointBorderColor: 'red',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: Boolean = true;
  public lineChartType: String = 'line';


}
