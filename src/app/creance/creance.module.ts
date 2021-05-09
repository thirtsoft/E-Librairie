import { ViewCreanceComponent } from './view-creance/view-creance.component';
import { CreateLigneCreanceComponent } from './create-ligne-creance/create-ligne-creance.component';
import { ListLigneCreanceComponent } from './list-ligne-creance/list-ligne-creance.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreanceRoutingModule } from './creance-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateSoldeCreanceComponent } from './update-solde-creance/update-solde-creance.component';
import { UpdateStatusCreanceComponent } from './update-status-creance/update-status-creance.component';
import { CreateCreanceComponent } from './create-creance/create-creance.component';
import { ListCreanceComponent } from './list-creance/list-creance.component';

@NgModule({
  declarations: [
    ListCreanceComponent,
    CreateCreanceComponent,
    CreateLigneCreanceComponent,
    ViewCreanceComponent,
    UpdateStatusCreanceComponent,
    UpdateSoldeCreanceComponent,
    ListLigneCreanceComponent
  ],
  imports: [
    CommonModule,
    CreanceRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CreanceModule { }
