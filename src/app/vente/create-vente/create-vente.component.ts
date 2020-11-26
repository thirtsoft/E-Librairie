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

@Component({
  selector: 'app-create-vente',
  templateUrl: './create-vente.component.html',
  styleUrls: ['./create-vente.component.scss']
})
export class CreateVenteComponent implements OnInit {

  public order = new Vente();

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

  constructor(private crudApi: VenteService, private dialog:MatDialog,
    private lventeService: LigneVenteService, private datePipe : DatePipe,
    public fb: FormBuilder, private toastr :ToastrService, private router :Router,
    private currentRoute: ActivatedRoute, private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
   // public dialogRef:MatDialogRef<CreateLigneVenteComponent>,
    ) { }

    get f() { return this.crudApi.formData.controls; }

  ngOnInit() {
    if (this.crudApi.choixmenu == "A") {
      this.infoForm();
      this.crudApi.list = [];
    /*
    let OrderId = this.currentRoute.snapshot.paramMap.get('id');
    if (OrderId == null) {
      this.resetForm();
      */
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
      /*
      this.crudApi.getVenteID(parseInt(OrderId)).then(res =>{
         this.orders = res.order;
        this.crudApi.orderItems = res.orderItems;
      });
      */
    }

  }
/*
  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.crudApi.formData = {
      venteId: null,
      numeroVente: Math.floor(100000 + Math.random() * 900000).toString(),
      totalVente: 0,
      status: '',
      dateVente: new Date(),
      DeletedOrderItemIDs: ''
    };
    this.crudApi.orderItems=[];
  }
  */
  infoForm() {
    this.crudApi.formData = this.fb.group({
      venteId: null,
      numeroVente: Math.floor(100000 + Math.random() * 900000).toString(),
      total: [0, Validators.required],
      totalVente: [0, Validators.required],
      status: ['', Validators.required],
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
/*
  AddOrderItem(lcommandeIndex, OrderId){
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
    this.crudApi.formData.totalVente = this.crudApi.orderItems.reduce((prev, curr) => {
      return prev + curr.total ;
    }, 0);
    this.crudApi.formData.totalVente = parseFloat(this.crudApi.formData.totalVente.toFixed(2));

  }

  validateForm() {
    this.isValid = true;
    if (this.crudApi.orderItems.length==0)
      this.isValid = false;
    return this.isValid;
  }
  */

  validateForm() {
    this.isValid = true;
    if (this.crudApi.formData.value.id_client==0)
      this.isValid = false
    else if (this.crudApi.list.length==0)
      this.isValid = false;
    return this.isValid;
  }

  onSubmit() {
    this.f['ligneVentes'].setValue(this.crudApi.list);
    console.log(this.crudApi.formData.value);
    this.crudApi.saveVente(this.crudApi.formData.value).subscribe(
      data => {
        console.log(this.crudApi.formData.value);
        this.toastr.success('Vente Effectuée avec succès');
        console.log(this.crudApi.formData.value);
        this.router.navigate(['/ventes']);
      }
    );
  }

  /*
  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.crudApi.createVente().subscribe(res => {
        this.resetForm();
        this.toastr.success('Vente Ajoutée avec succès');
        this.router.navigate(['/ventes']);
      })
    }
  }

  onDeleteOrderItem(orderItemID: number, i: number) {
    if (orderItemID != null)
      this.crudApi.formData.DeletedOrderItemIDs += orderItemID + ",";
    this.crudApi.orderItems.splice(i, 1);
    this.calculMontantTotal();
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
