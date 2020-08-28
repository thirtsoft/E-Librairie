import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Categorie } from 'src/app/models/categorie';
import { Scategorie } from 'src/app/models/scategorie';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnInit {

  listData : Article[];

  private editForm: FormGroup;

  constructor(public crudApi: ArticleService,public fb: FormBuilder,
    public toastr: ToastrService, private router : Router
    ) { }

  ngOnInit() {
    this.getListArticles();
  }

  getListArticles() {
    this.crudApi.getAllArticles().subscribe(
      response =>{this.listData = response;}
    );

  }

  onCreateArticle(){
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("articles/new");
   /* const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%"; */
    //dialogConfig.data="gdddd";
   // this.matDialog.open(CreateClientComponent, dialogConfig);
  }
  deleteArticle(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cet Article ?')) {
    this.crudApi.deleteArticle(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.success('Article supprimé avec succès!');
          this.getListArticles();
      },
        error => console.log(error));
    }

  }

  editArticle(item : Article) {

    this.router.navigateByUrl('articles/'+item.id);

  }


}
