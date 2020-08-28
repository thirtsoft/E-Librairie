import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {

  client: Client;

  listData : Client[];

  private editForm: FormGroup;

  constructor(public crudApi: ClientService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router
    ) { }


  ngOnInit() {
    this.getListClients();
  }

  getListClients() {
    this.crudApi.getAllClients().subscribe(
      response =>{this.listData = response;}
    );

  }

  onCreateClient(){
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("clients/new");
   /* const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%"; */
    //dialogConfig.data="gdddd";
   // this.matDialog.open(CreateClientComponent, dialogConfig);
  }
  deleteClient(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer ce Client ?')) {
    this.crudApi.deleteClient(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.success('Client supprimé avec succès!');
          this.getListClients();
      },
        error => console.log(error));
    }

  }
  editClient(item : Client) {

    this.router.navigateByUrl('clients/'+item.id);

  }

}
