import { Component, OnInit, Inject } from '@angular/core';
import { Versement } from 'src/app/models/versement';
import { Employe } from 'src/app/models/employe';
import { VersementService } from 'src/app/services/versement.service';
import { EmployeService } from 'src/app/services/employe.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-create-versement',
  templateUrl: './create-versement.component.html',
  styleUrls: ['./create-versement.component.scss']
})
export class CreateVersementComponent implements OnInit {

  formDataVersement = new Versement();
  listEmployes: Employe[];
  submitted = false;

  constructor(public crudApi: VersementService, public empService: EmployeService ,
    public fb: FormBuilder, public toastr: ToastrService, private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<CreateVersementComponent>,
  ) { }

  ngOnInit() {
    this.getEmployes();
    if (!isNullOrUndefined(this.data.verId)) {
      this.formDataVersement = Object.assign({},this.crudApi.listData[this.data.verId])
    }

  }

  getEmployes() {
    this.empService.getAllEmployes().subscribe((response) => {
      this.listEmployes = response as Employe[];});
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    if(isNullOrUndefined(this.data.verId)) {
      this.crudApi.createVersement(this.formDataVersement).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Versement Ajouté avec Succès");
        this.crudApi.getAllVersements().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/versements']);
      });

    }else {
      this.crudApi.updateVersement(this.formDataVersement.id, this.formDataVersement).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Versement Modifiée avec Succès");
        this.crudApi.getAllVersements().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/versements']);
      });
    }

  }
/*
  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.saveVersement(this.versement);
    }else {
      this.updateVersement();
    }
  }
  */

  saveVersement(versment: Versement) {
    this.crudApi.createVersement(versment).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success("Versement Ajouté avec Succès");
      this.router.navigate(['/versements']);
    });
  }

  updateVersement(){
    this.crudApi.updateVersement(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Versement Modifier avec Succès");
      this.crudApi.getAllVersements().subscribe(
        response =>{this.crudApi.listData = response;}
      );
      this.router.navigate(['/versements']);
    });

  }

}
