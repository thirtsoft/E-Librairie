import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { CommandeClient } from 'src/app/models/commande-client';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-barchar-commande',
  templateUrl: './barchar-commande.component.html',
  styleUrls: ['./barchar-commande.component.scss']
})
export class BarcharCommandeComponent implements OnInit {

  Barchart: any = [];
  NumberCommandeByMonth: number[] = [];
  CommandeOfMonth: Date[] = [];

  list: any={};

  constructor(private statService: DashboardService) { }

  ngOnInit() {
    this.statService.getNumberTotalOfCommandeByMonth().subscribe((result: CommandeClient[]) => {
      this.list = result;
      const n = 1;
      const m = 0;
      console.log(this.list);
      for (let i=0; i<this.list.length; i++) {
        this.NumberCommandeByMonth.push(this.list[i][n]);
        this.CommandeOfMonth.push(this.list[i][m]);
      }
      this
      this.Barchart = new Chart('barChartCommande', {
        type: 'bar',
        data: {
          labels: this.CommandeOfMonth,

          datasets: [
            {
              data: this.NumberCommandeByMonth,
              borderColor: '#3cb371',
              backgroundColor: "#008080",
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
              display: true,
              ticks: {
                beginAtZero: true
              }
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: false
              }
            }],
          }
        }
      });
    });

  }

}
