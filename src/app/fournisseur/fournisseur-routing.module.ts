import { CreateFournisseurComponent } from './create-fournisseur/create-fournisseur.component';
import { ViewFournisseurComponent } from './view-fournisseur/view-fournisseur.component';
import { EnvoiEmailFournisseurComponent } from './envoi-email-fournisseur/envoi-email-fournisseur.component';
import { EnvoiSMSFournisseurComponent } from './envoi-smsfournisseur/envoi-smsfournisseur.component';
import { ListFournisseurComponent } from './list-fournisseur/list-fournisseur.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: '',
    component: ListFournisseurComponent
  },
  {
    path: 'fournisseur',
    component: CreateFournisseurComponent
  },
  {
    path: 'fournisseurView',
    component: ViewFournisseurComponent
  },
  {
    path: 'sendEmailToFournisseur',
    component: EnvoiEmailFournisseurComponent
  },
  {
    path: 'sendSMSToFournisseur',
    component: EnvoiSMSFournisseurComponent
  },


]

@NgModule({
//  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FournisseurRoutingModule { }
