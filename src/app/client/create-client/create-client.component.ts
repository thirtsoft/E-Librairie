import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {

  listData : Client[];

  constructor(public crudApi: ClientService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router
    ) { }



  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){
      this.infoForm()
    };

  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      raisonSocial: ['', [Validators.required]],
      chefService: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      email: ['', [Validators.required]],
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
    if (this.crudApi.choixmenu == "A"){
      this.saveClient();
    }else{
      this.updateClient();
    }

  }
  saveClient() {
    this.crudApi.createClient(this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success("Client Ajouté avec Succès");
     // this.dialogRef.close();
      //this.ResetForm();
      this.getListClients();
      this.router.navigate(['/clients']);
    });
  }
  updateClient(){
    this.crudApi.updateClient(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success("Client Modifier avec Succès");
      this.crudApi.getAllClients().subscribe(
        response =>{this.crudApi.listData = response;}
       );
      this.router.navigate(['/clients']);
    });
  }

}
