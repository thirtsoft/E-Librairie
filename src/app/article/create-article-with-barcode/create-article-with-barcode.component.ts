import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/services/categorie.service';
import { ScategorieService } from 'src/app/services/scategorie.service';
import { NgForm, FormBuilder } from '@angular/forms';
import { Scategorie } from 'src/app/models/scategorie';
import { Produit } from './../../models/produit';
import { ProduitService } from './../../services/article.service';
import { Component, OnInit, Inject } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-article-with-barcode',
  templateUrl: './create-article-with-barcode.component.html',
  styleUrls: ['./create-article-with-barcode.component.scss']
})
export class CreateArticleWithBarcodeComponent implements OnInit {

  formDataArticle = new Produit();
  listScategories: Scategorie[];
  addArticleForm: NgForm;

  isValid:boolean = true;

  submitted = false;

  constructor(public crudApi: ProduitService,
              public scatService: ScategorieService,
              public fb: FormBuilder,
              public toastr: ToastrService,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<CreateArticleWithBarcodeComponent>,
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
      this.crudApi.createProduitWithBarCode(this.formDataArticle).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success('avec succès','Artice Ajoutée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });

        this.crudApi.getAllProductsOrderDesc().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/home/listArticleWithBarcode']);
      },
        (error: HttpErrorResponse) => {
        this.toastr.error("Ce Article exist déjà, veuillez changez la référence");
        });

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
        this.router.navigate(['/home/listArticleWithBarcode']);
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


  validateForm() {
    this.isValid = false;
    if ((this.formDataArticle.prixAchat <= 0) || (this.formDataArticle.prixVente <= 0) ||
        (this.formDataArticle.prixDetail <= 0) || (this.formDataArticle.qtestock <= 0)
        || (this.formDataArticle.stockInitial <= 0) ||
        (this.formDataArticle.prixAchat <= this.formDataArticle.prixVente) ||
        (this.formDataArticle.prixVente <= this.formDataArticle.prixDetail) ||
        (this.formDataArticle.qtestock <= this.formDataArticle.stockInitial)
        )
      this.isValid = false;
    else
      this.isValid = true;
    return this.isValid;
  }

  saveArticle(art: Produit) {
  //  if (this.validateForm()) {
      this.crudApi.createProduitWithBarCode(art).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success('avec succès','Article Ajoutée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.crudApi.getAllProductsOrderDesc().subscribe(
          response =>{
            this.crudApi.listData = response;
          }

        );
        this.router.navigate(['/home/listArticleWithBarcode']);
      });

   /*  } else {
      this.toastr.error('Veuillez corrigé les valeur erronées','Données non valides', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
    } */


  }

  updateArticle(id: number, art: Produit){
  //  if (this.validateForm()) {
      this.crudApi.updateProduit(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value)
        .subscribe( data => {
          this.toastr.warning('avec succès','Article Modifié', {
            timeOut: 1500,
            positionClass: 'toast-top-right',
          });
          this.dialogRef.close();
          this.crudApi.getAllProductsOrderDesc().subscribe(
            response =>{
              this.crudApi.listData = response;
            }
          );
        this.router.navigate(['/home/listArticleWithBarcode']);
      }
    );

   /*  }else {
      this.toastr.error('Veuillez corrigé les valeur erronées','Données non valides', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
    } */

  }

  onChangeCtegorie(id: number) {
    this.scatService.getScategorieById(id).subscribe(
      (response: Scategorie[]) => {
        this.listScategories = response;
      }
    );
  }

}
