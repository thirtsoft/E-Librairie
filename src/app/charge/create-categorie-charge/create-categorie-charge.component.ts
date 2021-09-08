import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { CategorieChargeService } from 'src/app/services/categorie-charge.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategorieCharge } from 'src/app/models/categorieCharge';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-categorie-charge',
  templateUrl: './create-categorie-charge.component.html',
  styleUrls: ['./create-categorie-charge.component.scss']
})
export class CreateCategorieChargeComponent implements OnInit {

  listData : CategorieCharge[];

  constructor(public crudApi: CategorieChargeService,
              public fb: FormBuilder,
              public toastr: ToastrService,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<CreateCategorieChargeComponent>,
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
      id: null,
      codeCategorieCharge: ['', [Validators.required]],
      nomCategorieCharge: ['', [Validators.required, Validators.pattern(validatorString)]],
    });
  }

  getListCategorieCharges() {
    this.crudApi.getAllCategorieCharges().subscribe(
      response =>{this.listData = response;}
    );
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    if (this.crudApi.dataForm.valid) {
      if (this.crudApi.choixmenu == "A"){
        this.saveCategorieCharge();
      }else{
        this.updateCategorieCharge();
      }
    } else {
      return;
    }

  }

  saveCategorieCharge() {
    this.crudApi.createCategorieCharge(this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success("CategorieCharge Ajouté avec Succès");
      this.getListCategorieCharges();
      this.router.navigate(['/home/categorieCharges']);
    },
    (error: HttpErrorResponse) => {
      this.toastr.error("Catégorie de charge exist déjà, veuillez changez de code");
      }
    );
  }

  updateCategorieCharge(){
    this.crudApi.updateCategorieCharge(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("CategorieCharge Modifier avec Succès");
      this.crudApi.filter('Register click');
      this.getListCategorieCharges();
      this.router.navigate(['/home/categorieCharges']);
    });
  }


}
