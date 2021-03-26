import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LigneCmdClient } from 'src/app/models/ligne-cmd-client';
import { CommandeClientService } from 'src/app/services/commande-client.service';
import { DialogService } from 'src/app/services/dialog.service';
import { LigneCmdClientService } from 'src/app/services/ligne-cmd-client.service';
import { CreateCommandeComponent } from '../create-commande/create-commande.component';

@Component({
  selector: 'app-list-ligne-commande',
  templateUrl: './list-ligne-commande.component.html',
  styleUrls: ['./list-ligne-commande.component.scss']
})
export class ListLigneCommandeComponent implements OnInit {

  listData: LigneCmdClient[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: LigneCmdClientService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog, public comService: CommandeClientService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialogService: DialogService,
    public dialogRef:MatDialogRef<CreateCommandeComponent>,
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
    this.router.navigateByUrl("home/commande");
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
