import { LoginComponent } from './authentication/login/login.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { BACKEND_ROUTES } from './routes/admin-layout-routes';
import { DEFAULT_ROUTES } from './routes/defaut-layout-routes';
import { DefautLayoutComponent } from './layout/defaut-layout/defaut-layout.component';
import { UpdatePasswordComponent } from './authentication/update-password/update-password.component';
import { UpdateUsernameComponent } from './authentication/update-username/update-username.component';
import { UpdateProfileComponent } from './authentication/update-profile/update-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { ProfilComponent } from './authentication/profil/profil.component';


const routes: Routes = [
 /*
  { path: '',
    component: DefautLayoutComponent,
    children: DEFAULT_ROUTES
  },
  */
  { path: '',
    component: LoginComponent
  },
  {
    path: 'alamine',
    component: AdminLayoutComponent,
    children: BACKEND_ROUTES
  },
/*
  { path: '', component: LoginComponent, children: [
    { path:'', redirectTo:'login' , pathMatch:'full'},

  ] },


  { path: 'register', component: RegisterComponent },
  */
/*
  {path: 'home', component: HomeComponent, children : [


    {path:'', redirectTo:'dashboard' , pathMatch:'full'},

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


  /*
    { path: 'categories', component: ListCategorieComponent},
    { path:'categorie',component: CreateCategorieComponent },
*/
 //   { path: 'registers', component: ListRegisterComponent},


  /*  { path: 'scategories', component: ListScategorieComponent},
    { path:'scategorie',component: CreateScategorieComponent }, */
/*

    { path: 'scategories', children: [
        { path: '', component: ListScategorieComponent},
        { path:'edit/:id',component:CreateScategorieComponent },
      ]
    },

    { path: 'articles', children: [
        { path: '', component: ListArticleComponent},
        { path:'edit/:id',component:ListArticleComponent },
        { path:'articleView/:id',component: ViewArticleComponent }
      ]
    },

    { path: 'clients', component: ListClientComponent},
    { path: 'client', component: CreateClientComponent},
    { path: 'sendEmailToCustomer', component: EnvoiEmailClientComponent},
    { path: 'sendSMSToCustomer', component: EnvoiSMSClientComponent},

*/
    /*


    { path: 'commandeclients', component: ListCommandeClientComponent},

    { path:'commandeclient',children:[
        {path:'',component:CreateCommandeClientComponent},
        {path:'edit/:id',component:CreateCommandeClientComponent},
      ]
    },
*/
/*
    { path: 'listcommandes', component: ListCommandeComponent },
    { path:'commande',component: CreateCommandeComponent },
    { path:'commandeView/:id', component: ViewCommandeComponent },
    { path: 'detailsCommande', component: ListLigneCommandeComponent },
    { path: 'detailsCommande', component: CreateLigneCommandeComponent },

    { path: 'listdevis', component: ListDevisComponent },
    { path:'devis',component: CreateDevisComponent },
    { path:'devisView/:id', component: ViewDevisComponent },
    { path: 'detailsDevis', component: ListLigneDevisComponent },
    { path:'detailsDevis',component: CreateLigneDevisComponent },

    { path: 'ventes', component: ListVenteComponent},
    { path: 'vente', component: CreateVenteComponent},
*/
   /* { path:'vente/:username',children:[
        {path:'',component:CreateVenteComponent},
      ]
    },
    */
/*
    {path:'venteView/:id', component: ViewVenteComponent},

    { path: 'detailsVentes', component: ListLigneVenteComponent},
    { path:'detailsVente',children:[
        {path:'',component:CreateLigneVenteComponent},
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


    { path: 'creances', component: ListCreanceComponent},
    { path:'creance',component: CreateCreanceComponent},
    { path:'creance',component: UpdateStatusCreanceComponent},
    { path:'creance',component: UpdateSoldeCreanceComponent},
    {path:'creanceView/:id', component: ViewCreanceComponent},
    { path: 'detailsCreances', component: ListLigneCreanceComponent},
    { path: 'detailsCreance', component: CreateLigneCreanceComponent},

    { path: 'avoirs', component: ListAvoirComponent},
    { path:'avoir',component: CreateAvoirComponent},
    {path:'avoirView/:id', component: ViewAvoirComponent},
    { path: 'detailsAvoirs', component: ListLigneAvoirComponent},
    { path: 'detailsAvoir', component: CreateLigneAvoirComponent},
*/

  /*
    { path: 'charges', component: ListChargeComponent},
    { path:'charge',children:[
        {path:'',component: CreateChargeComponent},
        {path:'edit/:id',component: CreateChargeComponent}
      ]
    }, */
/*
    { path: 'charges', component: ListChargeComponent},
    { path:'charge',component: CreateChargeComponent },
    { path: 'categorieCharges', component: ListCategorieChargeComponent},
    { path:'categorieCharge', component: CreateCategorieChargeComponent },

*/

    /* { path: 'contrats', children: [
        { path: '', component: ListContratComponent},
        { path:'edit/:id',component: ListContratComponent },
        { path:'viewContrat/:id',component: ViewContratComponent },
      ]
    }, */
/*
    { path: 'contrats', component: ListContratComponent },
    { path: 'contrat', component: CreateContratComponent },
    { path: 'contrat', component: UploadContratComponent },
    { path: 'contratView', component: ViewContratComponent },
*/
    /*
    { path: 'fournisseurs', component: ListFournisseurComponent},
    { path: 'fournisseur', component: CreateFournisseurComponent},
    { path: 'fournisseurView', component: ViewFournisseurComponent},
    { path: 'sendEmailToFournisseur', component: EnvoiEmailFournisseurComponent},
    { path: 'sendSMSToFournisseur', component: EnvoiSMSFournisseurComponent},

    { path: 'employes', component: ListEmployeComponent},
    { path: 'employe', component: CreateEmployeComponent},
    { path: 'sendEmailToEmploye', component: EnvoiEmailEmployeComponent},
    { path: 'sendSMSToEmploye', component: EnvoiSMSEmployeComponent},
*/

    /*
    { path: 'versements', children: [
        { path: '', component: ListVersementComponent},
        { path:'edit/:id',component: ListVersementComponent },
        { path:'viewVersement/:id',component: ViewVersementComponent },
      ]
    },*/
/*
    { path: 'versements', component: ListVersementComponent },
    { path: 'versement', component: CreateVersementComponent },
    { path: 'versement', component: UploadFileVersementComponent },
    { path: 'viewVersement', component: ViewVersementComponent },


    { path: 'dashboard', component: DashboardComponent},

    { path: 'tableau', component: ListStatistiqueComponent },

    { path: 'chart', component: ChartComponent },
    { path: 'barchart', component: BarchartComponent},
    { path: 'piechart', component: PiechartComponent},
    { path: 'linechart', component: LinechartComponent},

    */
  //  { path: 'profile/:username', component: ProfilComponent },
  /*
    { path: 'profile/:id', component: ProfilComponent },
    { path: 'profile/:id', component: UpdateProfileComponent },
    { path: 'profile/:id', component: UpdateUsernameComponent },
    { path: 'profile/:id', component: UpdatePasswordComponent },
    */

   /*  { path: '',   redirectTo: 'dashboard', pathMatch: 'full' }, */
    { path: '**', component: PageNotFoundComponent },



   /*  {path:'orders',component: OrdersComponent},
    {path:'order',children:[
      {path:'',component: OrderComponent},
      {path:'edit/:id',component: OrderComponent}
    ]} */


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
