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

  constructor(public crudApi: FournisseurService ,public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
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
    this.crudApi.dataForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      raisonSociale: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      nomBank: ['', [Validators.required]],
      numeroCompte: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      fax: ['', [Validators.required]],
      email: ['', [Validators.required]],
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
      this.router.navigate(['/fournisseurs']);
    });
  }

  updateFournisseur(){
    this.crudApi.updateFournisseur(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Fournisseur Modifier avec Succès");
      this.crudApi.filter('Register click');
      this.getListFournisseurs();
      this.router.navigate(['/fournisseurs']);
    });
  }



}
