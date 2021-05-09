import { ViewArticleComponent } from './view-article/view-article.component';
import { CreateArticleComponent } from 'src/app/article/create-article/create-article.component';
import { ListArticleComponent } from './list-article/list-article.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    ListArticleComponent,
    CreateArticleComponent,
    ViewArticleComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
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
export class ArticleModule { }
