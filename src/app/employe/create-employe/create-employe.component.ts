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
    const validatorString = '^[a-zA-Z,.!?\\s-]*$';
    this.crudApi.dataForm = this.fb.group({
      id: null,
      prenom: ['', [Validators.required, Validators.pattern(validatorString)]],
      nom: ['', [Validators.required, Validators.pattern(validatorString)]],
      cni: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      telephone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{9}$")]],
      telephone2: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{9}$")]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
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
      this.router.navigate(['/home/employes']);
    });
  }

  updateEmploye(){
    this.crudApi.updateEmploye(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Employe Modifier avec Succès");
      this.crudApi.filter('Register click');
      this.getListEmployes();
      this.router.navigate(['/home/employes']);
    });
  }


}
