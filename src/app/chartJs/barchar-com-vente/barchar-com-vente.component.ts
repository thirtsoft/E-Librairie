import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Vente } from 'src/app/models/vente';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-barchar-com-vente',
  templateUrl: './barchar-com-vente.component.html',
  styleUrls: ['./barchar-com-vente.component.scss']
})
export class BarcharComVenteComponent implements OnInit {

  /*
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
*/
Barchart: any = [];
NumberVenteByMonth: number[] = [];
VenteOfMonth: Date[] = [];

list: any={}

constructor(private statService: DashboardService) { }

ngOnInit() {
  this.statService.getNumberTotalOfVenteByMonth().subscribe((result: Vente[]) => {
    this.list = result;
    const n = 1;
    const m = 0;
    console.log(this.list);
    for (let i=0; i<this.list.length; i++) {
      this.NumberVenteByMonth.push(this.list[i][n]);
      this.VenteOfMonth.push(this.list[i][m]);
    }
    this
    this.Barchart = new Chart('canvas', {
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


}
