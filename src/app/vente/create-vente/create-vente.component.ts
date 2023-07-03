import { Component, OnInit, Inject } from '@angular/core';
import { Vente } from 'src/app/models/vente';
import { VenteService } from 'src/app/services/vente.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateLigneVenteComponent } from '../create-ligne-vente/create-ligne-vente.component';
import { LigneVente } from 'src/app/models/ligne-vente';
import { DatePipe } from '@angular/common';
import { LigneVenteService } from 'src/app/services/ligne-vente.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Utilisateur } from 'src/app/models/utilisateur';

@Component({
  selector: 'app-create-vente',
  templateUrl: './create-vente.component.html',
  styleUrls: ['./create-vente.component.scss']
})
export class CreateVenteComponent implements OnInit {

  order = new Vente();

  orders: Vente[];

  isValid:boolean = true;
  articleService: any;
  date;
  compteur : any={};
  client: any;
  annee  = 0;
  total = 0;
  refProd = '';
  orderItem: LigneVente[];
  OrderId: number;

  numVente: number;
  currentUser: any = {};
  id: number;

  listDataReglement = ["ESPECES", "WAVE", "FREE-MONEY","ORANGE-MONEY"];

  constructor(public crudApi: VenteService,
              public lventeService: LigneVenteService,
              private toastr :ToastrService,
              private dialog:MatDialog,
              private datePipe : DatePipe,
              public fb: FormBuilder ,
              private router :Router,
              @Inject(MAT_DIALOG_DATA) public data: any,
   // public dialogRef:MatDialogRef<CreateLigneVenteComponent>,
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
          //  console.log( this.crudApi.list);
            this.total = parseFloat((this.crudApi.list[i].quantite * this.crudApi.list[i].prix).toFixed(2));
            this.crudApi.list[i].total = this.total;
          //  console.log(this.total);
            this.crudApi.list[i].ItemName = this.crudApi.list[i].produit.reference;
            console.log(this.crudApi.list[i].ItemName);
          }
        }
      );
      this.f['dateVente'].setValue(this.crudApi.formData.value.dateVente);
    }

 //   this.crudApi.getNumeroVente();

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
     // utilisateur: this.crudApi.id,

    });

  }

  compareVente() {

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
      console.log(this.crudApi.formData.value);
      console.log(this.crudApi.formData.value.numeroVente);
      console.log(this.crudApi.formData.value, this.crudApi.id);

      if (this.crudApi.formData.value.montantReglement < this.crudApi.formData.value.totalVente) {
        this.toastr.error('Le montant de réglement ne doit pas inféreur au montant total','Veuillez revoir le montant de réglement', {
          timeOut: 3500,
          positionClass: 'toast-top-right',
        });
      }

      this.crudApi.saveVente(this.crudApi.formData.value, this.crudApi.id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.success('avec succès','Vente Effectuée', {
              timeOut: 1500,
              positionClass: 'toast-top-right',
            });

            this.router.navigate(['/home/ventes']);
          }
        );

    }else {
      this.toastr.error('Veuillez remplir tous les champs','Données non valides', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });

    }



  }
/*
  onSubmit() {
    this.f['ligneVentes'].setValue(this.crudApi.list);
    console.log(this.crudApi.formData.value);

    this.catService.creerVente(this.crudApi.formData.value);
    console.log(this.crudApi.formData.value);

    /*

    this.toastr.success('Vente Effectuée avec succès');
    console.log(this.crudApi.formData.value);
    this.router.navigate(['/ventes']);

  }
*/
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
