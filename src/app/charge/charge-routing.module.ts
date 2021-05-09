import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCategorieChargeComponent } from './create-categorie-charge/create-categorie-charge.component';
import { ListCategorieChargeComponent } from './list-categorie-charge/list-categorie-charge.component';
import { CreateChargeComponent } from './create-charge/create-charge.component';
import { ListChargeComponent } from './list-charge/list-charge.component';


const routes: Routes = [
  {
    path: '',
    component: ListChargeComponent
  },
  {
    path:'charge',
    component: CreateChargeComponent
  },
  {
    path: 'categorieCharges',
    component: ListCategorieChargeComponent
  },
  {
    path:'categorieCharge',
    component: CreateCategorieChargeComponent
  },


]
@NgModule({
//  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChargeRoutingModule { }
