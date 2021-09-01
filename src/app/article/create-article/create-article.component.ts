import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Scategorie } from 'src/app/models/scategorie';
import { ScategorieService } from 'src/app/services/scategorie.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Produit } from './../../models/produit';
import { ProduitService } from './../../services/article.service';
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

  formDataArticle = new Produit();
  listScategories: Scategorie[];
  addArticleForm: NgForm;

//  dropDownForm: FormGroup;

  submitted = false;

  constructor(public crudApi: ProduitService,
              public scatService: ScategorieService ,
              public toastr: ToastrService,
              public fb: FormBuilder,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<CreateArticleComponent>,
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
    if (isNullOrUndefined(this.data.id)) {
      console.log(this.formDataArticle);
      this.crudApi.saveProduit(this.formDataArticle).
      subscribe( data => {
        this.dialogRef.close();
        console.log(this.formDataArticle)
        this.crudApi.filter('Register click');
        this.toastr.success("Article Ajouté avec Succès");
        this.crudApi.getAllProduits().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/articles']);
      },
        (error: HttpErrorResponse) => {
        this.toastr.error("Ce Article exist déjà, veuillez changez la référence");
        }
      );

    }else {
      console.log(this.formDataArticle.id, this.formDataArticle);
      this.crudApi.updateProduit(this.formDataArticle.id, this.formDataArticle).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Article Modifiée avec Succès");
        this.crudApi.getAllProduits().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/home/articles']);
      });

    }

  }

  saveArticle(art: Produit) {
    if (isNullOrUndefined(this.data.id)) {
      console.log(this.formDataArticle);
      this.crudApi.saveProduit(this.formDataArticle).
      subscribe( data => {
        this.dialogRef.close();
        console.log(this.formDataArticle)
        this.crudApi.filter('Register click');
        this.toastr.success("Article Ajouté avec Succès");
        this.crudApi.getAllProduits().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/articles']);
      });

    }
  }

  updateArticle(id: number, art: Produit){
    this.crudApi.updateProduit(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success("Article Modifier avec Succès");
      this.dialogRef.close();
      this.crudApi.getAllProduits().subscribe(
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
