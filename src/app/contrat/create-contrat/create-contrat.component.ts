import { Component, OnInit, Inject } from '@angular/core';
import { Contrat } from 'src/app/models/contrat';
import { Client } from 'src/app/models/client';
import { ContratService } from 'src/app/services/contrat.service';
import { ClientService } from 'src/app/services/client.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-create-contrat',
  templateUrl: './create-contrat.component.html',
  styleUrls: ['./create-contrat.component.scss']
})
export class CreateContratComponent implements OnInit {

  public contrat = new Contrat();

  public clients:  Client[]

  submitted = false;

  constructor(public crudApi: ContratService, public clientService: ClientService ,
    public fb: FormBuilder, public toastr: ToastrService, private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<CreateContratComponent>,

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
      this.saveContrat(this.contrat);
    }else {
      this.updateContrat();
    }

  }
  saveContrat(cont: Contrat) {
    this.crudApi.createContrat(cont).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Contrat Ajouté avec Succès");
      this.crudApi.getAllContrats().subscribe(
        response =>{this.crudApi.listData = response;},

      );
      this.router.navigate(['/contrats']);
    });
  }

  updateContrat(){
    this.crudApi.updateContrat(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Contrat Modifier avec Succès");
      this.crudApi.getAllContrats().subscribe(
        response =>{this.crudApi.listData = response;}
      );
      this.router.navigate(['/contrats']);
    });

  }


}
