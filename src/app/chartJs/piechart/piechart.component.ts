import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Article } from 'src/app/models/article';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {

/*
  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';
*/
  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public pieChartData;
  public pieChartType

  PieChart: any = [];
  NumberProduitByStock: number[] = [];
  LibelleScategorie: string[] = [];

  list: any={}

  constructor(private statService: DashboardService) { }

  ngOnInit() {
    this.statService.getNumberOfProduitByStock().subscribe((result: Article[]) => {
      this.list = result;
      const n = 1;
      const m = 0;
      console.log(this.list);
      for (let i=0; i<this.list.length; i++) {
        this.NumberProduitByStock.push(this.list[i][n]);
        this.LibelleScategorie.push(this.list[i][m]);
      }
      this
      this.PieChart = new Chart('canvas', {
        type: 'pie',
        data: {
          labels: this.LibelleScategorie,

          datasets: [
            {
              data: this.NumberProduitByStock,
              borderColor: '#3cb371',
              backgroundColor: "#0000FF",
            }
          ]
        },

      });
    });

  }

}
