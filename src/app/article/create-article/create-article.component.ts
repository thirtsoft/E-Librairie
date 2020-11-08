import { Component, OnInit, Inject } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Scategorie } from 'src/app/models/scategorie';
import { Categorie } from 'src/app/models/categorie';
import { ArticleService } from 'src/app/services/article.service';
import { ScategorieService } from 'src/app/services/scategorie.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  public article = new Article();

  formDataArticle = new Article();

  listCategories: Categorie[];
  listScategories: Scategorie[];

  scategorieList;
  dropDownForm: FormGroup;

  scategorie : any={};

  public categories: Categorie[];

  submitted = false;

  constructor(public crudApi: ArticleService, public scatService: ScategorieService ,
    private catService: CategorieService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<CreateArticleComponent>,

  ) { }
  ngOnInit() {
    //this.getCategories();
    this.getScategories();
    if (!isNullOrUndefined(this.data.artId)) {
      this.formDataArticle = Object.assign({},this.crudApi.listData[this.data.artId])
    }
    /*
    this.dropDownForm = this.fb.group({
      categorie: [''],
      scategorie: [''],

    });

    if (this.crudApi.choixmenu == "A"){

     // this.infoForm()};
      this.catService.getAllCategories().subscribe(
        response =>{this.categorieList = response;}
      );
    /*
      this.ScatService.getAllScategories().subscribe(
        response =>{this.scategorieList = response;}
      );
        */
  }

  getCategories() {
    this.catService.getAllCategories().subscribe((response) => {
      this.listCategories = response as Categorie[];});

  }

  getScategories() {
    this.scatService.getAllScategories().subscribe((response) => {
      this.listScategories = response as Scategorie[];});

  }

  onChangeScategories(event) {
    console.log(event);
    this.scatService.getListScategoriesByCategoryId(event.target.value).subscribe(response => {
      this.listScategories = response as Scategorie[];
    });
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

  /*
  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.saveArticle(this.article);
    }else {
      this.updateArticle();
    }

  }*/

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

  onChangeCtegorie(id: number) {
    this.scatService.getScategorieById(id).subscribe(
      response => {
        this.scategorieList = response;
      }
    );

  }


}
