import { ViewClientComponent } from './client/view-client/view-client.component';
import { CreatePrestationComponent } from './prestation/create-prestation/create-prestation.component';
import { ListPrestationComponent } from './prestation/list-prestation/list-prestation.component';
import { ViewVente2Component } from './vente/view-vente2/view-vente2.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListClientComponent } from './client/list-client/list-client.component';
import { CreateClientComponent } from './client/create-client/create-client.component';
import { ListEmployeComponent } from './employe/list-employe/list-employe.component';
import { CreateEmployeComponent } from './employe/create-employe/create-employe.component';
import { ListFournisseurComponent } from './fournisseur/list-fournisseur/list-fournisseur.component';
import { CreateFournisseurComponent } from './fournisseur/create-fournisseur/create-fournisseur.component';
import { ListCategorieComponent } from './categorie/list-categorie/list-categorie.component';
import { CreateCategorieComponent } from './categorie/create-categorie/create-categorie.component';
import { ListScategorieComponent } from './scategorie/list-scategorie/list-scategorie.component';
import { CreateScategorieComponent } from './scategorie/create-scategorie/create-scategorie.component';
import { ListArticleComponent } from './article/list-article/list-article.component';
import { CreateArticleComponent } from './article/create-article/create-article.component';
import { ListContratComponent } from './contrat/list-contrat/list-contrat.component';
import { CreateContratComponent } from './contrat/create-contrat/create-contrat.component';
import { CreateVersementComponent } from './versement/create-versement/create-versement.component';
import { ListVersementComponent } from './versement/list-versement/list-versement.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListAvoirComponent } from './avoir/list-avoir/list-avoir.component';
import { CreateAvoirComponent } from './avoir/create-avoir/create-avoir.component';
import { ListCreanceComponent } from './creance/list-creance/list-creance.component';
import { CreateCreanceComponent } from './creance/create-creance/create-creance.component';
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
import { ViewVenteComponent } from './vente/view-vente/view-vente.component';
import { ViewApprovisionnementComponent } from './approvisionnement/view-approvisionnement/view-approvisionnement.component';
import { LoginComponent } from './authentication/login/login.component';
import { ListRegisterComponent } from './authentication/list-register/list-register.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ListCategorieChargeComponent } from './charge/list-categorie-charge/list-categorie-charge.component';
import { CreateCategorieChargeComponent } from './charge/create-categorie-charge/create-categorie-charge.component';
import { ViewCreanceComponent } from './creance/view-creance/view-creance.component';
import { CreateLigneCreanceComponent } from './creance/create-ligne-creance/create-ligne-creance.component';
import { ListLigneCreanceComponent } from './creance/list-ligne-creance/list-ligne-creance.component';
import { ViewAvoirComponent } from './avoir/view-avoir/view-avoir.component';
import { ListLigneAvoirComponent } from './avoir/list-ligne-avoir/list-ligne-avoir.component';
import { CreateLigneAvoirComponent } from './avoir/create-ligne-avoir/create-ligne-avoir.component';
import { ViewFournisseurComponent } from './fournisseur/view-fournisseur/view-fournisseur.component';
import { ViewArticleComponent } from './article/view-article/view-article.component';
import { ViewVersementComponent } from './versement/view-versement/view-versement.component';
import { ViewContratComponent } from './contrat/view-contrat/view-contrat.component';
import { BarchartComponent } from './chartJs/barchart/barchart.component';
import { PiechartComponent } from './chartJs/piechart/piechart.component';
import { LinechartComponent } from './chartJs/linechart/linechart.component';
import { ChartComponent } from './chartJs/chart/chart.component';
import { UpdateStatusCreanceComponent } from './creance/update-status-creance/update-status-creance.component';
import { UpdateSoldeCreanceComponent } from './creance/update-solde-creance/update-solde-creance.component';
import { EnvoiEmailClientComponent } from './client/envoi-email-client/envoi-email-client.component';
import { EnvoiSMSClientComponent } from './client/envoi-smsclient/envoi-smsclient.component';
import { EnvoiEmailFournisseurComponent } from './fournisseur/envoi-email-fournisseur/envoi-email-fournisseur.component';
import { EnvoiSMSFournisseurComponent } from './fournisseur/envoi-smsfournisseur/envoi-smsfournisseur.component';
import { EnvoiEmailEmployeComponent } from './employe/envoi-email-employe/envoi-email-employe.component';
import { EnvoiSMSEmployeComponent } from './employe/envoi-smsemploye/envoi-smsemploye.component';
import { ListDevisComponent } from './devis/list-devis/list-devis.component';
import { CreateDevisComponent } from './devis/create-devis/create-devis.component';
import { ViewDevisComponent } from './devis/view-devis/view-devis.component';
import { ListLigneDevisComponent } from './devis/list-ligne-devis/list-ligne-devis.component';
import { CreateLigneDevisComponent } from './devis/create-ligne-devis/create-ligne-devis.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { ProfilComponent } from './authentication/profil/profil.component';
import { UpdateUsernameComponent } from './authentication/update-username/update-username.component';
import { UpdatePasswordComponent } from './authentication/update-password/update-password.component';
import { ListCommandeComponent } from './commande/list-commande/list-commande.component';
import { CreateCommandeComponent } from './commande/create-commande/create-commande.component';
import { ListLigneCommandeComponent } from './commande/list-ligne-commande/list-ligne-commande.component';
import { CreateLigneCommandeComponent } from './commande/create-ligne-commande/create-ligne-commande.component';
import { ViewCommandeComponent } from './commande/view-commande/view-commande.component';
import { ListStatistiqueComponent } from './tableau/list-statistique/list-statistique.component';
import { UploadContratComponent } from './contrat/upload-contrat/upload-contrat.component';
import { UploadFileVersementComponent } from './versement/upload-file-versement/upload-file-versement.component';
import { UpdateProfileComponent } from './authentication/update-profile/update-profile.component';

