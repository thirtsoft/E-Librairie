import { PiechartStockComponent } from './piechart-stock/piechart-stock.component';
import { PiechartComponent } from './piechart/piechart.component';
import { LinechartComponent } from './linechart/linechart.component';
import { ChartComponent } from './chart/chart.component';
import { BarchartComponent } from './barchart/barchart.component';
import { BarcharCreanceComponent } from './barchar-creance/barchar-creance.component';
import { BarcharCommandeComponent } from './barchar-commande/barchar-commande.component';
import { BarcharComVenteComponent } from './barchar-com-vente/barchar-com-vente.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: 'chart',
    component: ChartComponent
  },
  {
    path: 'barchart',
    component: BarchartComponent
  },
  {
    path: 'piechart',
    component: PiechartComponent
  },
  {
    path: 'linechart',
    component: LinechartComponent
  },

]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartjsRoutingModule { }
