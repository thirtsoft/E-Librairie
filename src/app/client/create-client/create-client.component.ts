import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {

  listData : Client[];

  constructor(public crudApi: ClientService,
              public fb: FormBuilder,
              public toastr: ToastrService,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<CreateClientComponent>,
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
      codeClient: ['', [Validators.required]],
      raisonSocial: ['', [Validators.required]],
      chefService: ['', [Validators.required, Validators.pattern(validatorString)]],
      adresse: ['', [Validators.required]],
      telephone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{9}$")]],
  //    email: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]

    });
  }

  getListClients() {
    this.crudApi.getAllClients().subscribe(
      response =>{this.listData = response;}
    );
  }

  ResetForm() {
      this.crudApi.dataForm.reset();
  }

  onSubmit() {
    if (this.crudApi.dataForm.valid) {
      if (this.crudApi.choixmenu == "A"){
        this.saveClient();
      }else{
        this.updateClient();
      }
    } else {
      return;
    }
  }

  saveClient() {
    this.crudApi.createClient(this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success("Client Ajouté avec Succès");
      //this.ResetForm();
      this.getListClients();
      this.router.navigate(['/home/clients']);
    //  this.router.navigate(['/clients']);
    },
    (error: HttpErrorResponse) => {
      this.toastr.error("Ce Client exist déjà, veuillez changez le code");
      }
    );
  }

  updateClient(){
    this.crudApi.updateClient(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Client Modifier avec Succès");
      this.crudApi.filter('Register click');
      this.getListClients();
      this.router.navigate(['/home/clients']);
    });
  }

}
