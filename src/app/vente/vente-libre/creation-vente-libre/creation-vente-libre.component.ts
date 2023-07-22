import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Vente } from 'src/app/models/vente';
import { LigneVenteService } from 'src/app/services/ligne-vente.service';
import { VenteService } from 'src/app/services/vente.service';
import { CreateLigneVenteComponent } from '../../create-ligne-vente/create-ligne-vente.component';

@Component({
  selector: 'app-creation-vente-libre',
  templateUrl: './creation-vente-libre.component.html',
  styleUrls: ['./creation-vente-libre.component.scss']
})
export class CreationVenteLibreComponent implements OnInit {

  order = new Vente();
  isValid:boolean = true;
  total = 0;
  listDataReglement = ["ESPECES", "WAVE", "FREE-MONEY","ORANGE-MONEY"];

  constructor(public crudApi: VenteService,
              public lventeService: LigneVenteService,
              private toastr :ToastrService,
              private dialog:MatDialog,
              private datePipe : DatePipe,
              public fb: FormBuilder,
              private router :Router,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  get f() { return this.crudApi.formData.controls; }

  ngOnInit() {
    if (this.crudApi.choixmenu == "A") {
      this.infoForm();
      this.crudApi.list = [];
    }else {
      this.lventeService.getAllByNumero(this.crudApi.formData.value.numeroVente).subscribe(
        response => {
          this.crudApi.list = response;
          let i;
          for (i=0; i<this.crudApi.list.length; i++) {
            this.total = parseFloat((this.crudApi.list[i].quantite * this.crudApi.list[i].prix).toFixed(2));
            this.crudApi.list[i].total = this.total;
            this.crudApi.list[i].ItemName = this.crudApi.list[i].produit.reference;
          }
        }
      );
      this.f['dateVente'].setValue(this.crudApi.formData.value.dateVente);
    }
    this.crudApi.getUserId();
  }

  infoForm() {
    this.crudApi.getNumeroVente();
    this.crudApi.formData = this.fb.group({
      numeroVente: this.crudApi.NumVente,
      total: [0, Validators.required],
      totalVente: [0, Validators.required],
      status: ['', Validators.required],
      typeReglement: ['', Validators.required],
      montantReglement: [0, Validators.required],
      dateVente: [new Date(), Validators.required],
      DeletedOrderItemIDs: '',
      ligneVentes: [[], Validators.required],
    });
  }

  AddData(lcommandeIndex, OrderId){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={lcommandeIndex, OrderId};
    this.dialog.open(CreateLigneVenteComponent, dialogConfig).afterClosed().subscribe(res =>{
        this.calculMontantTotal();
    });
  }

  calculMontantTotal() {
    this.f['totalVente'].setValue(this.crudApi.list.reduce((prev, curr) => {
      return prev + curr.total;
    }, 0));
  }

  validateForm() {
    this.isValid = false;
    if ((this.crudApi.formData.value.numeroVente == 0) || (this.crudApi.formData.value.totalVente == 0) ||
        (this.crudApi.formData.value.typeReglement == '') || (this.crudApi.formData.value.montantReglement == 0)
       || (this.crudApi.list == 0))
      this.isValid = false;
    else
      this.isValid = true;
    return this.isValid;
  }

  onSubmit() {
    if (this.validateForm()) {
      this.f['ligneVentes'].setValue(this.crudApi.list);
      if (this.crudApi.formData.value.montantReglement < this.crudApi.formData.value.totalVente) {
        this.toastr.error('Le montant de réglement ne doit pas inféreur au montant total','Veuillez revoir le montant de réglement', {
          timeOut: 3500,
          positionClass: 'toast-top-right',
        });
      }
      this.crudApi.saveVente(this.crudApi.formData.value, 1)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.success('avec succès','Vente Effectuée', {
              timeOut: 1500,
              positionClass: 'toast-top-right',
            });
            this.router.navigate(['list-ventes']);
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
      this.lventeService.deleteLigneVente(id).subscribe(data => {
        this.toastr.warning('Détails Vente supprimé avec succès!');
      });
    }
    this.crudApi.list.splice(i, 1);
    this.calculMontantTotal();
  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

}