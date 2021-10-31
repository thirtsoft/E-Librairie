import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Charge } from 'src/app/models/charge';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-barchar-charge',
  templateUrl: './barchar-charge.component.html',
  styleUrls: ['./barchar-charge.component.scss']
})
export class BarcharChargeComponent implements OnInit {

  Barchart: any = [];
  SumOfChargeByMonth: number[] = [];
  ChargeOfMonth: Date[] = [];

  list: any={}

  constructor(private statService: DashboardService) { }

  ngOnInit() {
    this.statService.getSumMontantTotalOfChargeByMonth()
      .subscribe((result: Charge[]) => {
        this.list = result;
        const n = 1;
        const m = 0;
        console.log(this.list);
        for (let i=0; i<this.list.length; i++) {
          this.SumOfChargeByMonth.push(this.list[i][n]);
          this.ChargeOfMonth.push(this.list[i][m]);
        }
        this
        this.Barchart = new Chart('barChartCharge', {
          type: 'bar',
          data: {
            labels: this.ChargeOfMonth,

            datasets: [
              {
                data: this.SumOfChargeByMonth,
                borderColor: '#3cb371',
                backgroundColor: "#008000",
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
