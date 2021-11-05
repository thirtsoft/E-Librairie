import { ProduitService } from './../../services/article.service';
import { Component, OnInit, Inject } from '@angular/core';
import { VenteService } from 'src/app/services/vente.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LigneVenteService } from 'src/app/services/ligne-vente.service';
import { Observable } from 'rxjs';
import { Produit } from '../../models/produit';


@Component({
  selector: 'app-create-ventewith-qrcode-bar-code',
  templateUrl: './create-ventewith-qrcode-bar-code.component.html',
  styleUrls: ['./create-ventewith-qrcode-bar-code.component.scss']
})
export class CreateVentewithQrcodeBarCodeComponent implements OnInit {

  isValid:boolean = true;

  barcodeArticle: any;
  listArticleBarcode;

  lastScannedBarCode = "";
 // listOfScannedBarCodes = [];
  listOfScannedBarCodes: any={};
  totalAmount: 0.

  listDataReglement = ["ESPECES", "CHEQUE", "VIREMENT"];

  barcode: string='';
  total;

  products: any[] = [];
  selectedProduct: any;
  productFound:boolean = false;

  formDataVente:  FormGroup;
  listArticle: Produit[];

  constructor(public crudApi: VenteService,
              private artService: ProduitService,
              public lventeService: LigneVenteService,
              private toastr :ToastrService,
              private datePipe : DatePipe,
              public fb: FormBuilder ,

  ) { }

  get f() { return this.crudApi.formData.controls; }



  ngOnInit() {
    if (this.crudApi.choixmenu == "A") {
      this.infoForm();
      this.listOfScannedBarCodes = [];
    }else {
      this.lventeService.getAllByNumero(this.crudApi.formData.value.numeroVente).subscribe(
        response => {
          this.listOfScannedBarCodes = response;
          console.log("Lignes de vente est " + response);
          let i;
          for (i=0; i<this.listOfScannedBarCodes.length; i++) {
            this.total = parseFloat((this.listOfScannedBarCodes[i].quantite * this.listOfScannedBarCodes[i].prix).toFixed(2));
            console.log("Le total " + this.total);
            this.listOfScannedBarCodes[i].total = this.total;
            this.listOfScannedBarCodes[i].ItemName = this.listOfScannedBarCodes[i].produit.reference;
            console.log("Ref produits " + this.listOfScannedBarCodes[i].produit.reference);
            console.log("ProductName name " + this.listOfScannedBarCodes[i].ItemName);
          }
        }
      );
      this.f['dateVente'].setValue(this.crudApi.formData.value.dateVente);
    }
    this.crudApi.getUserId();
    this.crudApi.getNumeroVente();

    this.artService.getAllProduits().subscribe(
      response =>{
        this.listArticle = response;
      }
    );
  }

  infoForm() {
    const numberRegEx = /\-?\d*\.?\d{1,2}/;
    this.crudApi.formData = this.fb.group({
      numeroVente: this.crudApi.NumVente,
  //    total: [0, Validators.required],
      totalVente: [0, Validators.required],
      typeReglement: ['', Validators.required],
      montantReglement: [0, Validators.required],
  //    montantReglement: ['', [Validators.required, Validators.pattern(numberRegEx)]],
 //     montantReglement: [0, [Validators.required]],
      dateVente: [new Date(), Validators.required],
      ligneVentes: [[], Validators.required],


    });

  }

 /*  validateForm() {
    this.isValid = true;
    if (this.crudApi.formData.value.id_client==0)
      this.isValid = false
    else if (this.listOfScannedBarCodes.length === 0)
      this.isValid = false;
    return this.isValid;
  } */

  validateForm() {
    this.isValid = false;
    if ((this.crudApi.formData.value.numeroVente == 0) || (this.crudApi.formData.value.totalVente == 0) ||
        (this.crudApi.formData.value.typeReglement == '') || (this.crudApi.formData.value.montantReglement == 0)
        || (this.listOfScannedBarCodes == 0))
      this.isValid = false;
    else
      this.isValid = true;
    return this.isValid;
  }

