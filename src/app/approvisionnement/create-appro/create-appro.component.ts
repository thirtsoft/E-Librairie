import { Component, OnInit, Inject } from '@angular/core';
import { Fournisseur } from 'src/app/models/fournisseur';
import { Appro } from 'src/app/models/appro';
import { ApproService } from 'src/app/services/appro.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateLigneApproComponent } from '../create-ligne-appro/create-ligne-appro.component';
import { LigneAppro } from 'src/app/models/ligne-appro';
import { LigneApproService } from 'src/app/services/ligne-appro.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-appro',
  templateUrl: './create-appro.component.html',
  styleUrls: ['./create-appro.component.scss']
})
export class CreateApproComponent implements OnInit {

  fournisseurList: Fournisseur[];
  date;
  public order = new Appro();

  orders: Appro[];

  isValid:boolean = true;
  articleService: any;

  compteur : any={};
  client: any;
  annee  = 0;

  total = 0;
  refProd = '';

  orderItem: LigneAppro[];
  OrderId: number;

  constructor(private crudApi: ApproService, private dialog:MatDialog,
    public fb: FormBuilder, public fourService: FournisseurService,
    private lapproService: LigneApproService, private datePipe : DatePipe,
    private toastr :ToastrService, private router :Router,
    private currentRoute: ActivatedRoute, private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
   // public dialogRef:MatDialogRef<CreateLigneApproComponent>,
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
    /*  this.crudApi.getApprovisionnementByID(parseInt(OrderId)).then(res =>{
         this.orders = res.order;
        this.crudApi.orderItems = res.orderItems;
      });
      */
      this.lapproService.getAllByNumero(this.crudApi.formData.value.code).subscribe(
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
      this.f['dateAppro'].setValue(this.crudApi.formData.value.dateAppro);
    }

    this.fourService.getAllFournisseurs().subscribe(
      response =>{
        this.fournisseurList = response;
        console.log(response);
      }
    );

  }
/*
  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.crudApi.formData = {
      id: null,
      code: Math.floor(100000 + Math.random() * 900000).toString(),
      totalAppro: 0,
      status: '',
      observation: '',
      dateAppro: new Date(),
      fournisseur: new Fournisseur(),
      DeletedOrderItemIDs: ''

    };

    this.crudApi.orderItems=[];

  }
  */
 infoForm() {
  this.crudApi.formData = this.fb.group({
    id: null,
    code: Math.floor(100000 + Math.random() * 900000).toString(),
    total: [0, Validators.required],
    montantAvance: [0, Validators.required],
    totalAppro: [0, Validators.required],
    status: ['', Validators.required],
    observation: ['', Validators.required],
    dateAppro: [new Date(), Validators.required],
    fournisseur: [new Fournisseur(), Validators.required],
    DeletedOrderItemIDs: '',
    ligneApprovisionnements: [[], Validators.required],
  });

 }

 compareFournisseur(fournisseur1: Fournisseur, fournisseur2: Fournisseur) : boolean {
  return fournisseur1 && fournisseur2 ? fournisseur1.id === fournisseur2.id : fournisseur1 === fournisseur2;
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
/*
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
*/
  calculMontantTotal() {
    this.f['totalAppro'].setValue(this.crudApi.list.reduce((prev, curr) => {
      return prev + curr.total;
    }, 0));

  }
/*
  calculMontantTotal() {
    this.crudApi.formData.totalAppro = this.crudApi.orderItems.reduce((prev, curr) => {
      return prev + curr.total ;
    }, 0);
    this.crudApi.formData.totalAppro = parseFloat(this.crudApi.formData.totalAppro.toFixed(2));
  }
  */
  validateForm() {
    this.isValid = true;
    if (this.crudApi.formData.value.fournisseur.id==0)
      this.isValid = false;
    else if (this.crudApi.list.length==0)
      this.isValid = false;
    return this.isValid;
  }

  onSubmit() {
    this.f['ligneApprovisionnements'].setValue(this.crudApi.list);
    console.log(this.crudApi.formData.value);
    this.crudApi.saveApprovisionnement(this.crudApi.formData.value).subscribe(
      data => {
        console.log(this.crudApi.formData.value);
        this.toastr.success('Approvisionnement Ajoutée avec succès');
        console.log(this.crudApi.formData.value);
        this.router.navigate(['/approvisionnements']);
      });

  }
  /*
  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.crudApi.createApprovisionnement().subscribe(res => {
        this.resetForm();
        this.toastr.success('Approvisionnement Ajoutée avec succès');
        this.router.navigate(['/approvisionnements']);
      })
    }
  }
*/
  onDeleteOrderItem(id: number, i: number) {
    if (id != null) {
      this.lapproService.deleteLigneAppro(id).subscribe(data => {
        this.toastr.warning('Détails Approvisionnement supprimé avec succès!');
      });
    }
    this.crudApi.list.splice(i, 1);
    this.calculMontantTotal();
  }

  /*
  onDeleteOrderItem(orderItemID: number, i: number) {
    if (orderItemID != null)
      this.crudApi.formData.DeletedOrderItemIDs += orderItemID + ",";
    this.crudApi.orderItems.splice(i, 1);
    this.calculMontantTotal();
  }
*/
  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

}
