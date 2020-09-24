import { Component, OnInit, Inject } from '@angular/core';
import { Fournisseur } from 'src/app/models/fournisseur';
import { Appro } from 'src/app/models/appro';
import { ApproService } from 'src/app/services/appro.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { FormBuilder, NgForm } from '@angular/forms';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateLigneApproComponent } from '../create-ligne-appro/create-ligne-appro.component';

@Component({
  selector: 'app-create-appro',
  templateUrl: './create-appro.component.html',
  styleUrls: ['./create-appro.component.scss']
})
export class CreateApproComponent implements OnInit {

  fournisseurList: Fournisseur[];

  public order = new Appro();

  orders: Appro[];

  isValid:boolean = true;
  articleService: any;
  Date;
  compteur : any={};
  client: any;
  annee  = 0;

  constructor(private crudApi: ApproService, private dialog:MatDialog,
    public fb: FormBuilder, public fourService: FournisseurService,
    private toastr :ToastrService, private router :Router,
    private currentRoute: ActivatedRoute, private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateLigneApproComponent>,
    ) { }

  ngOnInit() {
    let OrderId = this.currentRoute.snapshot.paramMap.get('id');
    if (OrderId == null) {
      this.resetForm();
    }else {
      this.crudApi.getApprovisionnementByID(parseInt(OrderId)).then(res =>{
         this.orders = res.order;
        this.crudApi.orderItems = res.orderItems;
      });
    }

    this.fourService.getAllFournisseurs().subscribe(
      response =>{
        this.fournisseurList = response;
        console.log(response);
      }
    );

  }

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.crudApi.formData = {
      id: null,
      code: Math.floor(100000 + Math.random() * 900000).toString(),
      totalAppro: 0,
      status: '',
      dateAppro: new Date(),
      fournisseur: new Fournisseur(),
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
    this.dialog.open(CreateLigneApproComponent, dialogConfig).afterClosed().subscribe(res =>{
        this.calculMontantTotal();
    });

  }

  AddOrderItem(lcommandeIndex, OrderId){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={lcommandeIndex, OrderId};
    this.dialog.open(CreateLigneApproComponent, dialogConfig).afterClosed().subscribe(res =>{
        this.calculMontantTotal();
    });

  }

  calculMontantTotal() {
    this.crudApi.formData.totalAppro = this.crudApi.orderItems.reduce((prev, curr) => {
      return prev + curr.total ;
    }, 0);
    this.crudApi.formData.totalAppro = parseFloat(this.crudApi.formData.totalAppro.toFixed(2));

  }
  validateForm() {
    this.isValid = true;
    if (this.crudApi.formData.fournisseur.id==0)
      this.isValid = false;
    else if (this.crudApi.orderItems.length==0)
      this.isValid = false;
    return this.isValid;
  }

  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.crudApi.createApprovisionnement().subscribe(res => {
        this.resetForm();
        this.toastr.success('Approvisionnement Ajoutée avec succès');
        this.router.navigate(['/approvisionnements']);
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
