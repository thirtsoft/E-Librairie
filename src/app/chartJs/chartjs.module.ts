import { PiechartStockComponent } from './piechart-stock/piechart-stock.component';
import { PiechartComponent } from './piechart/piechart.component';
import { LinechartComponent } from './linechart/linechart.component';
import { BarchartComponent } from './barchart/barchart.component';
import { BarcharCreanceComponent } from './barchar-creance/barchar-creance.component';
import { BarcharCommandeComponent } from './barchar-commande/barchar-commande.component';
import { BarcharComVenteComponent } from './barchar-com-vente/barchar-com-vente.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartjsRoutingModule } from './chartjs-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartComponent } from './chart/chart.component';


@NgModule({
  declarations: [
    BarcharComVenteComponent,
    BarcharCommandeComponent,
    BarcharCreanceComponent,
    BarchartComponent,
    ChartComponent,
    LinechartComponent,
    PiechartComponent,
    PiechartStockComponent
  ],
  imports: [
    CommonModule,
    ChartjsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ChartjsModule { }
