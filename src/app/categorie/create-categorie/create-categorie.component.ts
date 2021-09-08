import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from 'src/app/services/categorie.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-create-categorie',
  templateUrl: './create-categorie.component.html',
  styleUrls: ['./create-categorie.component.scss']
})
export class CreateCategorieComponent implements OnInit {

  listData : Categorie[];

  constructor(public crudApi: CategorieService ,
              public toastr: ToastrService,
              public fb: FormBuilder,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<CreateCategorieComponent>,
  ) { }

  get f() { return this.crudApi.dataForm.controls; }

  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){
      this.infoForm()
    };
  }

  infoForm() {
    const validatorString = '^[a-zA-Z,.!?\\s-]*$';
    this.crudApi.dataForm = this.fb.group({
    //  id: 0,
      code: ['', [Validators.required]],
      designation: ['', [Validators.required, Validators.pattern(validatorString)]],
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
        this.dialogRef.close();
      }else{
    //    console.log('non ajouter');
        this.updateCategorie();
      }

  }

  saveCategorie() {
    this.crudApi.saveCategorie(this.crudApi.dataForm.value)
      .subscribe(response => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Categorie Ajouté avec Succès");
        this.getListCategories();
        this.router.navigate(['/home/categories']);
      },
        (error: HttpErrorResponse) => {
          this.toastr.error("Cette catgory exist déjà, veuillez changez de code");
        }
      );

  }

  updateCategorie(){
    this.crudApi.updateCategorie(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Categorie Modifier avec Succès");
      this.crudApi.filter('Register click');
      this.getListCategories();
      this.router.navigate(['/home/categories']);
    });
  }

}
