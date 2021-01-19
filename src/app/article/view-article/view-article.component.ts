import { Component, OnInit, Inject } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Scategorie } from 'src/app/models/scategorie';
import { ArticleService } from 'src/app/services/article.service';
import { ScategorieService } from 'src/app/services/scategorie.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss']
})
export class ViewArticleComponent implements OnInit {

  formDataArticle = new Article();
  listScategories: Scategorie[];

  constructor(public crudApi: ArticleService, public scatService: ScategorieService ,
    public fb: FormBuilder, public toastr: ToastrService, private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<ViewArticleComponent>,
  ) { }

  ngOnInit() {

    this.getScategories();
    if (!isNullOrUndefined(this.data.id)) {
      this.formDataArticle = Object.assign({},this.crudApi.listData[this.data.id])
      console.log(this.formDataArticle);
    }
  }

  getScategories() {
    this.scatService.getAllScategories().subscribe((response) => {
      this.listScategories = response as Scategorie[];});
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    if(isNullOrUndefined(this.data.artId)) {
      this.crudApi.createArticle(this.formDataArticle).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Articel Ajouté avec Succès");
        this.crudApi.getAllArticles().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/articles']);
      });

    }else {
      this.crudApi.updateArticle(this.formDataArticle.id, this.formDataArticle).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Article Modifiée avec Succès");
        this.crudApi.getAllArticles().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/articles']);
      });
    }

  }

  saveArticle(art: Article) {
    this.crudApi.createArticle(art).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success("Article Ajouté avec Succès");
      this.crudApi.getAllArticles().subscribe(
        response =>{this.crudApi.listData = response;},

      );
      this.router.navigate(['/articles']);
    });
  }
  updateArticle(){
    this.crudApi.updateArticle(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success("Article Modifier avec Succès");
      this.dialogRef.close();
      this.crudApi.getAllArticles().subscribe(
        response =>{this.crudApi.listData = response;}
      );
      this.router.navigate(['/articles']);
    });
  }

}
