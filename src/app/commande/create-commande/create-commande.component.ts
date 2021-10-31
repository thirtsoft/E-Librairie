import { DashboardService } from 'src/app/services/dashboard.service';
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { CommandeClientService } from 'src/app/services/commande-client.service';
import { LigneCmdClientService } from 'src/app/services/ligne-cmd-client.service';
import { CreateLigneCommandeComponent } from '../create-ligne-commande/create-ligne-commande.component';

@Component({
  selector: 'app-create-commande',
  templateUrl: './create-commande.component.html',
  styleUrls: ['./create-commande.component.scss']
})
export class CreateCommandeComponent implements OnInit {

  ClientList: Client[];
  isValid:boolean = true;
  numero;

  total = 0;

  listDataReglement = ["ESPECES", "CHEQUE", "VIREMENT"];

  constructor(public crudApi: CommandeClientService,
              public clientService: ClientService,
              public lcomService: LigneCmdClientService,
              private dashboardService: DashboardService,
              private toastr :ToastrService,
              private datePipe : DatePipe,
              private router :Router,
              public dialog:MatDialog,
              public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
  //  public dialogRef:MatDialogRef<CreateLigneCmdClientComponent>,
  ) { }

  get f() { return this.crudApi.formData.controls; }

  ngOnInit() {
    if (this.crudApi.choixmenu == "A") {

      this.infoForm();
      this.crudApi.list = [];
    }else {
      this.lcomService.getAllByNumero(this.crudApi.formData.value.numeroCommande).subscribe(
        response=> {
          this.crudApi.list = response;
          let i;
          for (i=0; i<this.crudApi.list.length; i++) {
            this.total = parseFloat((this.crudApi.list[i].quantite * this.crudApi.list[i].prix).toFixed(2));
            this.crudApi.list[i].total = this.total;
            this.crudApi.list[i].ItemName = this.crudApi.list[i].produit.reference;
          }
        }
      );
      this.f['dateCommande'].setValue(this.crudApi.formData.value.dateCommande);
    }

    this.clientService.getAllClients().subscribe(
      response =>{
        this.ClientList = response;
      }
    );

    this.dashboardService.getUserId();


  }

  infoForm() {
    this.dashboardService.getNumeroCommande();
    this.crudApi.formData = this.fb.group({
      id: null,
      numeroCommande: this.dashboardService.generatedNumber,
      total: [0, Validators.required],
      totalCommande: [0, Validators.required],
      typeReglement: ['', Validators.required],
      montantReglement: [0, Validators.required],
      status: ['', Validators.required],
  //    refClient: ['', Validators.required],
      dateCommande: [new Date(), Validators.required],
      client: [new Client(), Validators.required],
 //     DeletedOrderItemIDs: '',
      lcomms: [[], Validators.required],
    });
  }

  compareClient(client1: Client, client2: Client) : boolean {
    return client1 && client2 ? client1.id === client2.id : client1 === client2;
  }

  compareVente() {}

  resetForm() {
    this.crudApi.formData.reset();
  }

  AddData(lcommandeIndex, OrderId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data={lcommandeIndex, OrderId};
    this.dialog.open(CreateLigneCommandeComponent, dialogConfig).afterClosed().subscribe(res =>{
      this.calculMontantTotal();
    });

  }

  calculMontantTotal() {
    this.f['totalCommande'].setValue(this.crudApi.list.reduce((prev, curr) => {
      return prev + curr.total;
    }, 0));
  }

 /*  validateForm() {
    this.isValid = true;
    if (this.crudApi.formData.value.id_client==0)
      this.isValid = false
    else if (this.crudApi.list.length==0)
      this.isValid = false;
    return this.isValid;
  }
 */
  validateForm() {
    this.isValid = false;
    if ((this.crudApi.formData.value.numeroCommande == 0) || (this.crudApi.formData.value.totalCommande == 0) ||
        (this.crudApi.formData.value.typeReglement == '') || (this.crudApi.formData.value.montantReglement == 0)
        || (this.crudApi.list == 0) || (this.ClientList == null))
      this.isValid = false;
    else
      this.isValid = true;
    return this.isValid;
  }


  onSubmit() {
    if (this.validateForm()) {
      this.f['lcomms'].setValue(this.crudApi.list);
      console.log(this.crudApi.formData.value);
      this.crudApi.saveCommande(this.crudApi.formData.value, this.dashboardService.id).subscribe(
        data => {
          console.log(this.crudApi.formData.value);
          this.toastr.success('Commande Ajoutée avec succès');
          this.toastr.success('avec succès','Commande Ajoutée', {
            timeOut: 1500,
            positionClass: 'toast-top-right',
          });

          console.log(this.crudApi.formData.value);
          this.router.navigate(['/home/listcommandes']);
        });

    }else {
      this.toastr.error('Veuillez remplir tous les champs','Données non valides', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });

    }

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
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

}
