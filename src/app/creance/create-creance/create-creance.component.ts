import { Component, OnInit, Inject } from '@angular/core';
import { Creance } from 'src/app/models/creance';
import { Client } from 'src/app/models/client';
import { CreanceService } from 'src/app/services/creance.service';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-creance',
  templateUrl: './create-creance.component.html',
  styleUrls: ['./create-creance.component.scss']
})
export class CreateCreanceComponent implements OnInit {

  public creance = new Creance();

  public clients:  Client[]

  submitted = false;

  constructor(public crudApi: CreanceService, public clientService: ClientService ,
    public fb: FormBuilder, public toastr: ToastrService, private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<CreateCreanceComponent>,

  ) { }


  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){

     // this.infoForm()};
      this.clientService.getAllClients().subscribe(
        response =>{this.clients = response;}
      );

    }

 /*  infoForm() {
    let cat = new SousCategorie();
    this.crudApi.dataForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      libelle: ['', [Validators.required]],
      categories: ['', [Validators.required]],

    }); */


  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.saveCreance(this.creance);
    }else {
      this.updateCreance();
    }

  }
  saveCreance(cont: Creance) {
    this.crudApi.createCreance(cont).
    subscribe( data => {
      this.dialogRef.close();
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
