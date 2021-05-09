import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewVersementComponent } from './view-versement/view-versement.component';
import { UploadFileVersementComponent } from './upload-file-versement/upload-file-versement.component';
import { CreateVersementComponent } from './create-versement/create-versement.component';
import { ListVersementComponent } from './list-versement/list-versement.component';


const routes: Routes = [
  {
    path: '',
    component: ListVersementComponent
  },
  {
    path: 'versement',
    component: CreateVersementComponent
  },
  {
    path: 'versement',
    component: UploadFileVersementComponent },
  {
    path: 'viewVersement',
    component: ViewVersementComponent
  },


]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VersementRoutingModule { }
