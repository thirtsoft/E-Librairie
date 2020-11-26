import { Component, OnInit, Inject } from '@angular/core';
import { Client } from 'src/app/models/client';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
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
import { CreanceService } from 'src/app/services/creance.service';
import { LigneCmdClientService } from 'src/app/services/ligne-cmd-client.service';

@Component({
  selector: 'app-create-commande-client',
  templateUrl: './create-commande-client.component.html',
  styleUrls: ['./create-commande-client.component.scss']
})
export class CreateCommandeClientComponent implements OnInit {

  public ClientList: Client[];
  date;
  //formData: FormGroup;
  public order = new CommandeClient();
  orders: CommandeClient[];

  isValid:boolean = true;
  articleService: any;
  compteur : any={};
  client: any={};
  annee  = 0;

  total = 0;
  refProd = '';


  isChecked = false;

  //formData: CommandeClient;
  orderItem: LigneCmdClient[];
  OrderId: number;

  defaultClient: Client;

  constructor(private crudApi: CommandeClientService, private dialog:MatDialog,
    public fb: FormBuilder, public clientService: ClientService, public creanceService: CreanceService,
    private lcomService: LigneCmdClientService, private datePipe : DatePipe,
    private toastr :ToastrService, private router :Router,
    private route: ActivatedRoute, private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  //  public dialogRef:MatDialogRef<CreateLigneCmdClientComponent>,
    ) { }

    get f() { return this.crudApi.formData.controls; }

  ngOnInit() {
    if (this.crudApi.choixmenu == "A") {
      this.infoForm();
      this.crudApi.list = [];
    //  this.date = this.transformDate(new this.date(Date.now()));
    }else {
      /*
      this.defaultClient = this.crudApi.formData.value.client;
      console.log(this.crudApi.formData.value.client); */
    /*  console.log(this.crudApi.formData.value.id);
      this.crudApi.getCommandeClientById(this.crudApi.formData.value.id).subscribe(res=> {
        this.crudApi.formData = this.fb.group(Object.assign({}, res));

      });*/
      this.lcomService.getAllByNumero(this.crudApi.formData.value.numeroCommande).subscribe(
        response=> {
          this.crudApi.list = response;
          let i;
          for (i=0; i<this.crudApi.list.length; i++) {
          //  console.log( this.crudApi.list);
            this.total = parseFloat((this.crudApi.list[i].quantite * this.crudApi.list[i].prix).toFixed(2));
            this.crudApi.list[i].total = this.total;
          //  console.log(this.total);
            this.crudApi.list[i].ItemName = this.crudApi.list[i].produit.reference;
            console.log(this.crudApi.list[i].ItemName);
          }
      }
      );
      this.f['dateCommande'].setValue(this.crudApi.formData.value.dateCommande);
     // this.f['total'].setValue(this.total);

     // this.f['total'].setValue(this.crudApi.formData.value.total);

    }

    this.clientService.getAllClients().subscribe(
      response =>{
        this.ClientList = response;
        console.log(response);
      });
  }
/*
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
*/
  infoForm() {
    this.crudApi.formData = this.fb.group({
      id: null,
      numeroCommande: Math.floor(100000 + Math.random() * 900000).toString(),
      total: [0, Validators.required],
    //  libArticle: '',
      totalCommande: [0, Validators.required],
      status: ['', Validators.required],
      refClient: ['', Validators.required],
    //  lib_client: '',
      dateCommande: [new Date(), Validators.required],
      client: [new Client(), Validators.required],
      DeletedOrderItemIDs: '',
      lcomms: [[], Validators.required],
    });
  }

  compareClient(client1: Client, client2: Client) : boolean {
    return client1 && client2 ? client1.id === client2.id : client1 === client2;

  }

  resetForm() {
    this.crudApi.formData.reset();
  }

  AddData(lcommandeIndex, OrderId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data={lcommandeIndex, OrderId};
    this.dialog.open(CreateLigneCmdClientComponent, dialogConfig).afterClosed().subscribe(res =>{
      this.calculMontantTotal();
    });

  }
/*
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

  AddOrEditOrderItem(lcommandeIndex, OrderId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
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
*/
  calculMontantTotal() {
    this.f['totalCommande'].setValue(this.crudApi.list.reduce((prev, curr) => {
      return prev + curr.total;
    }, 0));
    /*
    this.f['total'].setValue(this.crudApi.list.reduce((prev, curr) => {
      return prev + curr.total;
    }, 0));
*/


  }
  validateForm() {
    this.isValid = true;
    if (this.crudApi.formData.value.id_client==0)
      this.isValid = false
    else if (this.crudApi.list.length==0)
      this.isValid = false;
    return this.isValid;
  }

  onSubmit() {
    this.f['lcomms'].setValue(this.crudApi.list);
    console.log(this.crudApi.formData.value);
    this.crudApi.saveCommande(this.crudApi.formData.value).subscribe(
      data => {
        console.log(this.crudApi.formData.value);
        this.toastr.success('Commande Ajoutée avec succès');
        console.log(this.crudApi.formData.value);
        this.router.navigate(['/commandeclients']);
      });

  }

  OnSelectClient(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.f['lib_client'].setValue('');
      this.f['client '].setValue('');
    }else {
      this.f['lib_client'].setValue(this.ClientList[ctrl.selectedIndex-1].raisonSocial);
      this.f['client'].setValue(this.ClientList[ctrl.selectedIndex-1].id);
    //  this.f['refClient'].setValue(this.clientList[ctrl.selectedIndex-1].raisonSocial);

    }
  }
  /*
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
*/
  checked() {
    this.isChecked = true;
  }

 /*  onSubmit(){
    this.f['lcomms'].setValue(this.service.listData);
    this.service.createCommandeClient(this.service.dataForm.value).
      subscribe( data => {
        this.toastr.success( 'Validation Faite avec Success');
        this.router.navigate(['/commandeclients']);
      });

  } */
/*
  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.crudApi.createCommandeClient().subscribe(res => {
        this.resetForm();
        this.toastr.success('Commande Ajoutée avec succès');
        this.router.navigate(['/commandeclients']);
      })
    }

  }*/

  /* OnSelectClient(ctrl){
    if(ctrl.selectedIndex == 0){
      this.formData.get('lib_client').setValue('');
      this.formData.get('code_client').setValue('');
    } else {
      this.formData.get('lib_client').setValue(this.ClientList[ctrl.selectedIndex - 1].raisonSocial);
      this.formData.get('code_client').setValue(this.ClientList[ctrl.selectedIndex - 1].id);
    }
  }

  onDeleteOrderItem(orderItemID: number, i: number) {
    if (orderItemID != null)
      this.crudApi.formData.value.DeletedOrderItemIDs += orderItemID + ",";
    this.crudApi.orderItems.splice(i, 1);
    this.calculMontantTotal();
  }
  */

  onDeleteOrderItem(id: number, i: number) {
    if (id != null) {
      this.lcomService.deleteLigneCmdClient(id).subscribe(data => {
        this.toastr.warning('Détails Commande supprimé avec succès!');
      });
    }
    this.crudApi.list.splice(i, 1);
    this.calculMontantTotal();
  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
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


