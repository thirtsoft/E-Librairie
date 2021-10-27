import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Utilisateur } from 'src/app/models/utilisateur';

import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-create-utilisateur',
  templateUrl: './create-utilisateur.component.html',
  styleUrls: ['./create-utilisateur.component.scss']
})
export class CreateUtilisateurComponent implements OnInit {

  formDataUtilisateur = new Utilisateur();
  addUtilisateurForm: NgForm;

  genderList: ["Male", "Female"];

  submitted = false;

  constructor(public crudApi: UtilisateurService,
              public toastr: ToastrService,
              public fb: FormBuilder,
              private datePipe : DatePipe,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<CreateUtilisateurComponent>,
  ) { }

  ngOnInit() {

    if (!isNullOrUndefined(this.data.id)) {
      this.formDataUtilisateur = Object.assign({},this.crudApi.listData[this.data.id])
      console.log(this.formDataUtilisateur);
    }
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    if (!isNullOrUndefined(this.data.id)) {
      console.log(this.formDataUtilisateur);
      this.crudApi.updateUtilisateur(this.formDataUtilisateur.id,this.formDataUtilisateur).
      subscribe( data => {
        this.dialogRef.close();
        console.log(this.formDataUtilisateur)
        this.toastr.success("Article Ajouté avec Succès");
        this.router.navigateByUrl("home/utilisateurs").then(() => {
          window.location.reload();
        });
      },
        (error: HttpErrorResponse) => {
        this.toastr.error("Ce Utilisateur n'existe pas");
        }
      );

    }else {
      alert("Ce Utilisateur n'existe pas");

    }

  }


}
