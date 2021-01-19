import { Component, OnInit, Inject } from '@angular/core';
import { Employe } from 'src/app/models/employe';
import { EmployeService } from 'src/app/services/employe.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-employe',
  templateUrl: './create-employe.component.html',
  styleUrls: ['./create-employe.component.scss']
})
export class CreateEmployeComponent implements OnInit {

  listData : Employe[];

  constructor(public crudApi: EmployeService ,public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<CreateEmployeComponent>,
    ) {}

  get f() { return this.crudApi.dataForm.controls; }

  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){
      this.infoForm()
    };
  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      prenom: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      cni: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      telephone2: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

  getListEmployes() {
    this.crudApi.getAllEmployes().subscribe(
      response =>{this.listData = response;}
    );
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.crudApi.dataForm.valid) {
      if (this.crudApi.choixmenu == "A"){
        this.saveEmploye();
      }else{
        this.updateEmploye();
      }
    } else {
      return;
    }
  }

  saveEmploye() {
    this.crudApi.createEmploye(this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success("Employe Ajouté avec Succès");
      this.getListEmployes();
      this.router.navigate(['/employes']);
    });
  }

  updateEmploye(){
    this.crudApi.updateEmploye(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Employe Modifier avec Succès");
      this.crudApi.filter('Register click');
      this.getListEmployes();
      this.router.navigate(['/employes']);
    });
  }


}
