import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import {DataTablesModule} from 'angular-datatables';
declare var $: any;

import { MatDialogModule,MatDialogRef, } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { CreateClientComponent } from './client/create-client/create-client.component';
import { CreateCategorieComponent } from './categorie/create-categorie/create-categorie.component';
import { ListCategorieComponent } from './categorie/list-categorie/list-categorie.component';
import { ListScategorieComponent } from './scategorie/list-scategorie/list-scategorie.component';
import { CreateScategorieComponent } from './scategorie/create-scategorie/create-scategorie.component';
import { ListArticleComponent } from './article/list-article/list-article.component';
import { CreateArticleComponent } from './article/create-article/create-article.component';
import { CreateFournisseurComponent } from './fournisseur/create-fournisseur/create-fournisseur.component';
import { ListFournisseurComponent } from './fournisseur/list-fournisseur/list-fournisseur.component';
import { ListEmployeComponent } from './employe/list-employe/list-employe.component';
import { CreateEmployeComponent } from './employe/create-employe/create-employe.component';
import { CreateVersementComponent } from './versement/create-versement/create-versement.component';
import { ListVersementComponent } from './versement/list-versement/list-versement.component';
import { ListContratComponent } from './contrat/list-contrat/list-contrat.component';
import { CreateContratComponent } from './contrat/create-contrat/create-contrat.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
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
import { ListStockComponent } from './stock/list-stock/list-stock.component';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { CreateLigneApproComponent } from './approvisionnement/create-ligne-appro/create-ligne-appro.component';
import { ListLigneApproComponent } from './approvisionnement/list-ligne-appro/list-ligne-appro.component';
import { ListVenteJounalierComponent } from './vente/list-vente-jounalier/list-vente-jounalier.component';
import { ViewApprovisionnementComponent } from './approvisionnement/view-approvisionnement/view-approvisionnement.component';
import { ViewVenteComponent } from './vente/view-vente/view-vente.component';
import { ListChargeComponent } from './charge/list-charge/list-charge.component';
import { CreateChargeComponent } from './charge/create-charge/create-charge.component';
import { MatConfirmDialogComponent } from './matdialog/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatButtonModule } from '@angular/material';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ListRegisterComponent } from './authentication/list-register/list-register.component';
import { CreateCategorieChargeComponent } from './charge/create-categorie-charge/create-categorie-charge.component';
import { ListCategorieChargeComponent } from './charge/list-categorie-charge/list-categorie-charge.component';
import { CreateLigneCreanceComponent } from './creance/create-ligne-creance/create-ligne-creance.component';
import { ListLigneCreanceComponent } from './creance/list-ligne-creance/list-ligne-creance.component';
import { ListLigneAvoirComponent } from './avoir/list-ligne-avoir/list-ligne-avoir.component';
import { CreateLigneAvoirComponent } from './avoir/create-ligne-avoir/create-ligne-avoir.component';
import { ViewAvoirComponent } from './avoir/view-avoir/view-avoir.component';
import { ViewCreanceComponent } from './creance/view-creance/view-creance.component';
import { ViewFournisseurComponent } from './fournisseur/view-fournisseur/view-fournisseur.component';
import { ViewArticleComponent } from './article/view-article/view-article.component';
import { ViewVersementComponent } from './versement/view-versement/view-versement.component';
import { ViewContratComponent } from './contrat/view-contrat/view-contrat.component';
import { BarchartComponent } from './chartJs/barchart/barchart.component';
import { LinechartComponent } from './chartJs/linechart/linechart.component';
import { PiechartComponent } from './chartJs/piechart/piechart.component';
import { ChartComponent } from './chartJs/chart/chart.component';
import { UpdateStatusCreanceComponent } from './creance/update-status-creance/update-status-creance.component';
import { UpdateSoldeCreanceComponent } from './creance/update-solde-creance/update-solde-creance.component';
import { BarcharComVenteComponent } from './chartJs/barchar-com-vente/barchar-com-vente.component';
import { EnvoiEmailFournisseurComponent } from './fournisseur/envoi-email-fournisseur/envoi-email-fournisseur.component';
import { EnvoiSMSFournisseurComponent } from './fournisseur/envoi-smsfournisseur/envoi-smsfournisseur.component';
import { EnvoiSMSClientComponent } from './client/envoi-smsclient/envoi-smsclient.component';
import { EnvoiEmailClientComponent } from './client/envoi-email-client/envoi-email-client.component';
import { EnvoiEmailEmployeComponent } from './employe/envoi-email-employe/envoi-email-employe.component';
import { EnvoiSMSEmployeComponent } from './employe/envoi-smsemploye/envoi-smsemploye.component';
import { ListEmailComponent } from './email/list-email/list-email.component';
import { EmailClientComponent } from './email/email-client/email-client.component';
import { EmailFournisseurComponent } from './email/email-fournisseur/email-fournisseur.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CreateDevisComponent } from './devis/create-devis/create-devis.component';
import { ListLigneDevisComponent } from './devis/list-ligne-devis/list-ligne-devis.component';
import { ListDevisComponent } from './devis/list-devis/list-devis.component';
import { ViewDevisComponent } from './devis/view-devis/view-devis.component';
import { CreateLigneDevisComponent } from './devis/create-ligne-devis/create-ligne-devis.component';
import { ProgressBarModule } from 'angular-progress-bar';
//import { ChartsModule } from 'ng2-charts';

import { httpInterceptorProviders } from './auth/auth-interceptor';
import { ProfilComponent } from './authentication/profil/profil.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { UpdateUsernameComponent } from './authentication/update-username/update-username.component';
import { UpdatePasswordComponent } from './authentication/update-password/update-password.component';
import { UpdateProfileComponent } from './authentication/update-profile/update-profile.component';
import { BarcharCommandeComponent } from './chartJs/barchar-commande/barchar-commande.component';
import { UpdateStatusApproComponent } from './approvisionnement/update-status-appro/update-status-appro.component';
import { UpdateMontantApproComponent } from './approvisionnement/update-montant-appro/update-montant-appro.component';
import { PiechartStockComponent } from './chartJs/piechart-stock/piechart-stock.component';
import { BarcharCreanceComponent } from './chartJs/barchar-creance/barchar-creance.component';
import { CreateCommandeComponent } from './commande/create-commande/create-commande.component';
import { ListCommandeComponent } from './commande/list-commande/list-commande.component';
import { CreateLigneCommandeComponent } from './commande/create-ligne-commande/create-ligne-commande.component';
import { ListLigneCommandeComponent } from './commande/list-ligne-commande/list-ligne-commande.component';
import { ViewCommandeComponent } from './commande/view-commande/view-commande.component';
import { ListVenteOfUserComponent } from './tableau/list-vente-of-user/list-vente-of-user.component';
import { ListVersementOfEmployeComponent } from './tableau/list-versement-of-employe/list-versement-of-employe.component';
import { ListStatistiqueComponent } from './tableau/list-statistique/list-statistique.component';
import { UploadContratComponent } from './contrat/upload-contrat/upload-contrat.component';
import { UploadFileVersementComponent } from './versement/upload-file-versement/upload-file-versement.component';
import { CreateArticleWithBarcodeComponent } from './article/create-article-with-barcode/create-article-with-barcode.component';
import { CreateArticleWithQrcodeComponent } from './article/create-article-with-qrcode/create-article-with-qrcode.component';
import { ListArticleWithQrcodeComponent } from './article/list-article-with-qrcode/list-article-with-qrcode.component';
import { ViewArticleWithQrcodeBarcodeComponent } from './article/view-article-with-qrcode-barcode/view-article-with-qrcode-barcode.component';
import { CreateCommandewithQrcodeBarCodeComponent } from './commande/create-commandewith-qrcode-bar-code/create-commandewith-qrcode-bar-code.component';
import { CreateVentewithQrcodeBarCodeComponent } from './vente/create-ventewith-qrcode-bar-code/create-ventewith-qrcode-bar-code.component';
import { ListArticleWithBarCodeComponent } from './article/list-article-with-bar-code/list-article-with-bar-code.component';


@NgModule({
  declarations: [
    AppComponent,
    ListClientComponent,
    CreateClientComponent,
    CreateCategorieComponent,
    ListCategorieComponent,
    ListScategorieComponent,
    CreateScategorieComponent,
    ListArticleComponent,
    CreateArticleComponent,
    CreateFournisseurComponent,
    ListFournisseurComponent,
    ListEmployeComponent,
    CreateEmployeComponent,
    CreateVersementComponent,
    ListVersementComponent,
    ListContratComponent,
    CreateContratComponent,
    HomeComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ListAvoirComponent,
    CreateAvoirComponent,
    ListCreanceComponent,
    CreateCreanceComponent,
    ListVenteComponent,
    CreateVenteComponent,
    ListLigneVenteComponent,
    CreateLigneVenteComponent,
    ListApproComponent,
    CreateApproComponent,
    ListStockComponent,
    CreateStockComponent,
    CreateLigneApproComponent,
    ListLigneApproComponent,
    ListVenteJounalierComponent,
    ViewApprovisionnementComponent,
    ViewVenteComponent,
    ListChargeComponent,
    CreateChargeComponent,
    MatConfirmDialogComponent,
    LoginComponent,
    RegisterComponent,
    ListRegisterComponent,
    CreateCategorieChargeComponent,
    ListCategorieChargeComponent,
    CreateLigneCreanceComponent,
    ListLigneCreanceComponent,
    ListLigneAvoirComponent,
    CreateLigneAvoirComponent,
    ViewAvoirComponent,
    ViewCreanceComponent,
    ViewFournisseurComponent,
    ViewArticleComponent,
    ViewVersementComponent,
    ViewContratComponent,
    BarchartComponent,
    LinechartComponent,
    PiechartComponent,
    ChartComponent,
    UpdateStatusCreanceComponent,
    UpdateSoldeCreanceComponent,
    BarcharComVenteComponent,
    EnvoiEmailFournisseurComponent,
    EnvoiSMSFournisseurComponent,
    EnvoiSMSClientComponent,
    EnvoiEmailClientComponent,
    EnvoiEmailEmployeComponent,
    EnvoiSMSEmployeComponent,
    ListEmailComponent,
    EmailClientComponent,
    EmailFournisseurComponent,
    CreateDevisComponent,
    ListLigneDevisComponent,
    ListDevisComponent,
    ViewDevisComponent,
    CreateLigneDevisComponent,
    ProfilComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    UpdateUsernameComponent,
    UpdatePasswordComponent,
    UpdateProfileComponent,
    BarcharCommandeComponent,
    UpdateStatusApproComponent,
    UpdateMontantApproComponent,
    PiechartStockComponent,
    BarcharCreanceComponent,
    CreateCommandeComponent,
    ListCommandeComponent,
    ViewCommandeComponent,
    CreateLigneCommandeComponent,
    ListLigneCommandeComponent,
    ListVenteOfUserComponent,
    ListVersementOfEmployeComponent,
    ListStatistiqueComponent,
    UploadContratComponent,
    UploadFileVersementComponent,
    CreateArticleWithBarcodeComponent,
    CreateArticleWithQrcodeComponent,
    ListArticleWithQrcodeComponent,
    ViewArticleWithQrcodeBarcodeComponent,
    CreateCommandewithQrcodeBarCodeComponent,
    CreateVentewithQrcodeBarCodeComponent,
    ListArticleWithBarCodeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CommonModule,
    DataTablesModule,
    ProgressBarModule,
  //  ChartsModule,

    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

  ],

  providers: [DatePipe,{ provide: MAT_DIALOG_DATA, useValue: {} ,},
    { provide: MatDialogRef, useValue: {} },

    httpInterceptorProviders,

  ],

  bootstrap: [AppComponent],

  entryComponents: [
    CreateCategorieComponent, CreateScategorieComponent, CreateArticleComponent, CreateClientComponent,
    CreateFournisseurComponent, CreateVersementComponent, CreateCreanceComponent, CreateContratComponent,
    CreateAvoirComponent, CreateChargeComponent, CreateCommandeComponent, CreateApproComponent,
    CreateVenteComponent,CreateEmployeComponent, MatConfirmDialogComponent, ProfilComponent,
    UpdateUsernameComponent, CreateArticleWithBarcodeComponent, CreateVentewithQrcodeBarCodeComponent,
    CreateCommandewithQrcodeBarCodeComponent
  ]

})
export class AppModule { }
