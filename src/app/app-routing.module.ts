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
import { ListAvoirComponent } from './avoir/list-avoir/list-avoir.component';
import { CreateAvoirComponent } from './avoir/create-avoir/create-avoir.component';
import { ListCreanceComponent } from './creance/list-creance/list-creance.component';
import { CreateCreanceComponent } from './creance/create-creance/create-creance.component';
import { ListCommandeClientComponent } from './commandeClient/list-commande-client/list-commande-client.component';
import { CreateCommandeClientComponent } from './CommandeClient/create-commande-client/create-commande-client.component';
import { EditCommandeClientComponent } from './CommandeClient/edit-commande-client/edit-commande-client.component';
import { ListLigneCmdClientComponent } from './CommandeClient/list-ligne-cmd-client/list-ligne-cmd-client.component';
import { CreateLigneCmdClientComponent } from './CommandeClient/create-ligne-cmd-client/create-ligne-cmd-client.component';
import { EditLigneCmdClientComponent } from './CommandeClient/edit-ligne-cmd-client/edit-ligne-cmd-client.component';
import { ListVenteComponent } from './vente/list-vente/list-vente.component';
import { CreateVenteComponent } from './vente/create-vente/create-vente.component';
import { ListLigneVenteComponent } from './vente/list-ligne-vente/list-ligne-vente.component';
import { CreateLigneVenteComponent } from './vente/create-ligne-vente/create-ligne-vente.component';
import { ListApproComponent } from './approvisionnement/list-appro/list-appro.component';
import { CreateApproComponent } from './approvisionnement/create-appro/create-appro.component';
import { ListLigneApproComponent } from './approvisionnement/list-ligne-appro/list-ligne-appro.component';
import { CreateLigneApproComponent } from './approvisionnement/create-ligne-appro/create-ligne-appro.component';
import { ListStockComponent } from './stock/list-stock/list-stock.component';
import { ListChargeComponent } from './charge/list-charge/list-charge.component';
import { CreateChargeComponent } from './charge/create-charge/create-charge.component';
import { ViewCommandeComponent } from './commandeClient/view-commande/view-commande.component';
import { ViewVenteComponent } from './vente/view-vente/view-vente.component';
import { ViewApprovisionnementComponent } from './approvisionnement/view-approvisionnement/view-approvisionnement.component';
import { OrdersComponent } from './order/orders/orders.component';
import { OrderComponent } from './order/order/order.component';

const routes: Routes = [

  {path: '', component: HomeComponent, children : [

  /*  { path: 'articles', component: ListArticleComponent},
    { path: 'article', component: CreateArticleComponent},
    { path:'article/:id',component:EditArticleComponent },

    { path: 'scategories', component: ListScategorieComponent},
    { path: 'scategorie', component: CreateScategorieComponent},
    { path:'scategorie/:id',component:EditScategorieComponent }, */
/*
    { path: 'categories', children: [
        { path: '', component: ListCategorieComponent},
        { path:'edit/:id',component:ListCategorieComponent },
      ]
    },
*/
    { path: 'categories', component: ListCategorieComponent},
    { path:'categorie',component: CreateCategorieComponent },

  /*  { path: 'scategories', component: ListScategorieComponent},
    { path:'scategorie',component: CreateScategorieComponent }, */


    { path: 'scategories', children: [
        { path: '', component: ListScategorieComponent},
        { path:'edit/:id',component:ListScategorieComponent },
      ]
    },

    { path: 'articles', children: [
        { path: '', component: ListArticleComponent},
        { path:'edit/:id',component:ListArticleComponent },
      ]
    },

    { path: 'clients', component: ListClientComponent},
    { path: 'client', component: CreateClientComponent},

/*
    { path: 'clients', children: [
        { path: '', component: ListClientComponent},
        { path:'edit/:id',component:ListClientComponent },
      ]
    },

    { path: 'commandeclients', component: ListCommandeClientComponent},

    { path:'commandeclient',children:[
        {path:'',component:CreateCommandeClientComponent},
        {path:'edit/:id',component:CreateCommandeClientComponent},
      ]
    },
*/
    { path: 'commandeclients', component: ListCommandeClientComponent},
    { path:'commandeclient',component: CreateCommandeClientComponent},
    { path:'commandeclient',component:CreateCommandeClientComponent},

    {path:'commandeView/:id', component: ViewCommandeComponent},

    { path: 'detailsCommandeClients', component: ListLigneCmdClientComponent},
    { path: 'detailsCommandeClient', component: CreateLigneCmdClientComponent},
    { path:'detailsCommandeClient/:id',component:EditCommandeClientComponent },

    { path: 'ventes', component: ListVenteComponent},
    { path:'vente',children:[
        {path:'',component:CreateVenteComponent},
        {path:'edit/:id',component:EditLigneCmdClientComponent}
      ]
    },
    {path:'venteView/:id', component: ViewVenteComponent},

    { path: 'detailsVentes', component: ListLigneVenteComponent},
    { path:'detailsVente',children:[
        {path:'',component:CreateLigneVenteComponent},
        {path:'edit/:id',component:EditLigneCmdClientComponent}
      ]
    },

    { path: 'approvisionnements', component: ListApproComponent},
    { path:'approvisionnement',children:[
        {path:'',component: CreateApproComponent},
        {path:'edit/:id',component: CreateApproComponent}
      ]
    },
    {path:'approView/:id', component: ViewApprovisionnementComponent},

    { path: 'detailsApprovisionnements', component: ListLigneApproComponent},
    { path:'detailsApprovisionnement',children:[
        {path:'',component: CreateLigneApproComponent},
        {path:'edit/:id',component: CreateLigneApproComponent}
      ]
    },

    { path: 'stocks', component: ListStockComponent},
    { path:'stock',children:[
        {path:'',component: CreateApproComponent},
        {path:'edit/:id',component: CreateLigneApproComponent}
      ]
    },

    { path:'creances',children:[
        {path:'',component: ListCreanceComponent},
        {path:'edit/:id',component: ListCreanceComponent}
      ]
    },

    { path:'avoirs',children:[
        {path:'',component: ListAvoirComponent},
        {path:'edit/:id',component: ListAvoirComponent}
      ]
    },
  /*
    { path: 'charges', component: ListChargeComponent},
    { path:'charge',children:[
        {path:'',component: CreateChargeComponent},
        {path:'edit/:id',component: CreateChargeComponent}
      ]
    }, */

    { path: 'charges', component: ListChargeComponent},
    { path:'charge',component: CreateChargeComponent },



    { path: 'contrats', children: [
        { path: '', component: ListContratComponent},
        { path:'edit/:id',component: ListContratComponent },
      ]
    },

  /*
    { path: 'fournisseurs', children: [
        { path: '', component: ListFournisseurComponent},
        { path:'edit/:id',component:ListFournisseurComponent },
      ]
    },
    */

    { path: 'fournisseurs', component: ListFournisseurComponent},
    { path: 'fournisseur', component: CreateFournisseurComponent},

    { path: 'employes', component: ListEmployeComponent},
    { path: 'employe', component: CreateEmployeComponent},


    { path: 'versements', children: [
        { path: '', component: ListVersementComponent},
        { path:'edit/:id',component: ListVersementComponent },
      ]
    },

    { path: 'dashboard', component: DashboardComponent},

   /*  { path: '',   redirectTo: 'dashboard', pathMatch: 'full' }, */
    { path: '**', component: PageNotFoundComponent },

    {path:'orders',component: OrdersComponent},
    {path:'order',children:[
      {path:'',component: OrderComponent},
      {path:'edit/:id',component: OrderComponent}
    ]}

  ]}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
