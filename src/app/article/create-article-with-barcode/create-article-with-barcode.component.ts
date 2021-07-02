import { Component, OnInit, Inject } from '@angular/core';
import { Scategorie } from 'src/app/models/scategorie';
import { Product } from './../../models/article';
import { ArticleService } from 'src/app/services/article.service';
import { ScategorieService } from 'src/app/services/scategorie.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-create-article-with-barcode',
  templateUrl: './create-article-with-barcode.component.html',
  styleUrls: ['./create-article-with-barcode.component.scss']
})
export class CreateArticleWithBarcodeComponent implements OnInit {

  formDataArticle = new Product();
  listScategories: Scategorie[];
  addArticleForm: NgForm;

//  dropDownForm: FormGroup;

  submitted = false;

  constructor(public crudApi: ArticleService, public scatService: ScategorieService ,
    private catService: CategorieService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<CreateArticleWithBarcodeComponent>,
  ) { }

  ngOnInit() {
    this.getScategories();
    if (!isNullOrUndefined(this.data.id)) {
      this.formDataArticle = Object.assign({},this.crudApi.listArticle[this.data.id])
      console.log(this.formDataArticle);
    }
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
/*
  onSubmit() {
    if (isNullOrUndefined(this.data.id)) {
      console.log(this.formDataArticle);
    //  this.crudApi.createProduit(this.formDataArticle);
      subscribe( data => {
        this.dialogRef.close();
        console.log(this.formDataArticle)
        this.crudApi.filter('Register click');
        this.toastr.success("Article Ajouté avec Succès");
        this.crudApi.getAllArticles().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/articles']);
 //     });

    }else {
      console.log(this.formDataArticle.id, this.formDataArticle);
      this.crudApi.updateArticle(this.formDataArticle.id, this.formDataArticle).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Article Modifiée avec Succès");
        this.crudApi.getAllArticles().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/home/articles']);
      });

    }

  }
*/

  onSubmits() {
    if(isNullOrUndefined(this.data.artId)) {
      this.crudApi.createArticleWithBarCode(this.formDataArticle).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Articel Ajouté avec Succès");
        this.crudApi.getAllArticles().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/home/articlesQrCodes']);
      });

    }else {
      console.log(this.formDataArticle.id, this.formDataArticle);
      this.crudApi.updateArticle(this.formDataArticle.id, this.formDataArticle).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Article Modifiée avec Succès");
        this.crudApi.getAllArticles().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/home/articlesQrCodes']);
      });
    }

  }


  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.saveArticle(this.formDataArticle);
    }else {
      this.updateArticle(this.formDataArticle.id, this.formDataArticle);
    }

  }

  saveArticle(art: Product) {
    this.crudApi.createArticleWithBarCode(art).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success("Article Ajouté avec Succès");
      this.crudApi.getAllArticles().subscribe(
        response =>{this.crudApi.listData = response;},

      );
      this.router.navigate(['/home/articles']);
    });
  }
  updateArticle(id: number, art: Product){
    this.crudApi.updateArticle(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success("Article Modifier avec Succès");
      this.dialogRef.close();
      this.crudApi.getAllArticles().subscribe(
        response =>{this.crudApi.listData = response;}
      );
      this.router.navigate(['/home/articles']);
    });
  }

  onChangeCtegorie(id: number) {
    this.scatService.getScategorieById(id).subscribe(
      (response: Scategorie[]) => {
        this.listScategories = response;
      }
    );
  }

}
