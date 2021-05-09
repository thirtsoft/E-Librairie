import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientRoutingModule } from './client-routing.module';
import { EnvoiSMSClientComponent } from './envoi-smsclient/envoi-smsclient.component';
import { EnvoiEmailClientComponent } from './envoi-email-client/envoi-email-client.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { ListClientComponent } from './list-client/list-client.component';


@NgModule({
  declarations: [
    ListClientComponent,
    CreateClientComponent,
    EnvoiEmailClientComponent,
    EnvoiSMSClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientModule { }
