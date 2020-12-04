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

  //listClients:  Client[];


  submitted = false;

  constructor(private crudApi: CreanceService, private dialog:MatDialog,
    public fb: FormBuilder, public clientService: ClientService,
    private lcreanceService: LigneCreanceService, private datePipe : DatePipe,
    private toastr :ToastrService, private router :Router,
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
    /*
    this.getClients();
    if (!isNullOrUndefined(this.data.creanceId)) {
      this.formDataCreance = Object.assign({},this.crudApi.listData[this.data.creanceId])
    }*/
  }

  infoForm() {
    this.crudApi.formData = this.fb.group({
      id: null,
      reference: Math.floor(100000 + Math.random() * 900000).toString(),
      total: [0, Validators.required],
      libelle: ['', Validators.required],
      soldeCreance: [0, Validators.required],
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
  validateForm() {
    this.isValid = true;
    if (this.crudApi.formData.value.id_client==0)
      this.isValid = false
    else if (this.crudApi.list.length==0)
      this.isValid = false;
    return this.isValid;
  }

  onSubmit() {
    this.f['lcreances'].setValue(this.crudApi.list);
    console.log(this.crudApi.formData.value);
    this.crudApi.createCreance(this.crudApi.formData.value).subscribe(
      data => {
        console.log(this.crudApi.formData.value);
        this.toastr.success('Creance Ajoutée avec succès');
        console.log(this.crudApi.formData.value);
        this.router.navigate(['/creances']);
      });
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
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

}

/*
  onSubmit() {
    if(isNullOrUndefined(this.data.creanceId)) {
      this.crudApi.createCreance(this.formDataCreance).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Creance Ajouté avec Succès");
        this.crudApi.getAllCreances().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/creances']);
      });

    }else {
      this.crudApi.updateCreance(this.formDataCreance.id, this.formDataCreance).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Creance Modifiée avec Succès");
        this.crudApi.getAllCreances().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/creances']);
      });
    }

  }
*/
  /*
  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.saveCreance(this.creance);
    }else {
      this.updateCreance();
    }

  }*/
/*
  saveCreance(cont: Creance) {
    this.crudApi.createCreance(cont).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success("Creance Ajouté avec Succès");
      this.crudApi.getAllCreances().subscribe(
        response =>{this.crudApi.listData = response;},

      );
      this.router.navigate(['/creances']);
    });
  }

  updateCreance(){
    this.crudApi.updateCreance(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Creance Modifier avec Succès");
      this.crudApi.getAllCreances().subscribe(
        response =>{this.crudApi.listData = response;}
      );
      this.router.navigate(['/creances']);
    });

  }


}
*/
