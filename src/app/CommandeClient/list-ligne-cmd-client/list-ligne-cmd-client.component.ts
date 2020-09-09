import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { LigneCmdClient } from 'src/app/models/ligne-cmd-client';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LigneCmdClientService } from 'src/app/services/ligne-cmd-client.service';
import { CreateLigneCmdClientComponent } from '../create-ligne-cmd-client/create-ligne-cmd-client.component';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-list-ligne-cmd-client',
  templateUrl: './list-ligne-cmd-client.component.html',
  styleUrls: ['./list-ligne-cmd-client.component.scss']
})
export class ListLigneCmdClientComponent implements OnDestroy, OnInit {

  listData : LigneCmdClient[];

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  constructor(public crudApi: LigneCmdClientService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateLigneCmdClientComponent>,
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.crudApi.getAllLigneCmdClients().subscribe(
      response =>{
        this.listData = response;
        this.dtTrigger.next();
      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getListLigneCmdClients() {
    this.crudApi.getAllLigneCmdClients().subscribe(
      response =>{this.listData = response;

      });

  }

  onCreateLigneCmdClient() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("commandeclient");
  }

  deleteLigneCmdClient(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer ce Détails Commande ?')) {
    this.crudApi.deleteLigneCmdClient(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Détails Commande supprimé avec succès!');
          this.getListLigneCmdClients();
      },
        error => console.log(error));
    }

  }

  editerLigneCmdClient(item : LigneCmdClient) {

    this.router.navigateByUrl('lcommandeclient/'+item.id);

  }

}
