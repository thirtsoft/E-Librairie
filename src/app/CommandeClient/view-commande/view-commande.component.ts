import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { CommandeClient } from 'src/app/models/commande-client';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CommandeClientService } from 'src/app/services/commande-client.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CreateCommandeClientComponent } from '../create-commande-client/create-commande-client.component';
import { Client } from 'src/app/models/client';
import { LigneCmdClientService } from 'src/app/services/ligne-cmd-client.service';
import { LigneCmdClient } from 'src/app/models/ligne-cmd-client';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-view-commande',
  templateUrl: './view-commande.component.html',
  styleUrls: ['./view-commande.component.scss']
})
export class ViewCommandeComponent implements OnDestroy, OnInit {

  listData: CommandeClient[];
  listDatalcmd: LigneCmdClient[];
  cmdClient: CommandeClient;
  currentCmdClient;

  client;

  comId: number;
  currentCommande;

  produit: Article = new Article();

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: CommandeClientService,public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog, private lcmdService: LigneCmdClientService,
    @Inject(MAT_DIALOG_DATA) public data: any, private route: ActivatedRoute,
    public dialogRef:MatDialogRef<CreateCommandeClientComponent>,
    ) { }

  ngOnInit(): void {
    this.comId = this.route.snapshot.params.id;
    console.log(this.comId);
    this.lcmdService.getAllLigneCmdClientByCommande(this.comId).subscribe(data => {
      this.currentCommande = data;
      console.log(this.currentCommande);
     // this.dtTrigger.next();
    }, err => {
      console.log(err);
    })

    this.cmdClient = new CommandeClient();
    this.cmdClient = {
      id: null,
      numCommande: '',
      totalCommande: 0,
      status: '',
      dateCommande: new Date(),
      DeletedOrderItemIDs: '',
      client: new Client()
    }
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

  onGoBack() {
    this.router.navigateByUrl('commandeclients');
  }

}
