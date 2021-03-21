import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-piechart-stock',
  templateUrl: './piechart-stock.component.html',
  styleUrls: ['./piechart-stock.component.scss']
})
export class PiechartStockComponent implements OnInit {

  numberOfProductByStock;
  numberOfProductWhenStockEqualStockInit;
  numberOfProductWhenStockInfStockInit;

  list: any={};

  PieChart: any = [];

  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';

  constructor(private statService: DashboardService) {

   }

  ngOnInit() {
    this.statService.getNumberOfProductByStock().subscribe(response => {
      console.log("Stock: " +response);
      this.numberOfProductByStock = response;
    });

    this.statService.getNumberOfProductWhenStockEqualStockInit().subscribe(response => {
      console.log("Stock Equal: " +response);
      this.numberOfProductWhenStockEqualStockInit = response;
    });

    this.statService.getNumberOfProductWhenStockInfStockInit().subscribe(response => {
      console.log("Stock Inf: " +response);
      this.numberOfProductWhenStockInfStockInit = response;
    });

    this.PieChart = new Chart('pieChartStock', {
      type: 'pie',
      data: {
        labels: this.pieChartLabels,

        datasets: [
          {
            data: [this.numberOfProductByStock, this.numberOfProductWhenStockEqualStockInit, 1],
/*
            data: [this.numberOfProductByStock, this.numberOfProductWhenStockEqualStockInit,
                this.numberOfProductWhenStockInfStockInit],
*/

            borderColor: '#3cb371',
            backgroundColor: "#0000FF",
          }
        ]
      },

    });

/*
    this.Piechart = new Chart('pieChartStock', {
      type: 'pie',
      data: {
          labels: ["New", "In Progress", "On Hold"],
          datasets: [{
              label: '# of Votes',
              data: [this.numberOfProductByStock, this.numberOfProductWhenStockEqualStockInit,
                  this.numberOfProductWhenStockInfStockInit],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
      //  display:true,
      }
    });
*/
  }

  getNumberOfProductsByStock(): void {
    this.statService.getNumberOfProductByStock().subscribe(response => {
      console.log("Stock: " +response);
      this.numberOfProductByStock = response;
    });
  }

  getNumberOfProductsWhenStockEqualStockInit(): void {
    this.statService.getNumberOfProductWhenStockEqualStockInit().subscribe(response => {
      console.log("Stock Equal: " +response);
      this.numberOfProductWhenStockEqualStockInit = response;
    });
  }

  getNumberOfProductsWhenStockInfStockInit(): void {
    this.statService.getNumberOfProductWhenStockInfStockInit().subscribe(response => {
      console.log("Stock Inf: " +response);
      this.numberOfProductWhenStockInfStockInit = response;
    });
  }

/*
  getVenteByMonth() {
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


*/


}
