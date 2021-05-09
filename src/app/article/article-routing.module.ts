import { CreateArticleComponent } from './create-article/create-article.component';
import { ViewArticleComponent } from './view-article/view-article.component';
import { ListArticleComponent } from './list-article/list-article.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ListArticleComponent,
  },
  {
    path: 'article',
    children:[
      {
        path:'',
        component: CreateArticleComponent
      },
      {
        path:'edit/:id',
        component: CreateArticleComponent
      }
    ]
  },
  {
    path:'articleView/:id',
    component: ViewArticleComponent
  }


]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