import { CreateArticleWithBarcodeComponent } from './article/create-article-with-barcode/create-article-with-barcode.component';
import { ListArticleWithBarArcodeComponent } from './article/list-article-with-bar-arcode/list-article-with-bar-arcode.component';
import { CreateVentewithQrcodeBarCodeComponent } from './vente/create-ventewith-qrcode-bar-code/create-ventewith-qrcode-bar-code.component';
import { CreateCommandewithQrcodeBarCodeComponent } from './commande/create-commandewith-qrcode-bar-code/create-commandewith-qrcode-bar-code.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListHistoriqueCreanceComponent } from './historique/list-historique-creance/list-historique-creance.component';


import { ListHistoriqueDevisComponent } from './historique/list-historique-devis/list-historique-devis.component';
import { ListHistoriqueLoginComponent } from './historique/list-historique-login/list-historique-login.component';
import { ListHistoriqueApproComponent } from './historique/list-historique-appro/list-historique-appro.component';
import { ListHistoriqueAvoirComponent } from './historique/list-historique-avoir/list-historique-avoir.component';
import { ListHistoriqueVenteComponent } from './historique/list-historique-vente/list-historique-vente.component';
import { ListHistoriqueCommandeComponent } from './historique/list-historique-commande/list-historique-commande.component';
import { ListUtilisateurComponent } from './utilisateur/list-utilisateur/list-utilisateur.component';

