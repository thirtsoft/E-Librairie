import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CommandeClient } from 'src/app/models/commande-client';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { CommandeClientService } from 'src/app/services/commande-client.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CreateCommandeClientComponent } from '../create-commande-client/create-commande-client.component';
import { Client } from 'src/app/models/client';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-list-commande-client',
  templateUrl: './list-commande-client.component.html',
  styleUrls: ['./list-commande-client.component.scss']
})
export class ListCommandeClientComponent implements OnDestroy, OnInit {

  listData: CommandeClient[];

  client;

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: CommandeClientService,public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateCommandeClientComponent>,
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.crudApi.getAllCommandeClients().subscribe(
      response =>{
        this.listData = response;
        console.log(this.listData);
        this.dtTrigger.next();
      }
    );

    this.client = new Client();
    console.log(this.client);
  }

  /**
   * methode pour recharger automatique le Datatable
   */
  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first in the current context
      dtInstance.destroy();
      // call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getListCommandeClients() {
    this.crudApi.getAllCommandeClients().subscribe(
      response =>{
        this.listData = response;

      });

  }

  onCreateCommandeClient() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("commandeclient");
  }

  deleteCommandeClient(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cette Commande ?')) {
    this.crudApi.deleteCommandeClient(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Commande supprimé avec succès!');
          this.rerender();
          this.getListCommandeClients();
      },
        error => console.log(error));
    }

  }

  editerCommandeClient(item : CommandeClient) {

    this.router.navigateByUrl('commandeclient/'+item.id);

  }

  /* editClient(item : Client) {
    this.router.navigateByUrl('clients/'+item.id);

  } */

  viewCommandeClient(item: CommandeClient) {
    this.router.navigateByUrl('commandeView/' + item.id);

  }


}
