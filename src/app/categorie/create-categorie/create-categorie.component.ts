import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from 'src/app/services/categorie.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-categorie',
  templateUrl: './create-categorie.component.html',
  styleUrls: ['./create-categorie.component.scss']
})
export class CreateCategorieComponent implements OnInit {

  listData : Categorie[];

  constructor(public crudApi: CategorieService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router
    ) { }



  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){
      this.infoForm()
    };

  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      designation: ['', [Validators.required]],
    });

  }

  getListCategories() {
    this.crudApi.getAllCategories().subscribe(
      response =>{this.listData = response;}
    );

  }

  ResetForm() {
      this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.crudApi.choixmenu == "A"){
      this.saveCategorie();
    }else{
      this.updateCategorie();
    }

  }

  saveCategorie() {
    this.crudApi.createCategorie(this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success("Categorie Ajouté avec Succès");
     // this.dialogRef.close();
      //this.ResetForm();
      this.getListCategories();
      this.router.navigate(['/categories']);
    });
  }
  updateCategorie(){
    this.crudApi.updateCategorie(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success("Categorie Modifier avec Succès");
      this.getListCategories();
      this.router.navigate(['/categories']);
    });
  }


}
