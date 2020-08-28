import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/models/employe';
import { EmployeService } from 'src/app/services/employe.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employe',
  templateUrl: './create-employe.component.html',
  styleUrls: ['./create-employe.component.scss']
})
export class CreateEmployeComponent implements OnInit {

  listData : Employe[];

  constructor(public crudApi: EmployeService ,public fb: FormBuilder,
    public toastr: ToastrService, private router : Router
    ) { }



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
    if (this.crudApi.choixmenu == "A"){
      this.saveEmploye();
    }else{
      this.updateEmploye();
    }

  }
  saveEmploye() {
    this.crudApi.createEmploye(this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success("Employe Ajouté avec Succès");
     // this.dialogRef.close();
      //this.ResetForm();
      this.getListEmployes();
      this.router.navigate(['/employes']);
    });
  }
  updateEmploye(){
    this.crudApi.updateEmploye(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success("Employe Modifier avec Succès");
      this.crudApi.getAllEmployes().subscribe(
        response =>{this.crudApi.listData = response;}
       );
      this.router.navigate(['/employes']);
    });
  }


}
