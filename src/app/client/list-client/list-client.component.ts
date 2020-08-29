import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { CreateClientComponent } from '../create-client/create-client.component';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnDestroy, OnInit {

  client: Client;

  listData : Client[];

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  control: FormControl = new FormControl('');

  constructor(public crudApi: ClientService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateClientComponent>,
    ) { }


  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.crudApi.getAllClients().subscribe(
      response =>{
        this.listData = response;
        this.dtTrigger.next();
      }
    );
    //this.getListClients();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getListClients() {
    this.crudApi.getAllClients().subscribe(
      response =>{this.listData = response;}
    );

  }

  onCreateClient(){
    this.crudApi.choixmenu = "A";
   // this.router.navigateByUrl("clients/new");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(CreateClientComponent, dialogConfig);
  }

  editClient(item : Client) {

    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";

    this.matDialog.open(CreateClientComponent, dialogConfig);

  }


  deleteClient(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer ce Client ?')) {
    this.crudApi.deleteClient(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Client supprimé avec succès!');
          this.getListClients();
      },
        error => console.log(error));
    }

  }

  /* editClient(item : Client) {
    this.router.navigateByUrl('clients/'+item.id);

  } */

}
