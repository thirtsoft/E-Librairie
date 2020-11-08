import { Component, OnInit, Inject } from '@angular/core';
import { Creance } from 'src/app/models/creance';
import { Client } from 'src/app/models/client';
import { CreanceService } from 'src/app/services/creance.service';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-create-creance',
  templateUrl: './create-creance.component.html',
  styleUrls: ['./create-creance.component.scss']
})
export class CreateCreanceComponent implements OnInit {
  creance = new Creance();
  formDataCreance = new Creance();

  listClients:  Client[]

  submitted = false;

  constructor(public crudApi: CreanceService, public clientService: ClientService ,
    public fb: FormBuilder, public toastr: ToastrService, private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<CreateCreanceComponent>,

  ) { }


  ngOnInit() {
    this.getClients();
    if (!isNullOrUndefined(this.data.creanceId)) {
      this.formDataCreance = Object.assign({},this.crudApi.listData[this.data.creanceId])
    }
  }

  getClients() {
    this.clientService.getAllClients().subscribe((response) => {
      this.listClients = response as Client[];});
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    if(isNullOrUndefined(this.data.creanceId)) {
      this.crudApi.createCreance(this.formDataCreance).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Creance Ajouté avec Succès");
        this.crudApi.getAllCreances().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/creances']);
      });

    }else {
      this.crudApi.updateCreance(this.formDataCreance.id, this.formDataCreance).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Creance Modifiée avec Succès");
        this.crudApi.getAllCreances().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/creances']);
      });
    }

  }

  /*
  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.saveCreance(this.creance);
    }else {
      this.updateCreance();
    }

  }*/

  saveCreance(cont: Creance) {
    this.crudApi.createCreance(cont).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success("Creance Ajouté avec Succès");
      this.crudApi.getAllCreances().subscribe(
        response =>{this.crudApi.listData = response;},

      );
      this.router.navigate(['/creances']);
    });
  }

  updateCreance(){
    this.crudApi.updateCreance(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Creance Modifier avec Succès");
      this.crudApi.getAllCreances().subscribe(
        response =>{this.crudApi.listData = response;}
      );
      this.router.navigate(['/creances']);
    });

  }


}
