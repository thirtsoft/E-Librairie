import { CreateLigneDevisComponent } from './create-ligne-devis/create-ligne-devis.component';
import { ListLigneDevisComponent } from './list-ligne-devis/list-ligne-devis.component';
import { ViewDevisComponent } from './view-devis/view-devis.component';
import { CreateDevisComponent } from './create-devis/create-devis.component';
import { ListDevisComponent } from './list-devis/list-devis.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevisRoutingModule } from './devis-routing.module';

@NgModule({
  declarations: [
    ListDevisComponent,
    CreateDevisComponent,
    ViewDevisComponent,
    CreateLigneDevisComponent,
    ListLigneDevisComponent
  ],
  imports: [
    CommonModule,
    DevisRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DevisModule { }
