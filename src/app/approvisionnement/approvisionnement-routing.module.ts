import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateLigneApproComponent } from './create-ligne-appro/create-ligne-appro.component';
import { ListLigneApproComponent } from './list-ligne-appro/list-ligne-appro.component';
import { ViewApprovisionnementComponent } from './view-approvisionnement/view-approvisionnement.component';
import { CreateApproComponent } from 'src/app/approvisionnement/create-appro/create-appro.component';
import { ListApproComponent } from './list-appro/list-appro.component';


const routes: Routes = [
  {
    path: '',
    component: ListApproComponent
  },
  {
    path:'approvisionnement',
    children:[
      {
        path:'',
        component: CreateApproComponent
      },
      {
        path:'edit/:id',
        component: CreateApproComponent
      }
    ]
  },
  {
    path:'approView/:id',
    component: ViewApprovisionnementComponent
  },
  {
    path: 'detailsApprovisionnements',
    component: ListLigneApproComponent
  },
  {
    path:'detailsApprovisionnement',
    children:[
      {
        path:'',
        component: CreateLigneApproComponent
      },
      {
        path:'edit/:id',
        component: CreateLigneApproComponent
      }
    ]
  },

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovisionnementRoutingModule { }
