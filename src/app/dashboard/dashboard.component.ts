import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Vente } from 'src/app/models/vente';
import { Chart } from 'chart.js';
import { Client } from '../models/client';

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

  // barchart Vente/mois variable
  Barchart: any = [];
  NumberVenteByMonth: number[] = [];
  VenteOfMonth: Date[] = [];
  list: any={};

  // Total sum Vente/mois variables
  data: Client[];
  RaisonSocial = [];
  ChefService = [];
  Linechart: any = [];
  Number = [];
  ChiffreAffaire: number[] = [];
  Month: Date[] = [];
  list1: any={};

  canvas  : any;
  ctx     : any;
  canvas1 : any;
  ctx1    : any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getSumOfCommandes();
    this.getNumberOfCommandes();
    this.getNumberOfClients();
    this.getSumOfVentes();
    this.getNumberOfVentesByDay();

    // Statistique
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.dashboardService.getNumberTotalOfVenteByMonth().subscribe((result: Vente[]) => {
      this.list = result;
      const n = 1;
      const m = 0;
      console.log(this.list);
      for (let i=0; i<this.list.length; i++) {
        this.NumberVenteByMonth.push(this.list[i][n]);
        this.VenteOfMonth.push(this.list[i][m]);
      }
      this
      let myChart = new Chart(this.ctx, {
        type: 'bar',
        data: {
          labels: this.VenteOfMonth,

          datasets: [
            {
              data: this.NumberVenteByMonth,
              borderColor: '#3cb371',
              backgroundColor: "#0000FF",
              fill: true
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
              display: true,
              ticks: {
                beginAtZero:true
              }
            }],
          }
        }
      });
    });

    this.canvas1 = document.getElementById('myChart1');
    this.ctx1 = this.canvas.getContext('2d');
    this.dashboardService.getSumTotalOfVenteByMonth().subscribe((result: Vente[]) => {
      this.list1 = result;
      const n = 1;
      const m = 0;
      console.log(this.list1);
      for (let i=0; i<this.list1.length; i++) {
      //  console.log(this.list[i][n]);
      //  console.log(this.list[i][0]);
        this.ChiffreAffaire.push(this.list1[i][n]);
        this.Month.push(this.list1[i][m]);
      //  console.log(this.ChiffreAffaire.push(result[this.list[i]].totalVente));
      }
    //  this
      this.Linechart = new Chart(this.ctx1, {
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
              display: false
            }],
            yAxes: [{
              display: false
            }],
          }
        }
      });
    });

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

 /*  getVenteParMois() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.dashboardService.getNumberTotalOfVenteByMonth().subscribe((result: Vente[]) => {
      this.list = result;
      const n = 1;
      const m = 0;
      console.log(this.list);
      for (let i=0; i<this.list.length; i++) {
        this.NumberVenteByMonth.push(this.list[i][n]);
        this.VenteOfMonth.push(this.list[i][m]);
      }
      this
      this.Barchart = new Chart(this.ctx, {
        type: 'bar',
        data: {
          labels: this.VenteOfMonth,

          datasets: [
            {
              data: this.NumberVenteByMonth,
              borderColor: '#3cb371',
              backgroundColor: "#0000FF",
              fill: true
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

  getSumTotalVenteParMois() {
    this.canvas1 = document.getElementById('myChart1');
    this.ctx1 = this.canvas.getContext('2d');
    this.dashboardService.getSumTotalOfVenteByMonth().subscribe((result: Vente[]) => {
      this.list1 = result;
      const n = 1;
      const m = 0;
      console.log(this.list1);
      for (let i=0; i<this.list1.length; i++) {
      //  console.log(this.list[i][n]);
      //  console.log(this.list[i][0]);
        this.ChiffreAffaire.push(this.list1[i][n]);
        this.Month.push(this.list1[i][m]);
      //  console.log(this.ChiffreAffaire.push(result[this.list[i]].totalVente));
      }
    //  this
      this.Linechart = new Chart(this.ctx1, {
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
              display: false
            }],
            yAxes: [{
              display: false
            }],
          }
        }
      });
    });
  }
 */


}