  onSubmit() {
    if (this.validateForm()) {
      this.f['totalVente'].setValue(this.totalAmount);
      this.f['ligneVentes'].setValue(this.listOfScannedBarCodes);
      console.log(this.crudApi.formData.value);
      console.log(this.crudApi.formData.value.numeroVente);
      console.log(this.crudApi.formData.value, this.crudApi.id);
      /*
      this.crudApi.saveVenteWithBarcode(this.crudApi.formData.value, this.crudApi.id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.success('avec succès','Vente Effectuée', {
              timeOut: 1500,
              positionClass: 'toast-top-right',
            });

            this.router.navigate(['/home/ventes']);
          }
        ); */

    }else {
      this.toastr.error('Veuillez renseigner tous les champs','Données non valides', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });

    }



  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  /*
  onKey(event: any) {
    console.log("EVENT!!!!!!!!!!!!!!" + event)
    this.barcode = event.target.value;
    if (this.barcode.length == 13) {
      this.artService.getArticleByBarcode(this.barcode).subscribe(
        (data: Product)=> {
          if (this.barcode === data.barCode) {
            console.log("Barcode of barcode is " + this.barcode);
            this.listOfScannedBarCodes.push({barcode: this.barcode, designation: data.designation, prixVente: data.prixDetail, quantite: 1});
            this.updateTotals();
          }
        }

      )

    }

  }
  */


  onKeyS(event: any) {
    this.barcode = event.target.value;
    if (this.barcode.length == 13) {
      this.artService.getProduitByBarcode(this.barcode).subscribe(
        (data: Produit)=> {
          if (this.barcode === data.barCode) {
              console.log("Barcode of barcode is " + this.barcode);
           //   this.listOfScannedBarCodes.push({barcode: this.barcode, designation: data.designation, prixVente: data.prixDetail, quantite: 1});
              this.listOfScannedBarCodes.push({produit: data, itemName: data.designation, prixVente: data.prixDetail, quantite: 1});
              this.updateTotals();

          }
        }

      )

    }

  }

  onKey(event: any) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: any = undefined;
    this.barcode = event.target.value;
    if (this.barcode.length == 13) {
      this.artService.getProduitByBarcode(this.barcode).subscribe(
        (data: Produit)=> {
          const sameProduct = this.listArticle.find((prod) => prod.reference === data.reference);
          if ((this.barcode === data.barCode) && (sameProduct)) {
            console.log("Barcode of barcode is " + this.barcode);

            if (this.listOfScannedBarCodes.length > 0) {
              existingCartItem = this.listOfScannedBarCodes.find(tempCartItem => tempCartItem.itemName === data.designation);
              console.log(existingCartItem);
              alreadyExistsInCart = (existingCartItem != undefined)
            }
            if (alreadyExistsInCart) {
             // increment the quantity
              existingCartItem.quantite++;
            }else {
              this.listOfScannedBarCodes.push({produit: data, itemName: data.designation, prixVente: data.prixDetail, quantite: 1});

            }

            this.updateTotals();

          }
        }
      )



    }



  }

  updateTotals() {
    this.totalAmount = 0;
    for(let i = 0; i < this.listOfScannedBarCodes.length; i++) {
        let obj = this.listOfScannedBarCodes[i];
        this.totalAmount += obj.quantite * obj.prixVente;
    }
  }

  inCrementQuantity(item) {
    item.quantite++;
    this.updateTotals();
  }

  decrementQuantity(item) {
    item.quantite--;
    for (let i = 0; i < this.listOfScannedBarCodes.length; i++) {
      let obj = this.listOfScannedBarCodes[i];
      if (obj.quantite === 0) {
        this.listOfScannedBarCodes.splice(i, 1);
      } else {
        this.updateTotals();
      }
    }

  }

  removeCarts(item) {
    const itemIndex = this.listOfScannedBarCodes.find((tempCartItem) => tempCartItem.id === item.id);
    if (itemIndex > -1) {
      this.listOfScannedBarCodes.splice(itemIndex, 1);
      this.updateTotals();
    }

  }

  removeCart(id: number, i: number) {
    if (id != null) {
      this.lventeService.deleteLigneVente(id).subscribe(data => {
        this.toastr.warning('Détails Vente supprimé avec succès!');
      });
    }
    this.listOfScannedBarCodes.splice(i, 1);
    this.updateTotals();
  }


}
