import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Fournisseur } from 'src/app/models/fournisseur';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-fournisseur',
  templateUrl: './create-fournisseur.component.html',
  styleUrls: ['./create-fournisseur.component.scss']
})
export class CreateFournisseurComponent implements OnInit {

  listData : Fournisseur[];

  constructor(public crudApi: FournisseurService,
              public fb: FormBuilder,
              public toastr: ToastrService,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<CreateFournisseurComponent>,
  ) { }

  get f() { return this.crudApi.dataForm.controls; }

  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){
      this.infoForm();
    };
  }

  infoForm() {
    const validatorString = '^[a-zA-Z,.!?\\s-]*$';
    this.crudApi.dataForm = this.fb.group({
      id: null,
      code: ['FOUR_' + Date.now() + (Math.random()*1000).toFixed(), [Validators.required]],
      raisonSociale: ['', [Validators.required]],
      adresse: '',
      telephone: '',
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{9}$")]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    });
  }

  getListFournisseurs() {
    this.crudApi.getAllFournisseursOrderDesc()
      .subscribe(
        response =>{
          this.listData = response;
        }
      );
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    if (this.crudApi.dataForm.valid) {
      if (this.crudApi.choixmenu == "A"){
        this.saveFournisseur();
      }else{
        this.updateFournisseur();
      }
    } else {
      return;
    }
  }

  saveFournisseur() {
    this.crudApi.createFournisseur(this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success('avec succès','Fournisseur Ajouté', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.router.navigate(['/home/fournisseurs']);
    },
    (error: HttpErrorResponse) => {
      this.toastr.error("Champs vides, veuillez remplir tous les champs");
      }
    );
  }

  updateFournisseur(){
    this.crudApi.updateFournisseur(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.warning('avec succès','Fournisseur Modifié', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.crudApi.filter('Register click');
      this.router.navigate(['/home/fournisseurs']);
    });
  }

}
