import { Component, OnInit } from '@angular/core';
import { Creance } from 'src/app/models/creance';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-barchar-creance',
  templateUrl: './barchar-creance.component.html',
  styleUrls: ['./barchar-creance.component.scss']
})
export class BarcharCreanceComponent implements OnInit {

  Barchart: any = [];
  SumCreanceByMonth: number[] = [];
  CreanceOfMonth: Date[] = [];

  listCreance: any={}

  constructor(private statService: DashboardService) { }

  ngOnInit() {
    this.statService.getSumListOfCreancesByMonth().subscribe((result: Creance[]) => {
      this.listCreance = result;
      const n = 1;
      const m = 0;
      console.log(this.listCreance);
      for (let i=0; i<this.listCreance.length; i++) {
        this.SumCreanceByMonth.push(this.listCreance[i][n]);
        this.CreanceOfMonth.push(this.listCreance[i][m]);
      }
      this
      this.Barchart = new Chart('barChartCreance', {
        type: 'bar',
        data: {
          labels: this.CreanceOfMonth,

          datasets: [
            {
              data: this.SumCreanceByMonth,
              borderColor: '#3cb371',
              backgroundColor: "#FF0000",
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
                beginAtZero: true
              }
            }],
          }
        }
      });
    });

  }


}
