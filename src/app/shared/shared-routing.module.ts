import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = []

@NgModule({
  /*
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
  ],
  */
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class SharedRoutingModule { }
