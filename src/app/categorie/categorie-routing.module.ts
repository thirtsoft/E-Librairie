import { CreateCategorieComponent } from './create-categorie/create-categorie.component';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';
import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ListCategorieComponent
  },

  {
    path:'categorie',
    component: CreateCategorieComponent
  },

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
   // CommonModule
  ],
  exports: [RouterModule]
})
export class CategorieRoutingModule { }
