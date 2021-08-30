import { ProduitService } from './../../services/article.service';
import { Produit } from './../../models/produit';
import { Component, OnInit, Inject } from '@angular/core';
import { Scategorie } from 'src/app/models/scategorie';
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

  formDataArticle = new Produit();
  listScategories: Scategorie[];

  constructor(public crudApi: ProduitService, public scatService: ScategorieService ,
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
      this.crudApi.createProduits(this.formDataArticle).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Articel Ajouté avec Succès");
        this.crudApi.getAllProduits().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/home/articles']);
      });

    }else {
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
    this.crudApi.createProduits(art).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success("Article Ajouté avec Succès");
      this.crudApi.getAllProduits().subscribe(
        response =>{this.crudApi.listData = response;},

      );
      this.router.navigate(['/home/articles']);
    });
  }
  updateArticle(){
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

}
