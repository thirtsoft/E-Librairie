import { ListLigneCommandeComponent } from './list-ligne-commande/list-ligne-commande.component';
import { CreateLigneCommandeComponent } from './create-ligne-commande/create-ligne-commande.component';
import { ViewCommandeComponent } from './view-commande/view-commande.component';
import { CreateCommandeComponent } from './create-commande/create-commande.component';
import { ListCommandeComponent } from './list-commande/list-commande.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommandeRoutingModule } from './commande-routing.module';

@NgModule({
  declarations: [
    ListCommandeComponent,
    CreateCommandeComponent,
    ViewCommandeComponent,
    CreateLigneCommandeComponent,
    ListLigneCommandeComponent
  ],
  imports: [
    CommonModule,
    CommandeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CommandeModule { }
