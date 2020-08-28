import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/categorie';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategorieService } from 'src/app/services/categorie.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.scss']
})
export class EditCategorieComponent implements OnInit {

  categorie: Categorie;

  categories: Categorie[];

  private editForm: FormGroup;

  currentCategorie: any;

  public idCat: number;

  constructor(public crudApi: CategorieService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router, private route: ActivatedRoute
    ) { }


  ngOnInit() {
    this.idCat = this.route.snapshot.params.id;
    console.log(this.idCat);
    this.crudApi.getCategorieById(this.idCat)
      .subscribe(data => {
        this.currentCategorie = data;
      },err=> {
        console.log(err);
      });
   /*  this.editForm = this.fb.group({
      id: [''],
      raisonSocial: [''],
      chefService: [''],
      adresse: [''],
      telephone: [''],
      email: ['']
    }); */

  }

  updateCategorie(categorie: Categorie){
    this.crudApi.updateCategorie(this.idCat,categorie).
    subscribe( data => {
      this.toastr.success("Categorie Modifier avec Succès");
      this.crudApi.getAllCategories().subscribe(
        response =>{this.crudApi.listData = response;}
      );
      this.router.navigateByUrl('categories');
    });
  }

  onSubmit() {
    this.crudApi.updateCategorie(this.editForm.value.id, this.crudApi.dataForm.value).
    subscribe(data => {
      this.toastr.success("Categorie Modifier avec succes");
      this.crudApi.getAllCategories().subscribe(
        response => {this.crudApi.listData = response;
        }
      );
      this.router.navigateByUrl("categories");
    });
  }

  GowBackToFournisseur() {
    this.router.navigateByUrl('categories');
  }


}
