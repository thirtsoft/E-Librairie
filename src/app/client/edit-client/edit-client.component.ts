import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

 // public fournisseurs;

  client: Client;

  clients: Client[];

  private editForm: FormGroup;

  currentClient: any;
  public idClient: number;

  constructor(public crudApi: ClientService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router, private route: ActivatedRoute
    ) { }


  ngOnInit() {
    this.idClient = this.route.snapshot.params.id;
    console.log(this.idClient);
    this.crudApi.getClientById(this.idClient)
      .subscribe(data => {
        this.currentClient = data;
      },err=> {
        console.log(err);
      });
   /*  this.editForm = this.fb.group({
      id: [''],
      raisonSocial: [''],
      chefService: [''],
      adresse: [''],
      telephone: [''],
      email: ['']
    }); */

  }

  updateClient(client: Client){
    this.crudApi.updateClient(this.idClient,client).
    subscribe( data => {
      this.toastr.success("Client Modifier avec Succès");
      this.crudApi.getAllClients().subscribe(
        response =>{this.crudApi.listData = response;}
      );
      this.router.navigateByUrl('clients');
    });
  }

  onSubmit() {
    this.crudApi.updateClient(this.editForm.value.id, this.crudApi.dataForm.value).
    subscribe(data => {
      this.toastr.success("Client Modifier avec succes");
      this.crudApi.getAllClients().subscribe(
        response => {this.crudApi.listData = response;
        }
      );
      this.router.navigateByUrl("clients");
    });
  }

  GowBackToFournisseur() {
    this.router.navigateByUrl('clients');
  }

}
