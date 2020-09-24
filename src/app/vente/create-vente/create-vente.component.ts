import { Component, OnInit, Inject } from '@angular/core';
import { Vente } from 'src/app/models/vente';
import { VenteService } from 'src/app/services/vente.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { FormBuilder, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateLigneVenteComponent } from '../create-ligne-vente/create-ligne-vente.component';

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
  Date;
  compteur : any={};
  client: any;
  annee  = 0;

  constructor(private crudApi: VenteService, private dialog:MatDialog,
    public fb: FormBuilder, private toastr :ToastrService, private router :Router,
    private currentRoute: ActivatedRoute, private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateLigneVenteComponent>,
    ) { }

  ngOnInit() {
    let OrderId = this.currentRoute.snapshot.paramMap.get('id');
    if (OrderId == null) {
      this.resetForm();
    }else {
      this.crudApi.getVenteID(parseInt(OrderId)).then(res =>{
         this.orders = res.order;
        this.crudApi.orderItems = res.orderItems;
      });
    }

  }

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


}
