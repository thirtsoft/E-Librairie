import { CreateLigneDevisComponent } from './create-ligne-devis/create-ligne-devis.component';
import { ListLigneDevisComponent } from './list-ligne-devis/list-ligne-devis.component';
import { ViewDevisComponent } from './view-devis/view-devis.component';
import { CreateDevisComponent } from './create-devis/create-devis.component';
import { ListDevisComponent } from './list-devis/list-devis.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: '',
    component: ListDevisComponent
  },
  {
    path: 'devis',
    component: CreateDevisComponent
  },
  {
    path: 'devisView/:id',
    component: ViewDevisComponent
  },
  {
    path: 'detailsDevis',
    component: ListLigneDevisComponent
  },
  {
    path:'detailsDevis',
    component: CreateLigneDevisComponent
  },

]

@NgModule({
//  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevisRoutingModule { }
