import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CategorieRoutingModule } from './categorie-routing.module';
import { CreateCategorieComponent } from './create-categorie/create-categorie.component';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';
import { DataTablesModule } from 'angular-datatables';
import { MatDialogModule,MatDialogRef, } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgressBarModule } from 'angular-progress-bar';
import { MatButtonModule } from '@angular/material';

import { ToastrModule } from 'ngx-toastr';
import { httpInterceptorProviders } from './../auth/auth-interceptor';

@NgModule({
  declarations: [
    ListCategorieComponent,
    CreateCategorieComponent
  ],
  imports: [
    CommonModule,
    CategorieRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    ToastrModule.forRoot(),
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
export class CategorieModule { }
