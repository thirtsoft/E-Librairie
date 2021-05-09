import { EnvoiSMSClientComponent } from './envoi-smsclient/envoi-smsclient.component';
import { EnvoiEmailClientComponent } from './envoi-email-client/envoi-email-client.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { ListClientComponent } from './list-client/list-client.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ListClientComponent
  },
  {
    path: 'client',
    component: CreateClientComponent
  },
  {
    path: 'sendEmailToCustomer',
    component: EnvoiEmailClientComponent
  },
  {
    path: 'sendSMSToCustomer',
    component: EnvoiSMSClientComponent
  },

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
