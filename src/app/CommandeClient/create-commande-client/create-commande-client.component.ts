import { Component, OnInit, Inject } from '@angular/core';
import { Client } from 'src/app/models/client';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { CommandeClientService } from 'src/app/services/commande-client.service';
import { ClientService } from 'src/app/services/client.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LigneCmdClient } from 'src/app/models/ligne-cmd-client';
import { CommandeClient } from 'src/app/models/commande-client';
import { CreanceService } from 'src/app/services/creance.service';
import { LigneCmdClientService } from 'src/app/services/ligne-cmd-client.service';
import { CreateLigneCommandeClientComponent } from '../create-ligne-commande-client/create-ligne-commande-client.component';

@Component({
  selector: 'app-create-commande-client',
  templateUrl: './create-commande-client.component.html',
  styleUrls: ['./create-commande-client.component.scss']
})
export class CreateCommandeClientComponent implements OnInit {

  public ClientList: Client[];
  date;
  public order = new CommandeClient();
  orders: CommandeClient[];

  isValid:boolean = true;
  articleService: any;
  compteur : any={};
  client: any={};
  annee  = 0;

  numCommande;
  numero;

  total = 0;
  refProd = '';

  isChecked = false;
  orderItem: LigneCmdClient[];
  OrderId: number;

  defaultClient: Client;

  compt = 1;

  constructor(public crudApi: CommandeClientService, public dialog:MatDialog,
    public fb: FormBuilder, public clientService: ClientService, public creanceService: CreanceService,
    public lcomService: LigneCmdClientService, private datePipe : DatePipe,
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
    }

    this.clientService.getAllClients().subscribe(
      response =>{
        this.ClientList = response;
        console.log(response);
      }
    );
    this.crudApi.generateNumCommande().subscribe(
      response =>{
        this.numero = response;
        console.log("NumCommande:" + response);
      }
    );
  }
/*
  getNumCommande() {
    this.crudApi.generateNumCommande().subscribe(
      response =>{
        this.numero = response;
        console.log("NumCommande:" + response);
      }
    );
  }
*/

  infoForm() {
    this.crudApi.formData = this.fb.group({
      id: null,
    //  numeroCommande: Math.floor(100000 + Math.random() * 900000).toString(),
      numeroCommande: this.crudApi.numero,
      total: [0, Validators.required],
      totalCommande: [0, Validators.required],
      status: ['', Validators.required],
      refClient: ['', Validators.required],
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
    this.dialog.open(CreateLigneCommandeClientComponent, dialogConfig).afterClosed().subscribe(res =>{
      this.calculMontantTotal();
    });

  }
  calculMontantTotal() {
    this.f['totalCommande'].setValue(this.crudApi.list.reduce((prev, curr) => {
      return prev + curr.total;
    }, 0));
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
        this.router.navigate(['/home/commandeclients']);
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

  checked() {
    this.isChecked = true;
  }

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


