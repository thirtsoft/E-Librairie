import { EnvoiSMSEmployeComponent } from './envoi-smsemploye/envoi-smsemploye.component';
import { EnvoiEmailEmployeComponent } from './envoi-email-employe/envoi-email-employe.component';
import { CreateEmployeComponent } from './create-employe/create-employe.component';
import { ListEmployeComponent } from './list-employe/list-employe.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeRoutingModule } from './employe-routing.module';

@NgModule({
  declarations: [
    ListEmployeComponent,
    CreateEmployeComponent,
    EnvoiEmailEmployeComponent,
    EnvoiSMSEmployeComponent
  ],
  imports: [
    CommonModule,
    EmployeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EmployeModule { }
