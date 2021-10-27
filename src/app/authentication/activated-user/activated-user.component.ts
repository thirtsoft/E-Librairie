import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Utilisateur } from 'src/app/models/utilisateur';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-activated-user',
  templateUrl: './activated-user.component.html',
  styleUrls: ['./activated-user.component.scss']
})
export class ActivatedUserComponent implements OnInit {

  listData : Utilisateur[];

  constructor(public crudApi: AuthService,
              private userService: UtilisateurService,
              public toastr: ToastrService,
              public fb: FormBuilder,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<ActivatedUserComponent>,
  ) { }

  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){
      this.infoForm()
    };
  }

  infoForm() {
    this.crudApi.formData = this.fb.group({
      id: null,
      active: ['', [Validators.required]],
    });
  }

  getListUtilisateur() {
    this.userService.getAllUtilisateurOrderDesc()
    .subscribe(
      response =>{
        this.listData = response;
      }
    );
  }

  ResetForm() {
    this.crudApi.formData.reset();
  }

  onSubmit() {
    console.log(this.crudApi.formData.value);
    console.log(this.crudApi.formData.value.active);
    this.crudApi.activatedUser(this.crudApi.formData.value.id,this.crudApi.formData.value.active)
    .subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Utilisateur Activé avec Succès");
      this.crudApi.filter('Register click');
      this.router.navigateByUrl("home/utilisateurs").then(() => {
        window.location.reload();
      });
   
    });
  }

}
