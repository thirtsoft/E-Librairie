import { DashboardService } from 'src/app/services/dashboard.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Creance } from 'src/app/models/creance';
import { Client } from 'src/app/models/client';
import { CreanceService } from 'src/app/services/creance.service';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { LigneCreanceService } from 'src/app/services/ligne-creance.service';
import { DatePipe } from '@angular/common';
import { CreateLigneCreanceComponent } from '../create-ligne-creance/create-ligne-creance.component';

@Component({
  selector: 'app-create-creance',
  templateUrl: './create-creance.component.html',
  styleUrls: ['./create-creance.component.scss']
})
export class CreateCreanceComponent implements OnInit {
  creance = new Creance();
  formDataCreance = new Creance();

  date;
  ClientList: Client[];
  isValid:boolean = true;
  articleService: any;
  compteur : any={};
  client: any={};
  annee  = 0;

  total = 0;
  refProd = '';

  submitted = false;

  referenceCreance;

  listStatusCreances = ["ENCOURS", "PAYEE"];


  constructor(public crudApi: CreanceService,
              private dashboardService: DashboardService,
              public clientService: ClientService,
              public lcreanceService: LigneCreanceService,
              public toastr :ToastrService,
              public fb: FormBuilder,
              private datePipe : DatePipe,
              private router :Router,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  get f() { return this.crudApi.formData.controls; }

  ngOnInit() {
    this.getClients();
    if (this.crudApi.choixmenu == "A") {
      this.infoForm();
      this.crudApi.list = [];
    } else {
    }

    this.crudApi.generateReferenceCreance();

    this.dashboardService.getUserId();

  }

  getReferenceCreance() {
    this.crudApi.generateReferenceCreance().subscribe(
      response =>{
        this.referenceCreance = response;
        console.log("Reference Creance:" + response);
      }
    );
  }

  infoForm() {
    this.dashboardService.getNumeroCommande();
    this.crudApi.formData = this.fb.group({
      id: null,
      reference: this.dashboardService.generatedNumber,
      total: [0, Validators.required],
      libelle: ['', Validators.required],
      codeCreance: ['CREAN_' + Date.now() + (Math.random()*1000).toFixed(), [Validators.required]],
      soldeCreance: [0, Validators.required],
      avanceCreance: [0, Validators.required],
      nbreJours: [0, Validators.required],
      totalCreance: [0, Validators.required],
      status: ['', Validators.required],
      client: [new Client(), Validators.required],
      lcreances: [[], Validators.required],
    });
  }

  compareClient(client1: Client, client2: Client) : boolean {
    return client1 && client2 ? client1.id === client2.id : client1 === client2;
  }

  getClients() {
    this.clientService.getAllClients().subscribe((response) => {
      this.ClientList = response as Client[];});
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  AddData(lcreanceIndex, OrderId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data={lcreanceIndex, OrderId};
    this.matDialog.open(CreateLigneCreanceComponent, dialogConfig).afterClosed().subscribe(res =>{
      this.calculMontantTotal();
    });
  }

  calculMontantTotal() {
    this.f['totalCreance'].setValue(this.crudApi.list.reduce((prev, curr) => {
      return prev + curr.total;
    }, 0));
  }

/*   validateForm() {
    this.isValid = true;
    if (this.crudApi.formData.value.id_client==0)
      this.isValid = false
    else if (this.crudApi.list.length==0)
      this.isValid = false;
    return this.isValid;
  } */

  validateForm() {
    this.isValid = false;
    if ((this.crudApi.formData.value.reference == 0) || (this.crudApi.formData.value.totalCreance == 0)
      || (this.crudApi.formData.value.status == '') || (this.crudApi.formData.value.nbreJours == 0)
      || (this.crudApi.list == 0) || (this.ClientList == null))
      this.isValid = false;
    else
      this.isValid = true;
    return this.isValid;
  }


  onSubmit() {
    if (this.validateForm()) {
      this.f['lcreances'].setValue(this.crudApi.list);
      console.log(this.crudApi.formData.value);
      this.crudApi.createCreance(this.crudApi.formData.value, this.dashboardService.id)
        .subscribe(
          data => {
            console.log(this.crudApi.formData.value);
            this.toastr.success('avec succès','Creance Ajoutée', {
              timeOut: 1500,
              positionClass: 'toast-top-right',
            });
            this.router.navigate(['/home/creances']);
          }
        );

    }else {
      this.toastr.error('Veuillez remplir tous les champs','Données non valides', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });

    }

  }

  onDeleteOrderItem(id: number, i: number) {
    if (id != null) {
      this.lcreanceService.deleteLigneCreance(id).subscribe(data => {
        this.toastr.warning('Détails Creance supprimé avec succès!');
      });
    }
    this.crudApi.list.splice(i, 1);
    this.calculMontantTotal();
  }

  transformDate(date){
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

}
