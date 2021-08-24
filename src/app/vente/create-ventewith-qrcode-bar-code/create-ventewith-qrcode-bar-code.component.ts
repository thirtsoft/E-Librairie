import { Product } from './../../models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Vente } from 'src/app/models/vente';
import { VenteService } from 'src/app/services/vente.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { FormBuilder, NgForm, Validators, FormGroup } from '@angular/forms';
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
  selector: 'app-create-ventewith-qrcode-bar-code',
  templateUrl: './create-ventewith-qrcode-bar-code.component.html',
  styleUrls: ['./create-ventewith-qrcode-bar-code.component.scss']
})
export class CreateVentewithQrcodeBarCodeComponent implements OnInit {

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

  listArticle: Product[];

  lastScannedBarCode = "";
  listOfScannedBarCodes = [];
  totalAmount: 0.

  listDataReglement = ["ESPECES", "CHEQUE", "VIREMENT"];

  barcode;
  values: string[] = [];

  formDataVente:  FormGroup;

  constructor(public crudApi: VenteService,
              private artService: ArticleService,
              public lventeService: LigneVenteService,
              private toastr :ToastrService,
              private dialog:MatDialog,
              private datePipe : DatePipe,
              public fb: FormBuilder ,
              private router :Router
  ) { }

  get f() { return this.formDataVente.controls; }

  ngOnInit() {
    if (this.crudApi.choixmenu == "A") {
      this.infoForm();
      this.listOfScannedBarCodes = [];
    }else {
     /*  this.f['dateVente'].setValue(this.formDataVente.value.dateVente); */
    }

    this.crudApi.getUserId();
  }

  infoForm() {
    this.formDataVente = this.fb.group({
      // total: [0, Validators.required],
      totalAmount: [0, Validators.required],
      // status: ['', Validators.required],
      typeReglement: ['', Validators.required],
      montantReglement: [0, Validators.required],
      dateVente: [new Date(), Validators.required],
      DeletedOrderItemIDs: '',

    });

  }

  compareVente() {

  }



  validateForm() {
    this.isValid = true;
    if (this.formDataVente.value.id_client === 0)
      this.isValid = false
    else if (this.listOfScannedBarCodes.length === 0)
      this.isValid = false;
    return this.isValid;
  }

  onSubmit() {
   /*  this.f['ligneVentes'].setValue(this.listOfScannedBarCodes); */
    console.log(this.formDataVente.value);
    console.log(this.formDataVente.value.numeroVente);
    console.log(this.formDataVente.value, this.crudApi.id);
    console.log("Identité user " + this.crudApi.id)
    this.crudApi.saveVenteWithBarcode(this.formDataVente.value, this.crudApi.id).subscribe(
      data => {
        console.log(data);
        this.toastr.success('Vente Effectuée avec succès');
        this.router.navigate(['/home/ventes']);
      }
    );

  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  getArticleByBarcode(barcode: string) {
    this.artService.getArticleByBarcode(barcode).subscribe(
      (data: Product[]) => {
        this.listArticle = data;
        console.log("Product By barcode is +++", data);
      });

  }

  getArticleByQrcode(qrcode: string) {
    this.artService.getArticleByQrcode(qrcode).subscribe(
      (data: Product[]) => {
        this.listArticle = data;
        console.log("Product By qrcode is +++", data);
      });

  }

  onKey(event: any) {
    console.log("EVENT!!!!!!!!!!!!!!" + event)
    this.barcode=event.target.value;
    if (this.barcode) {
      this.artService.getArticleByBarcode(this.barcode).subscribe(
        (data: Product)=> {
          if (this.barcode === data.barCode) {
            console.log("Barcode of barcode is " + this.barcode);
            this.listOfScannedBarCodes.push({barcode: this.barcode, designation: data.designation, price: data.prixDetail, quantity: 1});
            this.updateTotals();
          }
        }

      )

    }

  }

  addTocart(theCartItem){
    let alreadyExistsInCart: boolean = false;
    let existingCartItem = undefined;

    if (this.listOfScannedBarCodes.length > 0) {
      existingCartItem = this.listOfScannedBarCodes.find(tempCartItem => tempCartItem.id === theCartItem.id);

      alreadyExistsInCart = (existingCartItem != undefined)
    }
    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    }else {
      // add to the cart item array
      this.listOfScannedBarCodes.push(theCartItem);
    }

    this.updateTotals();
  }

  updateTotals() {
    this.totalAmount = 0;
    for (let i = 0; i < this.listOfScannedBarCodes.length; i++) {
        let obj = this.listOfScannedBarCodes[i];
        this.totalAmount += obj.quantity * obj.price;
    }

  }

  checkIfScannedCodeExists(scannedCode) {
    for (let i = 0; i < this.listOfScannedBarCodes.length; i++) {
      let obj = this.listOfScannedBarCodes[i];
      if (obj.barcode == scannedCode)
          return i;
    }

    return undefined;
  }

  inCrementQuantity(item) {
    this.addTocart(item);
  }

  decrementQuantity(item) {
    item.quantity--;
    if (item.quantity === 0) {
      this.removeCart(item);
    } else {
      this.updateTotals();
    }

  }

  removeCart(item) {
    const itemIndex = this.listOfScannedBarCodes.findIndex((tempCartItem) => tempCartItem.id === item.id);
    if (itemIndex > -1) {
      this.listOfScannedBarCodes.splice(itemIndex, 1);
      this.updateTotals();

    }

  }



}
