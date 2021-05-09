import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateLigneVenteComponent } from './create-ligne-vente/create-ligne-vente.component';
import { ListLigneVenteComponent } from './list-ligne-vente/list-ligne-vente.component';
import { ViewVenteComponent } from './view-vente/view-vente.component';
import { CreateVenteComponent } from 'src/app/vente/create-vente/create-vente.component';
import { ListVenteComponent } from './list-vente/list-vente.component';


const routes: Routes = [
  {
    path: '',
    component: ListVenteComponent
  },
  {
    path: 'vente',
    component: CreateVenteComponent
  },
  {
    path:'venteView/:id',
    component: ViewVenteComponent
  },
  {
    path: 'detailsVente',
    component: ListLigneVenteComponent
  },
  {
    path:'detailsVente',
    component:CreateLigneVenteComponent
  },

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VenteRoutingModule { }
