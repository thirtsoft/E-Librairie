import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvoirRoutingModule } from './avoir-routing.module';
import { CreateLigneAvoirComponent } from './create-ligne-avoir/create-ligne-avoir.component';
import { ListLigneAvoirComponent } from './list-ligne-avoir/list-ligne-avoir.component';
import { ViewAvoirComponent } from './view-avoir/view-avoir.component';
import { CreateAvoirComponent } from './create-avoir/create-avoir.component';
import { ListAvoirComponent } from './list-avoir/list-avoir.component';

@NgModule({
  declarations: [
    ListAvoirComponent,
    CreateAvoirComponent,
    ViewAvoirComponent,
    ListLigneAvoirComponent,
    CreateLigneAvoirComponent
  ],
  imports: [
    CommonModule,
    AvoirRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AvoirModule { }
