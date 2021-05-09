import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChargeRoutingModule } from './charge-routing.module';
import { ListCategorieChargeComponent } from './list-categorie-charge/list-categorie-charge.component';
import { CreateChargeComponent } from './create-charge/create-charge.component';
import { ListChargeComponent } from './list-charge/list-charge.component';
import { CreateCategorieChargeComponent } from './create-categorie-charge/create-categorie-charge.component';

@NgModule({
  declarations: [
    ListCategorieChargeComponent,
    CreateCategorieChargeComponent,
    ListChargeComponent,
    CreateChargeComponent
  ],
  imports: [
    CommonModule,
    ChargeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ChargeModule { }
