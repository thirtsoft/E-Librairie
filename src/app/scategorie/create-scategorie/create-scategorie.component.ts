import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Scategorie } from 'src/app/models/scategorie';
import { Categorie } from 'src/app/models/categorie';
import { ScategorieService } from 'src/app/services/scategorie.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-create-scategorie',
  templateUrl: './create-scategorie.component.html',
  styleUrls: ['./create-scategorie.component.scss']
})
export class CreateScategorieComponent implements OnInit {

  listCategorie: Categorie[];
  listCategories: any[] = [];
  submitted = false;
  currentScategorie;
  formDataScategorie = new Scategorie();
  addScategorieForm: NgForm;
  currentCategorie;

  code: FormControl;
  libelle: FormControl;
  categorie: FormControl;
  validatorString = '^[a-zA-Z,.!?\\s-]*$';

  constructor(public crudApi: ScategorieService,
              private catService: CategorieService,
              public fb: FormBuilder,
              public toastr: ToastrService,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<CreateScategorieComponent>,
  ) {}

  ngOnInit() {
    this.initForm();
//    this.infoForm();
    this.getCategories();
    if (!isNullOrUndefined(this.data.scatId)) {
      console.log(this.crudApi.listData[this.data.scatId]);
      this.formDataScategorie = Object.assign({},this.crudApi.listData[this.data.scatId])
    }
  }

  getCategories() {
    this.catService.getAllCategories().subscribe((response) => {
      this.listCategorie = response as Categorie[];});
  }

  initForm() {
    this.formDataScategorie = {
      id: null,
      code:"",
      libelle:"",
      categorie: new Categorie(),
    };
  }

  infoForm() {
    this.code = new FormControl('', Validators.required);
    this.libelle = new FormControl('', [Validators.required]);
    this.categorie = new FormControl('', Validators.required);

  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    if (isNullOrUndefined(this.data.scatId)) {
      this.crudApi.createScategorie(this.formDataScategorie).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Scategorie Ajouté avec Succès");
        this.crudApi.getAllScategories().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/home/scategories']);
      },
      (error: HttpErrorResponse) => {
        this.toastr.error("Cet Scategory exist déjà, veuillez changez le code");
        }
      );

    }else {
      console.log(this.formDataScategorie.id, this.formDataScategorie);
      this.crudApi.updateScategorie(this.formDataScategorie.id, this.formDataScategorie).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Scategorie Modifiée avec Succès");
        this.crudApi.getAllScategories().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/home/scategories']);
      });

    }

  }

  saveScategorie() {
    if (isNullOrUndefined(this.data.scatId)) {
      this.crudApi.createScategorie(this.addScategorieForm.value).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Scategorie Ajouté avec Succès");
        this.crudApi.getAllScategories().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/home/scategories']);
      });
    }
  }

  updateScategorie(addScategorieForm: NgForm) {
    if (!isNullOrUndefined(this.data.scatId)) {
      this.crudApi.updateScategorie(addScategorieForm.value.id, addScategorieForm.value).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Scategorie Ajouté avec Succès");
        this.crudApi.getAllScategories().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/home/scategories']);
      });
    }
  }


  saveScategories() {
    console.log(this.crudApi.dataForm.value);
  }

  updateScategories(){
    this.crudApi.updateScategorie(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Scategorie Modifier avec Succès");
      this.crudApi.filter('Register click');
      this.crudApi.getAllScategories().subscribe(
        response =>{this.crudApi.listData = response;}
      );
      this.router.navigate(['/home/scategories']);
    });
  }

}
