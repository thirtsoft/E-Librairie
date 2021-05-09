import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateScategorieComponent } from './create-scategorie/create-scategorie.component';
import { ListScategorieComponent } from './list-scategorie/list-scategorie.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListScategorieComponent
      },
      {
        path:'edit/:id',
        component:  CreateScategorieComponent
      },
    ]
},

]
@NgModule({
//  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScategorieRoutingModule { }
