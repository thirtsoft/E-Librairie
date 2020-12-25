import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ClientService } from 'src/app/services/client.service';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/app/models/client';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Vente } from 'src/app/models/vente';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent implements OnInit {

  private baseUrl = 'http://localhost:8080/alAmine/ListClientGroupByRaisonSocial';

  data: Client[];
  RaisonSocial = [];
  ChefService = [];
  Linechart: any = [];
  Number = [];
  ChiffreAffaire: number[] = [];
  Month: Date[] = [];

  list: any={}

  constructor(private crudApi: ClientService,
    private http: HttpClient,
    private statService: DashboardService) { }

  ngOnInit() {
    /*
    this.crudApi.getAllClients().subscribe((result: Client[]) => {
      result.forEach(x => {
        this.ChefService.push(x.chefService);
        this.Number.push(x.id);
        console.log(this.Number);
      });
      this
      this.Linechart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.ChefService,

          datasets: [
            {
              data: this.Number,
              borderColor: '#3cb371',
              backgroundColor: "#0000FF",
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
    */
    this.statService.getSumTotalOfVenteByMonth().subscribe((result: Vente[]) => {
      this.list = result;
      const n = 1;
      const m = 0;
      console.log(this.list);
      for (let i=0; i<this.list.length; i++) {
      //  console.log(this.list[i][n]);
      //  console.log(this.list[i][0]);
        this.ChiffreAffaire.push(this.list[i][n]);
        this.Month.push(this.list[i][m]);
      //  console.log(this.ChiffreAffaire.push(result[this.list[i]].totalVente));
      }
      this
      this.Linechart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.Month,

          datasets: [
            {
              data: this.ChiffreAffaire,
              borderColor: '#3cb371',
              backgroundColor: "#0000FF",
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }


      /*
      let test = this.ChefService.push(result.forEach(x=> {
        this.ChefService.push(x.chefService);
        this.Number.push( x.raisonSocial);
      }));
      console.log(test);
      */




/*
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

*/
}
