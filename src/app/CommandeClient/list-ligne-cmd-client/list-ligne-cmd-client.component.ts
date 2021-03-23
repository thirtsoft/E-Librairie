import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { LigneCmdClient } from 'src/app/models/ligne-cmd-client';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LigneCmdClientService } from 'src/app/services/ligne-cmd-client.service';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CommandeClient } from 'src/app/models/commande-client';
import { Article } from 'src/app/models/article';
import { DataTableDirective } from 'angular-datatables';
import { CommandeClientService } from 'src/app/services/commande-client.service';
import { CreateCommandeClientComponent } from '../create-commande-client/create-commande-client.component';
import { DialogService } from 'src/app/services/dialog.service';


@Component({
  selector: 'app-list-ligne-cmd-client',
  templateUrl: './list-ligne-cmd-client.component.html',
  styleUrls: ['./list-ligne-cmd-client.component.scss']
})
export class ListLigneCmdClientComponent implements OnDestroy, OnInit {

  listData: LigneCmdClient[] = [];

  commande: CommandeClient = new CommandeClient();
  produit: Article = new Article();

  produit1;
  commande1;

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: LigneCmdClientService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog, public comService: CommandeClientService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialogService: DialogService,
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

    this.crudApi.getAllLigneCmdClients().subscribe(
      response =>{
        this.listData = response;
        console.log(response);
        this.dtTrigger.next();
      }
    );

    this.commande1 = new CommandeClient();
    this.produit = new Article();
    console.log(this.produit.designation);
   console.log(this.comService.orderItems);
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

  getListLigneCmdClients() {
    this.crudApi.getAllLigneCmdClients().subscribe(
      response =>{this.listData = response;
      }
    );
  }

  onCreateLigneCmdClient() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("commandeclient");
  }
  deleteLigneCmdClient(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteLigneCmdClient(id).subscribe(data => {
          this.toastr.warning('Détails Commande supprimé avec succès!');
          this.rerender();
          this.getListLigneCmdClients();
        });
      }
    });
  }

}
