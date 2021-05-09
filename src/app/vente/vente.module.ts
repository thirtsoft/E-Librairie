import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenteRoutingModule } from './vente-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListVenteJounalierComponent } from './list-vente-jounalier/list-vente-jounalier.component';
import { CreateLigneVenteComponent } from './create-ligne-vente/create-ligne-vente.component';
import { ViewVenteComponent } from './view-vente/view-vente.component';
import { ListLigneVenteComponent } from './list-ligne-vente/list-ligne-vente.component';
import { CreateVenteComponent } from 'src/app/vente/create-vente/create-vente.component';
import { ListVenteComponent } from './list-vente/list-vente.component';

@NgModule({
  declarations: [
    ListVenteComponent,
    CreateVenteComponent,
    ViewVenteComponent,
    ListLigneVenteComponent,
    CreateLigneVenteComponent,
    ListVenteJounalierComponent,
  ],
  imports: [
    CommonModule,
    VenteRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VenteModule { }
