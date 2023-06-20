import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LigneVente } from 'src/app/models/ligne-vente';
import { Produit } from 'src/app/models/produit';
import { Vente } from 'src/app/models/vente';
import { ProduitService } from 'src/app/services/article.service';
import { VenteService } from 'src/app/services/vente.service';

@Component({
  selector: 'app-vente-creation',
  templateUrl: './vente-creation.component.html',
  styleUrls: ['./vente-creation.component.scss']
})
export class VenteCreationComponent implements OnInit {

  order = new Vente();

  orders: Vente[];

  listArticle: Produit[];

  isValid:boolean = true;
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

  listDataReglement = ["ESPECES", "CHEQUE", "VIREMENT"];

  venteFormGroup: FormGroup;

  invoicedetail?: FormArray;

  isedit = false;

  constructor(public crudApi: VenteService,
              private prodService: ProduitService,
              private toastr :ToastrService,
              private dialog:MatDialog,
              private datePipe : DatePipe,
              public fb: FormBuilder ,
              private router :Router

  ) { 
    
 
  }



 // get f() { return this.crudApi.formData.controls; }

  ngOnInit() {
  //  this.crudApi.getUserId();
  this.getProductList();
  this.initVentFormGroup();
  
  }

  initVentFormGroup() {
    this.venteFormGroup = this.fb.group({
      id: '',
      numeroVente:'',
      totalVente:'',
      status:'',
      typeReglement:'',
      montantReglement:'',
      dateVente:'',
      utilisateur:'',
      ligneVentes: this.fb.array([]) ,
    });

  }

  getProductList() {
    this.prodService.getAllProductsOrderByDesignationAsc().subscribe(
      response =>{
        this.listArticle = response;
      }
    );
  }

  /*
  productchange(index: any) {
    this.invoicedetail = this.invoiceform.get("details") as FormArray;
    this.invoiceproduct = this.invoicedetail.at(index) as FormGroup;
    let productcode = this.invoiceproduct.get("productCode")?.value;
    this.service.GetProductbycode(productcode).subscribe(res => {
      let proddata: any;
      proddata = res;
      console.log(proddata);
      if (proddata != null) {
        this.invoiceproduct.get("productName")?.setValue(proddata.name);
        this.invoiceproduct.get("salesPrice")?.setValue(proddata.price);
        this.Itemcalculation(index);
      }
    });
  }*/

  /*
  selectPrice(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.f['prixVente'].setValue(0);
      this.f['quantite'].setValue(0);
      this.f['ItemName'].setValue('');
      this.f['qteStock'].setValue(0);
    } else {
      this.f['prixVente'].setValue(this.listArticle[ctrl.selectedIndex-1].prixDetail);

      this.f['ItemName'].setValue(this.listArticle[ctrl.selectedIndex-1].designation);

      this.f['qteStock'].setValue(this.listArticle[ctrl.selectedIndex-1].qtestock);
    }
  }*/


  
  nouvelleLigneVente(): FormGroup {
    return this.fb.group({
      numero: ['', Validators.required],
      OrderId: [''],
      ItemId: [''],
      ItemName: [''],
      quantite: ['', Validators.required],
      prixVente: ['', Validators.required],
      total: ['', Validators.required],
      barCode: ['', Validators.required]
    //  produit: ['', Validators.required],
    })
  }

  
  ligneVentes(): FormArray {
    return this.venteFormGroup.get("ligneVentes") as FormArray 
  }

  ajouterUneLigneVente() {
    this.invoicedetail = this.venteFormGroup.get("ligneVentes") as FormArray
    if(this.isedit) {
      this.invoicedetail.push(this.nouvelleLigneVente());

    }
  //  this.ligneVentes().push(this.nouvelleLigneVente());
  }

  supprimerUneLigneVente(i: number) {
    this.ligneVentes().removeAt(i);
  }


  compareProduit(prod1: Produit, prod2: Produit) : boolean {
    return prod1 && prod2 ? prod1.id === prod2.id : prod1 === prod2;
  }

  /*
  Itemcalculation(index: any) {
    this.invoicedetail = this.venteFormGroup.get("ligneVentes") as FormArray;
    this.invoiceproduct = this.invoicedetail.at(index) as FormGroup;
    let qty =  this.venteFormGroup.getRawValue().;
    let price = this.invoiceproduct.get("salesPrice")?.value;
    let total = qty * price;
    this.invoiceproduct.get("total")?.setValue(total);

    this.summarycalculation();
  }*/


  /* calculTotal() {
    this.total = parseFloat((this.formData.value.quantite * this.formData.value.prixVente).toFixed(2));
    this.f['total'].setValue(this.total);
  } */

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

  onSubmit() {
    
  }

  AddData(lcommandeIndex, OrderId){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={lcommandeIndex, OrderId};
    /*
    this.dialog.open(CreateLigneVenteComponent, dialogConfig).afterClosed().subscribe(res =>{
        this.calculMontantTotal();
    });*/

  }
  /*
  calculMontantTotal() {
    this.f['totalVente'].setValue(this.crudApi.list.reduce((prev, curr) => {
      return prev + curr.total;
    }, 0));
  }*/


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

  /*
  onSubmit() {
    if (this.validateForm()) {
      this.f['ligneVentes'].setValue(this.crudApi.list);
      console.log(this.crudApi.formData.value);
      console.log(this.crudApi.formData.value.numeroVente);
      console.log(this.crudApi.formData.value, this.crudApi.id);

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
*/


  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }


}
