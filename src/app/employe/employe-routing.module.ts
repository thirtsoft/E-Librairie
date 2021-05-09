import { EnvoiSMSEmployeComponent } from './envoi-smsemploye/envoi-smsemploye.component';
import { EnvoiEmailEmployeComponent } from './envoi-email-employe/envoi-email-employe.component';
import { CreateEmployeComponent } from './create-employe/create-employe.component';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeComponent } from './list-employe/list-employe.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: '',
    component: ListEmployeComponent
  },
  {
    path: 'employe',
    component: CreateEmployeComponent
  },
  {
    path: 'sendEmailToEmploye',
    component: EnvoiEmailEmployeComponent
  },
  {
    path: 'sendSMSToEmploye',
    component: EnvoiSMSEmployeComponent
  },

]

@NgModule({
//  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeRoutingModule { }
