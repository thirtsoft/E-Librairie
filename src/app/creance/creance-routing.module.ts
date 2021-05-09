import { ListLigneCreanceComponent } from './list-ligne-creance/list-ligne-creance.component';
import { CreateLigneCreanceComponent } from './create-ligne-creance/create-ligne-creance.component';
import { ViewCreanceComponent } from './view-creance/view-creance.component';
import { UpdateSoldeCreanceComponent } from './update-solde-creance/update-solde-creance.component';
import { UpdateStatusCreanceComponent } from './update-status-creance/update-status-creance.component';
import { CreateCreanceComponent } from './create-creance/create-creance.component';
import { ListCreanceComponent } from './list-creance/list-creance.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: '',
    component: ListCreanceComponent
  },
  {
    path:'creance',
    component: CreateCreanceComponent
  },
  {
    path:'creanceView/:id',
    component: ViewCreanceComponent
  },
  {
    path:'creance',
    component: UpdateStatusCreanceComponent
  },
  {
    path:'creance',
    component: UpdateSoldeCreanceComponent
  },
  {
    path: 'detailsCreance',
    component: CreateLigneCreanceComponent
  },
  {
    path: 'detailsCreances',
    component: ListLigneCreanceComponent
  },


]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreanceRoutingModule { }
