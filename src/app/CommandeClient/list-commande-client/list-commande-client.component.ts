import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CommandeClient } from 'src/app/models/commande-client';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { CommandeClientService } from 'src/app/services/commande-client.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { DataTableDirective } from 'angular-datatables';
import { DialogService } from 'src/app/services/dialog.service';
import { DatePipe } from '@angular/common';
import { LigneCmdClient } from 'src/app/models/ligne-cmd-client';
import { CreateCommandeClientComponent } from '../create-commande-client/create-commande-client.component';


@Component({
  selector: 'app-list-commande-client',
  templateUrl: './list-commande-client.component.html',
  styleUrls: ['./list-commande-client.component.scss']
})
export class ListCommandeClientComponent implements OnDestroy, OnInit {

  listData;
  client: Client;
  order: CommandeClient;
  orderItems: LigneCmdClient;

  private editForm: FormGroup;

  id: number ;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: CommandeClientService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private dialogService: DialogService,private datePipe : DatePipe,
    private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateCommandeClientComponent>
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
        this.crudApi.listData = response;
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
        this.crudApi.listData = response;
      });
  }

  onCreateCommandeClient() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("commandeclient");
  }

  editCommandeClient(item: CommandeClient) {
    this.crudApi.formData = this.fb.group(Object.assign({}, item));
    this.crudApi.choixmenu = "M"
    this.router.navigate(['/commandeclient']);
  }

  viewCommandeClient(item: CommandeClient) {
    this.router.navigateByUrl('commandeView/' + item.id);
  }
  deleteCommandeClient(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteCommande(id).subscribe(data => {
          this.toastr.warning('Commande supprimé avec succès!');
          this.rerender();
          this.getListCommandeClients();
          this.router.navigate(['/commandeclients']);
        });
      }
    });
  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd, h:mm:ss');
  }

  ImprimerFacture(){
    this.crudApi.generateReport(this.id).subscribe(
      (result) => {
        this.toastr.success("Commande are successfully exported")
        },(error) => {
          this.toastr.warning("Commande are not successfully exported")
        }
    );
  }  

}
