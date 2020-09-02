import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListClientComponent } from './client/list-client/list-client.component';
import { CreateClientComponent } from './client/create-client/create-client.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';
import { ListEmployeComponent } from './employe/list-employe/list-employe.component';
import { CreateEmployeComponent } from './employe/create-employe/create-employe.component';
import { EditEmployeComponent } from './employe/edit-employe/edit-employe.component';
import { ListFournisseurComponent } from './fournisseur/list-fournisseur/list-fournisseur.component';
import { CreateFournisseurComponent } from './fournisseur/create-fournisseur/create-fournisseur.component';
import { EditFournisseurComponent } from './fournisseur/edit-fournisseur/edit-fournisseur.component';
import { ListCategorieComponent } from './categorie/list-categorie/list-categorie.component';
import { CreateCategorieComponent } from './categorie/create-categorie/create-categorie.component';
import { EditCategorieComponent } from './categorie/edit-categorie/edit-categorie.component';
import { ListScategorieComponent } from './scategorie/list-scategorie/list-scategorie.component';
import { CreateScategorieComponent } from './scategorie/create-scategorie/create-scategorie.component';
import { EditScategorieComponent } from './scategorie/edit-scategorie/edit-scategorie.component';
import { ListArticleComponent } from './article/list-article/list-article.component';
import { CreateArticleComponent } from './article/create-article/create-article.component';
import { EditArticleComponent } from './article/edit-article/edit-article.component';
import { ListContratComponent } from './contrat/list-contrat/list-contrat.component';
import { CreateContratComponent } from './contrat/create-contrat/create-contrat.component';
import { EditContratComponent } from './contrat/edit-contrat/edit-contrat.component';
import { CreateVersementComponent } from './versement/create-versement/create-versement.component';
import { ListVersementComponent } from './versement/list-versement/list-versement.component';
import { EditVersementComponent } from './versement/edit-versement/edit-versement.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListCmdClientComponent } from './commandeClient/list-cmd-client/list-cmd-client.component';
import { CreateCmdClientComponent } from './commandeClient/create-cmd-client/create-cmd-client.component';
import { ListAvoirComponent } from './avoir/list-avoir/list-avoir.component';
import { CreateAvoirComponent } from './avoir/create-avoir/create-avoir.component';
import { ListCreanceComponent } from './creance/list-creance/list-creance.component';
import { CreateCreanceComponent } from './creance/create-creance/create-creance.component';

const routes: Routes = [

  {path: '', component: HomeComponent, children : [

    { path: 'articles', component: ListArticleComponent},
    { path: 'article', component: CreateArticleComponent},
    { path:'articles/:id',component:EditArticleComponent },

    { path: 'scategories', component: ListScategorieComponent},
    { path: 'scategorie', component: CreateScategorieComponent},
    { path:'scategories/:id',component:EditScategorieComponent },

    { path: 'categories', component: ListCategorieComponent},
    { path: 'categorie', component: CreateCategorieComponent},
    { path:'categories/:id',component:EditCategorieComponent },

    { path: 'clients', component: ListClientComponent},
    { path: 'client', component: CreateClientComponent},
    { path:'clients/:id',component:EditClientComponent },

    { path: 'commandeclients', component: ListCmdClientComponent},
    { path: 'commandeclient', component: CreateCmdClientComponent},
    { path:'commandeclient/:id',component:EditClientComponent },

    { path: 'avoirs', component: ListAvoirComponent},
    { path: 'avoirs', component: CreateAvoirComponent},
    { path:'clients/:id',component:EditClientComponent },

    { path: 'creances', component: ListCreanceComponent},
    { path: 'creance', component: CreateCreanceComponent},
    { path:'clients/:id',component:EditClientComponent },

    { path: 'contrats', component: ListContratComponent},
    { path: 'contrat', component: CreateContratComponent},
    { path:'contrats/:id',component:EditContratComponent },

    { path: 'fournisseurs', component: ListFournisseurComponent},
    { path: 'fournisseur', component: CreateFournisseurComponent},
    { path:'fournisseurs/:id',component:EditFournisseurComponent },

    { path: 'employes', component: ListEmployeComponent},
    { path: 'employe', component: CreateEmployeComponent},
    { path:'employes/:id',component:EditEmployeComponent },

    { path: 'versements', component: ListVersementComponent},
    { path: 'versement', component: CreateVersementComponent},
    { path:'versements/:id',component: EditVersementComponent },

    { path: 'dashboard', component: DashboardComponent},

   /*  { path: '',   redirectTo: 'dashboard', pathMatch: 'full' }, */
    { path: '**', component: PageNotFoundComponent },

  ]}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
