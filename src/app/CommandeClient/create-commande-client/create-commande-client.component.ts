import { Component, OnInit, Inject } from '@angular/core';
import { Client } from 'src/app/models/client';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { CommandeClientService } from 'src/app/services/commande-client.service';
import { ClientService } from 'src/app/services/client.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CreateLigneCmdClientComponent } from '../create-ligne-cmd-client/create-ligne-cmd-client.component';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { LigneCmdClient } from 'src/app/models/ligne-cmd-client';
import { CommandeClient } from 'src/app/models/commande-client';
import { EditLigneCmdClientComponent } from '../edit-ligne-cmd-client/edit-ligne-cmd-client.component';

@Component({
  selector: 'app-create-commande-client',
  templateUrl: './create-commande-client.component.html',
  styleUrls: ['./create-commande-client.component.scss']
})
export class CreateCommandeClientComponent implements OnInit {

  clientList: Client[];

  //formData: FormGroup;

  public order = new CommandeClient();

  orders: CommandeClient[];

  isValid:boolean = true;
  articleService: any;
  Date;
  compteur : any={};
  client: any;
  annee  = 0;

  constructor(private crudApi: CommandeClientService, private dialog:MatDialog,
    public fb: FormBuilder, public clientService: ClientService,
    private toastr :ToastrService, private router :Router,
    private currentRoute: ActivatedRoute, private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateLigneCmdClientComponent>,
    ) { }

  ngOnInit() {
    let OrderId = this.currentRoute.snapshot.paramMap.get('id');
    if (OrderId == null) {
      this.resetForm();
    }else {
      this.crudApi.getOrderByID(parseInt(OrderId)).then(res =>{
         this.orders = res.order;
        this.crudApi.orderItems = res.orderItems;
      });
    }

    this.clientService.getAllClients().subscribe(
      response =>{
        this.clientList = response;
        console.log(response);
      }
    );

  }

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.crudApi.formData = {
      id: null,
      numCommande: Math.floor(100000 + Math.random() * 900000).toString(),
      //CustomerId: 0,
      totalCommande: 0,
      status: '',
      dateCommande: new Date(),
      client: new Client(),
      DeletedOrderItemIDs: ''

    };

    this.crudApi.orderItems=[];

  }

  AddData(lcommandeIndex, OrderId){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={lcommandeIndex, OrderId};
    this.dialog.open(CreateLigneCmdClientComponent, dialogConfig).afterClosed().subscribe(res =>{
        this.calculMontantTotal();
    });

  }

  AddOrderItem(lcommandeIndex, OrderId){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={lcommandeIndex, OrderId};
    this.dialog.open(EditLigneCmdClientComponent, dialogConfig).afterClosed().subscribe(res =>{
        this.calculMontantTotal();
    });

  }

  calculMontantTotal() {
    this.crudApi.formData.totalCommande = this.crudApi.orderItems.reduce((prev, curr) => {
      return prev + curr.total ;
    }, 0);
    this.crudApi.formData.totalCommande = parseFloat(this.crudApi.formData.totalCommande.toFixed(2));

  }

  validateForm() {
    this.isValid = true;
    if (this.crudApi.formData.client.id==0)
      this.isValid = false;
    else if (this.crudApi.orderItems.length==0)
      this.isValid = false;
    return this.isValid;
  }

 /*  onSubmit(){
    this.f['lcomms'].setValue(this.service.listData);
    this.service.createCommandeClient(this.service.dataForm.value).
      subscribe( data => {
        this.toastr.success( 'Validation Faite avec Success');
        this.router.navigate(['/commandeclients']);
      });

  } */

  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.crudApi.createCommandeClient().subscribe(res => {
        this.resetForm();
        this.toastr.success('Commande Ajoutée avec succès');
        this.router.navigate(['/commandeclients']);
      })
    }
  }

  /* OnSelectClient(ctrl){
    if(ctrl.selectedIndex == 0){
      this.formData.get('lib_client').setValue('');
      this.formData.get('code_client').setValue('');
    } else {
      this.formData.get('lib_client').setValue(this.ClientList[ctrl.selectedIndex - 1].raisonSocial);
      this.formData.get('code_client').setValue(this.ClientList[ctrl.selectedIndex - 1].id);
    }
  } */

  onDeleteOrderItem(orderItemID: number, i: number) {
    if (orderItemID != null)
      this.crudApi.formData.DeletedOrderItemIDs += orderItemID + ",";
    this.crudApi.orderItems.splice(i, 1);
    this.calculMontantTotal();
  }


}


/*   ClientList: Client[];

  formData: FormGroup;

  isValid:boolean = true;
  articleService: any;
  Date;
  compteur : any={};
  client   : any= {};
  annee  = 0;

  constructor(public service: CommandeClientService, private dialog:MatDialog,
    public fb: FormBuilder, public clientService :ClientService,
    private toastr :ToastrService, private router :Router,
    private currentRoute: ActivatedRoute, private datePipe : DatePipe,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateLigneCmdClientComponent>,
    ) { }

  get f() { return this.service.formData.controls }

  ngOnInit() {
    if (this.service.choixmenu == "A"){
      this.InfoForm();
      this.service.listData = [];
      this.Date = this.transformDate(new Date(Date.now()));
      this.annee = (this.Date).toString().substring(0,4);
     // this.f['annee'].setValue(this.annee);
    } else {

    }

    this.clientService.getAllClients().subscribe(
      response =>{this.ClientList = response;}
    );

  }

  InfoForm() {
    this.service.formData = this.fb.group({
      id :null,
      numCommande : 0,
      totalCommande : 0,
      status : '',
      code_client : 0,
      lib_client : '',
      totht : 0,
      tottva : 0,
      totttc : 0,
      dateCommande : '',
      lcomms :[],

    });

  }


  AddData(lcommandeIndex,Id){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={lcommandeIndex,Id};
    this.dialog.open(CreateLigneCmdClientComponent, dialogConfig).afterClosed().subscribe(b10=>{
        this.calcul();
    });

  }

  calcul() {
    this.f['totht'].setValue(this.service.listData.reduce((prev, curr) => {
      return prev + curr.totalCommande;
    }, 0));
    this.f['tottva'].setValue(this.service.listData.reduce((prev, curr) => {
      return prev + curr.totalCommande;
    }, 0));
    this.f['totttc'].setValue(this.service.listData.reduce((prev, curr) => {
      return prev + curr.totalCommande;
    }, 0));


  }
  validateForm(){
    this.isValid = true ;

    if(this.service.dataForm.value.id == 0) {
      this.isValid =false;
    } else if (this.service.listData.length == 0) {
      this.isValid =false;
    }
    return this.isValid;
  }

  onSubmit(){
    this.f['lcomms'].setValue(this.service.listData);
    this.service.createCommandeClient(this.service.dataForm.value).
      subscribe( data => {
        this.toastr.success( 'Validation Faite avec Success');
        this.router.navigate(['/commandeclients']);
      });

  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  OnSelectClient(ctrl){
    if(ctrl.selectedIndex == 0){
      this.formData.get('lib_client').setValue('');
      this.formData.get('code_client').setValue('');
    } else {
      this.formData.get('lib_client').setValue(this.ClientList[ctrl.selectedIndex - 1].raisonSocial);
      this.formData.get('code_client').setValue(this.ClientList[ctrl.selectedIndex - 1].id);
    }
  }

  onDelete(item: LigneCmdClient, Id: number, i: number) {
    if (Id != null) {
      this.service.formData.value.id+=Id;
      this.service.list.splice(i, 1);
      this.calcul();
    }

  } */


