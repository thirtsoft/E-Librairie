import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableauRoutingModule } from './tableau-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListStatistiqueComponent } from './list-statistique/list-statistique.component';


@NgModule({
  declarations: [
    ListStatistiqueComponent
  ],
  imports: [
    CommonModule,
    TableauRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TableauModule { }
