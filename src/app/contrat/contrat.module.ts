import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContratRoutingModule } from './contrat-routing.module';
import { ViewContratComponent } from './view-contrat/view-contrat.component';
import { UploadContratComponent } from './upload-contrat/upload-contrat.component';
import { CreateContratComponent } from './create-contrat/create-contrat.component';
import { ListContratComponent } from './list-contrat/list-contrat.component';


@NgModule({
  declarations: [
    ListContratComponent,
    CreateContratComponent,
    UploadContratComponent,
    ViewContratComponent
  ],
  imports: [
    CommonModule,
    ContratRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContratModule { }
