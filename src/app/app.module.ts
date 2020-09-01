import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import {DataTablesModule} from 'angular-datatables';
declare var $: any;

import { MatDialogModule,MatDialogRef, } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap'

import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { CreateClientComponent } from './client/create-client/create-client.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';
import { CreateCategorieComponent } from './categorie/create-categorie/create-categorie.component';
import { ListCategorieComponent } from './categorie/list-categorie/list-categorie.component';
import { EditCategorieComponent } from './categorie/edit-categorie/edit-categorie.component';
import { ListScategorieComponent } from './scategorie/list-scategorie/list-scategorie.component';
import { CreateScategorieComponent } from './scategorie/create-scategorie/create-scategorie.component';
import { EditScategorieComponent } from './scategorie/edit-scategorie/edit-scategorie.component';
import { EditArticleComponent } from './article/edit-article/edit-article.component';
import { ListArticleComponent } from './article/list-article/list-article.component';
import { CreateArticleComponent } from './article/create-article/create-article.component';
import { CreateFournisseurComponent } from './fournisseur/create-fournisseur/create-fournisseur.component';
import { ListFournisseurComponent } from './fournisseur/list-fournisseur/list-fournisseur.component';
import { EditFournisseurComponent } from './fournisseur/edit-fournisseur/edit-fournisseur.component';
import { EditEmployeComponent } from './employe/edit-employe/edit-employe.component';
import { ListEmployeComponent } from './employe/list-employe/list-employe.component';
import { CreateEmployeComponent } from './employe/create-employe/create-employe.component';
import { CreateVersementComponent } from './versement/create-versement/create-versement.component';
import { ListVersementComponent } from './versement/list-versement/list-versement.component';
import { EditVersementComponent } from './versement/edit-versement/edit-versement.component';
import { EditContratComponent } from './contrat/edit-contrat/edit-contrat.component';
import { ListContratComponent } from './contrat/list-contrat/list-contrat.component';
import { CreateContratComponent } from './contrat/create-contrat/create-contrat.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListCmdClientComponent } from './commandeClient/list-cmd-client/list-cmd-client.component';
import { CreateCmdClientComponent } from './commandeClient/create-cmd-client/create-cmd-client.component';
import { ListAvoirComponent } from './avoir/list-avoir/list-avoir.component';
import { CreateAvoirComponent } from './avoir/create-avoir/create-avoir.component';
import { ListCreanceComponent } from './creance/list-creance/list-creance.component';
import { CreateCreanceComponent } from './creance/create-creance/create-creance.component';
import { CreateLcmdClientComponent } from './commandeClient/create-lcmd-client/create-lcmd-client.component';
import { ListLcmdClientComponent } from './commandeClient/list-lcmd-client/list-lcmd-client.component';

@NgModule({
  declarations: [
    AppComponent,
    ListClientComponent,
    CreateClientComponent,
    EditClientComponent,
    CreateCategorieComponent,
    ListCategorieComponent,
    EditCategorieComponent,
    ListScategorieComponent,
    CreateScategorieComponent,
    EditScategorieComponent,
    EditArticleComponent,
    ListArticleComponent,
    CreateArticleComponent,
    CreateFournisseurComponent,
    ListFournisseurComponent,
    EditFournisseurComponent,
    EditEmployeComponent,
    ListEmployeComponent,
    CreateEmployeComponent,
    CreateVersementComponent,
    ListVersementComponent,
    EditVersementComponent,
    EditContratComponent,
    ListContratComponent,
    CreateContratComponent,
    HomeComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ListCmdClientComponent,
    CreateCmdClientComponent,
    ListAvoirComponent,
    CreateAvoirComponent,
    ListCreanceComponent,
    CreateCreanceComponent,
    CreateLcmdClientComponent,
    ListLcmdClientComponent
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
    NgbModule,

    MatDialogModule,
    MatToolbarModule,
    MatIconModule,




  ],

  providers: [DatePipe,{ provide: MAT_DIALOG_DATA, useValue: {} ,},
    { provide: MatDialogRef, useValue: {} }],

  bootstrap: [AppComponent],
  entryComponents: [CreateCategorieComponent,
    CreateLcmdClientComponent]
})
export class AppModule { }
