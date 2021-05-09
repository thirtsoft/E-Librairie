import { EnvoiSMSFournisseurComponent } from './envoi-smsfournisseur/envoi-smsfournisseur.component';
import { EnvoiEmailFournisseurComponent } from './envoi-email-fournisseur/envoi-email-fournisseur.component';
import { ViewFournisseurComponent } from './view-fournisseur/view-fournisseur.component';
import { CreateFournisseurComponent } from './create-fournisseur/create-fournisseur.component';
import { ListFournisseurComponent } from './list-fournisseur/list-fournisseur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FournisseurRoutingModule } from './fournisseur-routing.module';

@NgModule({
  declarations: [
    ListFournisseurComponent,
    CreateFournisseurComponent,
    ViewFournisseurComponent,
    EnvoiEmailFournisseurComponent,
    EnvoiSMSFournisseurComponent
  ],
  imports: [
    CommonModule,
    FournisseurRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FournisseurModule { }
