import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { Devis } from 'src/app/models/devis';
import { LigneDevis } from 'src/app/models/ligne-devis';
import { ClientService } from 'src/app/services/client.service';
import { DevisService } from 'src/app/services/devis.service';
import { LigneDevisService } from 'src/app/services/ligne-devis.service';
import { CreateLigneDevisComponent } from '../create-ligne-devis/create-ligne-devis.component';

@Component({
  selector: 'app-create-devis',
  templateUrl: './create-devis.component.html',
  styleUrls: ['./create-devis.component.scss']
})
export class CreateDevisComponent implements OnInit {

  public ClientList: Client[];
  date;
  order = new Devis();
  orders: Devis[];

  isValid:boolean = true;
  compteur : any={};
  annee  = 0;

  total = 0;

  isChecked = false;
  devisItem: LigneDevis[];
  OrderId: number;

  defaultClient: Client;

  numeroDevis;

  constructor(public crudApi: DevisService, public dialog:MatDialog,
    public fb: FormBuilder, public clientService: ClientService,
    public ldevService: LigneDevisService, private datePipe : DatePipe,
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
      this.ldevService.getAllByNumero(this.crudApi.formData.value.numeroDevis).subscribe(
        response=> {
          this.crudApi.list = response;
          let i;
          for (i=0; i<this.crudApi.list.length; i++) {
          //  console.log( this.crudApi.list);
            this.total = parseFloat((this.crudApi.list[i].quantite * this.crudApi.list[i].prixDevis).toFixed(2));
            this.crudApi.list[i].total = this.total;
          //  console.log(this.total);
            this.crudApi.list[i].ItemName = this.crudApi.list[i].produit.reference;
            console.log(this.crudApi.list[i].ItemName);
          }
        }
      );
      this.f['dateDevis'].setValue(this.crudApi.formData.value.dateDevis);
    }

    this.clientService.getAllClients().subscribe(
      response =>{
        this.ClientList = response;
        console.log(response);
      }
    );

    this.getNumeroDevis();

  }

  getNumeroDevis() {
    this.crudApi.generateNumeroDevis().subscribe(
      response =>{
        this.numeroDevis = response;
        console.log("Numero Devis:" + response);
      }
    );
  }

  infoForm() {
    this.crudApi.formData = this.fb.group({
      id: null,
    //  numeroDevis: Math.floor(100000 + Math.random() * 900000).toString(),
      numeroDevis: [0, Validators.required],
      total: [0, Validators.required],
      totalDevis: [0, Validators.required],
      status: ['', Validators.required],
      dateDevis: [new Date(), Validators.required],
      client: [new Client(), Validators.required],
      DeletedOrderItemIDs: '',
      ldevis: [[], Validators.required],
    });
  }
  compareClient(client1: Client, client2: Client) : boolean {
    return client1 && client2 ? client1.id === client2.id : client1 === client2;
  }

  resetForm() {
    this.crudApi.formData.reset();
  }

  AddData(ldevisIndex, OrderId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data={ldevisIndex, OrderId};
    this.dialog.open(CreateLigneDevisComponent, dialogConfig).afterClosed().subscribe(res =>{
      this.calculMontantTotal();
    });

  }
  calculMontantTotal() {
    this.f['totalDevis'].setValue(this.crudApi.list.reduce((prev, curr) => {
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
    this.f['ldevis'].setValue(this.crudApi.list);
    console.log(this.crudApi.formData.value);
    this.crudApi.createDevis(this.crudApi.formData.value).subscribe(
      data => {
        console.log(this.crudApi.formData.value);
        this.toastr.success('Devis Ajoutée avec succès');
        console.log(this.crudApi.formData.value);
        this.router.navigate(['/home/listdevis']);
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
      this.ldevService.deleteLigneDevis(id).subscribe(data => {
        this.toastr.warning('Détails Devis supprimé avec succès!');
      });
    }
    this.crudApi.list.splice(i, 1);
    this.calculMontantTotal();
  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

}
