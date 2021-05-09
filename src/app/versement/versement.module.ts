import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersementRoutingModule } from './versement-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewVersementComponent } from './view-versement/view-versement.component';
import { UploadFileVersementComponent } from './upload-file-versement/upload-file-versement.component';
import { CreateVersementComponent } from './create-versement/create-versement.component';
import { ListVersementComponent } from './list-versement/list-versement.component';

@NgModule({
  declarations: [
    ListVersementComponent,
    CreateVersementComponent,
    UploadFileVersementComponent,
    ViewVersementComponent
  ],
  imports: [
    CommonModule,
    VersementRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VersementModule { }
