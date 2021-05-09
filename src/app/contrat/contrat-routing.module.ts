import { ViewContratComponent } from './view-contrat/view-contrat.component';
import { UploadContratComponent } from './upload-contrat/upload-contrat.component';
import { CreateContratComponent } from './create-contrat/create-contrat.component';
import { ListContratComponent } from './list-contrat/list-contrat.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ListContratComponent
  },
  {
    path: 'contrat',
    component: CreateContratComponent
  },
  {
    path: 'contrat',
    component: UploadContratComponent
  },
  {
    path: 'contratView',
    component: ViewContratComponent
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratRoutingModule { }
