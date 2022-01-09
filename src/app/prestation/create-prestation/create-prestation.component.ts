import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

import { PrestationService } from './../../services/prestation.service';
import { Prestation } from './../../models/prestation';

@Component({
  selector: 'app-create-prestation',
  templateUrl: './create-prestation.component.html',
  styleUrls: ['./create-prestation.component.scss']
})
export class CreatePrestationComponent implements OnInit {

  listData : Prestation[];

  constructor(public crudApi: PrestationService,
              public fb: FormBuilder,
              public toastr: ToastrService,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<CreatePrestationComponent>,
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
      designation: ['', [Validators.required]],
      montant: [0, [Validators.required]],
    });
  }

  getListPrestations() {
    this.crudApi.getAllPrestationsOrderDesc()
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
        this.savePrestation();
      }else{
        this.updatePrestation();
      }
    } else {
      return;
    }
  }

  savePrestation() {
    this.crudApi.createPrestation(this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success('avec succès','Prestation Ajouté', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.router.navigate(['/home/prestations']);
    },
    (error: HttpErrorResponse) => {
      this.toastr.error("Cette Prestation exist déjà, veuillez changez le code");
      }
    );
  }

  updatePrestation(){
    this.crudApi.updatePrestation(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.warning('avec succès','Prestation Modifié', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.crudApi.filter('Register click');
      this.router.navigate(['/home/prestations']);
    });
  }


}
