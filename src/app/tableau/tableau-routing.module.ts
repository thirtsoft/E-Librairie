import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListStatistiqueComponent } from './list-statistique/list-statistique.component';


const routes: Routes = [
  {
    path: 'tableau',
    component: ListStatistiqueComponent
  },

]
@NgModule({
//  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableauRoutingModule { }
