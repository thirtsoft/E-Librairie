import { Component, OnInit, Inject } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Scategorie } from 'src/app/models/scategorie';
import { Categorie } from 'src/app/models/categorie';
import { ArticleService } from 'src/app/services/article.service';
import { ScategorieService } from 'src/app/services/scategorie.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  public article = new Article();

  public scategories:  Scategorie[];

  public categories: Categorie[];

  submitted = false;

  constructor(public crudApi: ArticleService, public ScatService: ScategorieService ,
    private catService: CategorieService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<CreateArticleComponent>,

  ) { }
  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){

     // this.infoForm()};
      this.catService.getAllCategories().subscribe(
        response =>{this.categories = response;}
      );

      this.ScatService.getAllScategories().subscribe(
        response =>{this.scategories = response;}
      );

    }

 /*  infoForm() {
    let cat = new SousCategorie();
    this.crudApi.dataForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      libelle: ['', [Validators.required]],
      categories: ['', [Validators.required]],

    }); */


  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.saveArticle(this.article);
    }else {
      this.updateArticle();
    }

  }
  saveArticle(art: Article) {
    this.crudApi.createArticle(art).
    subscribe( data => {
      this.dialogRef.close();
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

  onSelectCateg(id: number) {
    this.ScatService.getListScategoriesByCategoryId(id).subscribe(
      response => {
        this.scategories = response;
      }
    );

  }

  onSelectScateg(id: number) {
    this.ScatService.getScategorieById(id).subscribe(
      response => {
        this.crudApi.dataForm.value.code = "10";
      }
    );

  }


}
