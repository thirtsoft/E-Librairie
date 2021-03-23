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

  constructor(public crudApi: CommandeClientService, public clientService: ClientService,
    public lcomService: LigneCmdClientService, private toastr :ToastrService,
    private datePipe : DatePipe, private router :Router,
    public dialog:MatDialog, public fb: FormBuilder,
    private route: ActivatedRoute, private matDialog: MatDialog,
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

    this.crudApi.generateNumCommande().subscribe(
      response =>{
        this.numero = response;
      }
    );
  }

  infoForm() {
    this.crudApi.formData = this.fb.group({
      id: null,
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
    this.dialog.open(CreateLigneCommandeComponent, dialogConfig).afterClosed().subscribe(res =>{
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
        this.router.navigate(['/home/listcommandes']);
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
