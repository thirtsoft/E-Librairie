import { CreateLigneAvoirComponent } from './create-ligne-avoir/create-ligne-avoir.component';
import { ListLigneAvoirComponent } from './list-ligne-avoir/list-ligne-avoir.component';
import { ViewAvoirComponent } from './view-avoir/view-avoir.component';
import { CreateAvoirComponent } from './create-avoir/create-avoir.component';
import { ListAvoirComponent } from './list-avoir/list-avoir.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ListAvoirComponent
  },
  {
    path:'avoir',
    component: CreateAvoirComponent
  },
  {
    path:'avoirView/:id',
    component: ViewAvoirComponent
  },
  {
    path: 'detailsAvoirs',
    component: ListLigneAvoirComponent
  },
  {
    path: 'detailsAvoir',
    component: CreateLigneAvoirComponent
  },



]
@NgModule({
 // declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvoirRoutingModule { }
