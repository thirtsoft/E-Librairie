import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorieRoutingModule } from './categorie-routing.module';
import { CreateCategorieComponent } from './create-categorie/create-categorie.component';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';

@NgModule({
  declarations: [
    ListCategorieComponent,
    CreateCategorieComponent
  ],
  imports: [
    CommonModule,
    CategorieRoutingModule
  ]
})
export class CategorieModule { }
