import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApprovisionnementRoutingModule } from './approvisionnement-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { MatDialogModule,MatDialogRef, } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgressBarModule } from 'angular-progress-bar';
import { MatButtonModule } from '@angular/material';

import { ToastrModule } from 'ngx-toastr';

import { UpdateStatusApproComponent } from './update-status-appro/update-status-appro.component';
import { UpdateMontantApproComponent } from './update-montant-appro/update-montant-appro.component';
import { ViewApprovisionnementComponent } from './view-approvisionnement/view-approvisionnement.component';
import { CreateLigneApproComponent } from './create-ligne-appro/create-ligne-appro.component';
import { ListLigneApproComponent } from './list-ligne-appro/list-ligne-appro.component';
import { CreateApproComponent } from 'src/app/approvisionnement/create-appro/create-appro.component';
import { ListApproComponent } from './list-appro/list-appro.component';
import { httpInterceptorProviders } from './../auth/auth-interceptor';

@NgModule({
  declarations: [
    ListApproComponent,
    CreateApproComponent,
    ViewApprovisionnementComponent,
    UpdateMontantApproComponent,
    UpdateStatusApproComponent,
    ListLigneApproComponent,
    CreateLigneApproComponent,
  ],
  imports: [
    CommonModule,
    ApprovisionnementRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    CommonModule,
    DataTablesModule,
    ProgressBarModule,

    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [DatePipe,{ provide: MAT_DIALOG_DATA, useValue: {} ,},
    { provide: MatDialogRef, useValue: {} },

    httpInterceptorProviders,

  ],
})
export class ApprovisionnementModule { }
