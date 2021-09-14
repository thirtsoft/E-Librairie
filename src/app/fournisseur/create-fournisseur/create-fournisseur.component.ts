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
      this.infoForm()
    };
  }

  infoForm() {
    const validatorString = '^[a-zA-Z,.!?\\s-]*$';
    this.crudApi.dataForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      raisonSociale: ['', [Validators.required, Validators.pattern(validatorString)]],
      prenom: ['', [Validators.required, Validators.pattern(validatorString)]],
      nom: ['', [Validators.required, Validators.pattern(validatorString)]],
      nomBank: ['', [Validators.required]],
      numeroCompte: ['', [Validators.required]],
      adresse: ['', [Validators.required, Validators.pattern(validatorString)]],
      telephone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{9}$")]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{9}$")]],
      fax: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    });

  }

  getListFournisseurs() {
    this.crudApi.getAllFournisseurs().subscribe(
      response =>{this.listData = response;}
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
    }else {
      return;
    }

  }

  saveFournisseur() {
    this.crudApi.createFournisseur(this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success("Fournisseur Ajouté avec Succès");
      this.getListFournisseurs();
      this.router.navigate(['/home/fournisseurs']);
    },
      (error: HttpErrorResponse) => {
      this.toastr.error("Ce Fournisseur exist déjà, veuillez changez le code");
      }
    );
  }

  updateFournisseur(){
    this.crudApi.updateFournisseur(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Fournisseur Modifier avec Succès");
      this.crudApi.filter('Register click');
      this.getListFournisseurs();
      this.router.navigate(['/home/fournisseurs']);
    });
  }



}
