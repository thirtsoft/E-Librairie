import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { CreateClientComponent } from '../create-client/create-client.component';
import { DataTableDirective } from 'angular-datatables';
import { DialogService } from 'src/app/services/dialog.service';
import { EnvoiEmailClientComponent } from '../envoi-email-client/envoi-email-client.component';
import { EnvoiSMSClientComponent } from '../envoi-smsclient/envoi-smsclient.component';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss'],
})
export class ListClientComponent implements OnDestroy, OnInit {

 // client: Client;
  client: Client;
  listData: Client[];
  clientID: number;

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  control: FormControl = new FormControl('');

  constructor(public crudApi: ClientService ,public fb: FormBuilder,
    public toastr: ToastrService, private dialogService: DialogService, private router : Router,
    private matDialog: MatDialog, private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateClientComponent>,
    ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListClients();
      })
  }

  ngOnInit() {
    /*
    this.clientID = this.route.snapshot.params.id;
    if (this.clientID == null) {
      this.resetForm();
    }else {
      this.crudApi.getClientByID(this.clientID).then(res => {
        this.listData = res.client;
      });
    }
*/
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };
    this.crudApi.getAllClients().subscribe(
      response =>{
        this.crudApi.listData = response;
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

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.crudApi.formData = {
      id: null,
      codeClient: '',
      raisonSocial: '',
      chefService: '',
      adresse: '',
      email: '',
      telephone:'',
      subject: '',
      message: ''
    };

  }

  getListClients() {
    this.crudApi.getAllClients().subscribe(
      response =>{this.crudApi.listData = response;}
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

  envoiEmail(item: Client) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(EnvoiEmailClientComponent, dialogConfig);
  }

  envoiSMS(item: Client) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(EnvoiSMSClientComponent, dialogConfig);
  }

/*
  deleteClient(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer ce Client ?')) {
    this.crudApi.deleteClient(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Client supprimé avec succès!');
          this.rerender();
          this.getListClients();
      },
        error => console.log(error));
    }

  }
  */

  deleteClient(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteClient(id).subscribe(data => {
          this.toastr.warning('Client supprimé avec succès!');
          this.rerender();
          this.getListClients();
        });
      }
    });
  }

  /* editClient(item : Client) {
    this.router.navigateByUrl('clients/'+item.id);

  } */

}