const routes: Routes = [

  { path: '', component: LoginComponent, children: [
    { path:'', redirectTo:'login' , pathMatch:'full'},

  ] },


  { path: 'register', component: RegisterComponent },

  { path: 'home', component: HomeComponent, children : [



    {path:'', redirectTo:'dashboard' , pathMatch:'full'},


  /*  { path: 'articles', component: ListArticleComponent},
    { path: 'article', component: CreateArticleComponent},
    { path:'article/:id',component:EditArticleComponent },
    { path: 'scategories', component: ListScategorieComponent},
    { path: 'scategorie', component: CreateScategorieComponent},
    { path:'scategorie/:id',component:EditScategorieComponent }, */

    {
      path: 'categories',
      component: ListCategorieComponent,
  //    canActivate: [AuthGuardService]
    },
    {
      path:'categorie',
      component: CreateCategorieComponent,
  //    canActivate: [AuthGuardService]
    },

    {
      path: 'registers',
      component: ListRegisterComponent,
  //    canActivate: [AuthGuardService]
    },


    { path: 'scategories', component: ListScategorieComponent},
    { path:'scategorie',component: CreateScategorieComponent },


    { path: 'articles', children: [
        {
          path: '',
          component: ListArticleComponent,
   //       canActivate: [AuthGuardService]
        },
        {
          path:'edit/:id',
          component: CreateArticleComponent
        },
        {
          path:'articleView/:id',
          component: ViewArticleComponent
        }
      ]
    },

    {
      path: 'listArticleWithBarcode',
      component: ListArticleWithBarArcodeComponent,
  //    canActivate: [AuthGuardService]
    },
    {
      path: 'articleWithBarcode',
      component: CreateArticleWithBarcodeComponent
    },

    {
      path: 'clients',
      component: ListClientComponent,
  //    canActivate: [AuthGuardService]
    },
    {
      path:'detailClient/:id',
      component: ViewClientComponent,
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

    {
      path: 'prestations',
      component: ListPrestationComponent,
  //    canActivate: [AuthGuardService]
    },
    {
      path: 'prestation',
      component: CreatePrestationComponent
    },

    {
      path: 'listcommandes',
      component: ListCommandeComponent,
 //     canActivate: [AuthGuardService]
    },
    {
      path:'commande',
      component: CreateCommandeComponent,
  //    canActivate: [AuthGuardService]
    },
    {
      path:'commandeView/:id',
      component: ViewCommandeComponent,
  //    canActivate: [AuthGuardService]
    },
    {
      path: 'detailsCommande',
      component: ListLigneCommandeComponent,
  //    canActivate: [AuthGuardService]
    },
    {
      path: 'detailsCommande',
      component: CreateLigneCommandeComponent
    },
    {
      path: 'commandeQrcode',
      component: CreateCommandewithQrcodeBarCodeComponent,
  //    canActivate: [AuthGuardService]
    },

    {
      path: 'listdevis',
      component: ListDevisComponent,
  //    canActivate: [AuthGuardService]
    },
    {
      path:'devis',
      component: CreateDevisComponent,
 //     canActivate: [AuthGuardService]
    },
    {
      path:'devisView/:id',
      component: ViewDevisComponent,
 //     canActivate: [AuthGuardService]
    },
    {
      path: 'detailsDevis',
      component: ListLigneDevisComponent,
 //     canActivate: [AuthGuardService]
    },
    {
      path:'detailsDevis',
      component: CreateLigneDevisComponent
    },

    {
      path: 'ventes',
      component: ListVenteComponent,
 //     canActivate: [AuthGuardService]
    },
    {
      path: 'vente',
      component: CreateVenteComponent,
 //     canActivate: [AuthGuardService]
    },
    {
      path: 'venteQrcode',
      component: CreateVentewithQrcodeBarCodeComponent,
  //    canActivate: [AuthGuardService]
    },
    {
      path: 'venteQrcode/:barcode',
      component: CreateVentewithQrcodeBarCodeComponent,
 //     canActivate: [AuthGuardService]
    },
   /* { path:'vente/:username',children:[
        {path:'',component:CreateVenteComponent},
      ]
    },
    */
    {
      path:'venteView/:id',
      component: ViewVenteComponent,
  //    canActivate: [AuthGuardService]
    },

    {
      path:'viewVente/:id',
      component: ViewVente2Component,
  //    canActivate: [AuthGuardService]
    },

    {
      path: 'detailsVentes',
      component: ListLigneVenteComponent,
  //    canActivate: [AuthGuardService]
    },
    { path:'detailsVente',children:[
        {
          path:'',
          component:CreateLigneVenteComponent
        },
      ]
    },

    {
      path: 'approvisionnements',
      component: ListApproComponent,
 //     canActivate: [AuthGuardService]
    },
    { path:'approvisionnement',children:[
        {
          path:'',
          component: CreateApproComponent
        },
        {
          path:'edit/:id',
          component: CreateApproComponent
        }
      ]
    },
    {
      path:'approView/:id',
      component: ViewApprovisionnementComponent,
  //    canActivate: [AuthGuardService]
    },

    {
      path: 'detailsApprovisionnements',
      component: ListLigneApproComponent,
  //    canActivate: [AuthGuardService]
    },
    { path:'detailsApprovisionnement',children:[
        {
          path:'',
          component: CreateLigneApproComponent
        },
        {
          path:'edit/:id',
          component: CreateLigneApproComponent
        }
      ]
    },

    {
      path: 'stocks',
      component: ListStockComponent,
  //    canActivate: [AuthGuardService]
    },
    { path:'stock',children:[
        {
          path:'',
          component: CreateApproComponent
        },
        {
          path:'edit/:id',
          component: CreateLigneApproComponent
        }
      ]
    },


    {
      path: 'creances',
      component: ListCreanceComponent,
  //    canActivate: [AuthGuardService]
    },
    {
      path:'creance',
      component: CreateCreanceComponent
    },
    {
      path:'creance',
      component: UpdateStatusCreanceComponent
    },
    {
      path:'creance',
      component: UpdateSoldeCreanceComponent
    },

    {
      path:'creanceView/:id',
      component: ViewCreanceComponent,
  //    canActivate: [AuthGuardService]
    },

    {
      path: 'detailsCreances',
      component: ListLigneCreanceComponent,
  //    canActivate: [AuthGuardService]
    },
    {
      path: 'detailsCreance',
      component: CreateLigneCreanceComponent
    },

    {
      path: 'avoirs',
      component: ListAvoirComponent,
 //     canActivate: [AuthGuardService]
    },
    {
      path:'avoir',
      component: CreateAvoirComponent
    },

    {
      path:'avoirView/:id',
      component: ViewAvoirComponent,
  //    canActivate: [AuthGuardService]
    },

    {
      path: 'detailsAvoirs',
      component: ListLigneAvoirComponent,
  //    canActivate: [AuthGuardService]
    },
    {
      path: 'detailsAvoir',
      component: CreateLigneAvoirComponent
    },


    {
      path: 'charges', component:
      ListChargeComponent,
  //    canActivate: [AuthGuardService]
    },
    {
      path:'charge',
      component: CreateChargeComponent
    },

    {
      path: 'categorieCharges',
      component: ListCategorieChargeComponent,
 //     canActivate: [AuthGuardService]
    },
    {
      path:'categorieCharge',
      component: CreateCategorieChargeComponent
    },

    {
      path: 'contrats',
      component: ListContratComponent,
  //    canActivate: [AuthGuardService]
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

    {
      path: 'fournisseurs',
      component: ListFournisseurComponent,
 //     canActivate: [AuthGuardService]
    },
    {
      path: 'fournisseur',
      component: CreateFournisseurComponent
    },
    {
      path: 'fournisseurView',
      component: ViewFournisseurComponent
    },
    {
      path: 'sendEmailToFournisseur',
      component: EnvoiEmailFournisseurComponent
    },
    {
      path: 'sendSMSToFournisseur',
      component: EnvoiSMSFournisseurComponent
    },

    {
      path: 'employes',
      component: ListEmployeComponent,
//      canActivate: [AuthGuardService]
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

    {
      path: 'versements',
      component: ListVersementComponent,
  //    canActivate: [AuthGuardService]
    },
    {
      path: 'versement',
      component: CreateVersementComponent
    },
    {
      path: 'versement',
      component: UploadFileVersementComponent
    },
    {
      path: 'viewVersement',
      component: ViewVersementComponent
    },


    {
      path: 'dashboard',
      component: DashboardComponent,
  //    canActivate: [AuthGuardService]
    },

    {
      path: 'tableau',
      component: ListStatistiqueComponent,
  //    canActivate: [AuthGuardService]
    },

    {
      path: 'chart',
      component: ChartComponent,
  //    canActivate: [AuthGuardService]
    },
    {
      path: 'barchart',
      component: BarchartComponent
    },
    {
      path: 'piechart',
      component: PiechartComponent
    },
    {
      path: 'linechart',
      component: LinechartComponent
    },

  //  { path: 'profile/:username', component: ProfilComponent },
    {
      path: 'profile/:id',
      component: ProfilComponent,
  //    canActivate: [AuthGuardService]
    },
    {
      path: 'profile/:id',
      component: UpdateProfileComponent
    },
    {
      path: 'profile/:id',
      component: UpdateUsernameComponent
    },
    {
      path: 'profile/:id',
      component: UpdatePasswordComponent
    },

    {
      path: 'utilisateurs',
      component: ListUtilisateurComponent,
  //    canActivate: [AuthGuardService]
    },


    {
      path: 'historiqueCommandes',
      component: ListHistoriqueCommandeComponent,
 //     canActivate: [AuthGuardService]
    },
    {
      path: 'historiqueVentes',
      component: ListHistoriqueVenteComponent,
 //     canActivate: [AuthGuardService]
    },
    {
      path: 'historiqueCreances',
      component: ListHistoriqueCreanceComponent,
  //    canActivate: [AuthGuardService]
    },
    {
      path: 'historiqueAvoirs',
      component: ListHistoriqueAvoirComponent,
  //    canActivate: [AuthGuardService]
    },
    {
      path: 'historiqueAppro',
      component: ListHistoriqueApproComponent,
 //     canActivate: [AuthGuardService]
    },
    {
      path: 'historiqueDevis',
      component: ListHistoriqueDevisComponent,
 //     canActivate: [AuthGuardService]
    },
    {
      path: 'historiqueLogins',
      component: ListHistoriqueLoginComponent,
  //    canActivate: [AuthGuardService]
    },


    { path: '**', component: PageNotFoundComponent },



  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
