import { CreateLigneCommandeComponent } from './create-ligne-commande/create-ligne-commande.component';
import { ListLigneCommandeComponent } from './list-ligne-commande/list-ligne-commande.component';
import { ViewCommandeComponent } from './view-commande/view-commande.component';
import { CreateCommandeComponent } from './create-commande/create-commande.component';
import { ListCommandeComponent } from './list-commande/list-commande.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: '',
    component: ListCommandeComponent
  },
  {
    path:'commande',
    component: CreateCommandeComponent
  },
  {
    path:'commandeView/:id',
    component: ViewCommandeComponent
  },
  {
    path: 'detailsCommande',
    component: CreateLigneCommandeComponent
  },
  {
    path: 'detailsCommande',
    component: ListLigneCommandeComponent
  }

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandeRoutingModule { }
