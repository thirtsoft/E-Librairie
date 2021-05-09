import { LoginComponent } from './authentication/login/login.component';
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

import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

/*
import { CreateCategorieComponent } from './categorie/create-categorie/create-categorie.component';
import { ListCategorieComponent } from './categorie/list-categorie/list-categorie.component';

*/
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatConfirmDialogComponent } from './matdialog/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatButtonModule } from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ProgressBarModule } from 'angular-progress-bar';
//import { ChartsModule } from 'ng2-charts';

import { httpInterceptorProviders } from './auth/auth-interceptor';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DefautLayoutComponent } from './layout/defaut-layout/defaut-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MatConfirmDialogComponent,
    AdminLayoutComponent,
    DefautLayoutComponent,
    LoginComponent,
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

  // imported All Modules

    SharedModule,

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
  /*
  entryComponents: [
  //  CreateCategorieComponent,
    CreateScategorieComponent, CreateArticleComponent, CreateClientComponent,
    CreateFournisseurComponent, CreateVersementComponent, CreateCreanceComponent, CreateContratComponent,
    CreateAvoirComponent, CreateChargeComponent, CreateCommandeComponent, CreateApproComponent,
    CreateVenteComponent,CreateEmployeComponent, MatConfirmDialogComponent, ProfilComponent,
    UpdateUsernameComponent
  ]
  */
})
export class AppModule { }
