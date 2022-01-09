import { ProduitService } from './../../services/article.service';
import { Produit } from './../../models/produit';
import { Component, OnInit, Inject } from '@angular/core';
import { LigneAppro } from 'src/app/models/ligne-appro';
import { LigneApproService } from 'src/app/services/ligne-appro.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApproService } from 'src/app/services/appro.service';
import { FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { Appro } from 'src/app/models/appro';

@Component({
  selector: 'app-create-ligne-appro',
  templateUrl: './create-ligne-appro.component.html',
  styleUrls: ['./create-ligne-appro.component.scss']
})
export class CreateLigneApproComponent implements OnInit {

 // formData: LigneAppro;
  listArticle: Produit[];

  isValid: boolean = true;
  approvisionnement: any;
  produit: any;
  lappro: LigneAppro;
  total = 0;
  formData: FormGroup;

  constructor(public lApproService: LigneApproService,
              @Inject(MAT_DIALOG_DATA) public data,
              private articleService: ProduitService,
              private AppService: ApproService,
              public fb: FormBuilder,
              public dialogRef: MatDialogRef<CreateLigneApproComponent>,
  ) { }

  get f() { return this.formData.controls; }

  ngOnInit() {
    if (this.data.lcommandeIndex == null) {
      this.infoForm();
    } else {
      this.formData = this.fb.group(Object.assign({}, this.AppService.list[this.data.lcommandeIndex]));
      console.log(this.formData);
   }

    this.articleService.getAllProductsOrderByDesignationAsc().subscribe(
      response =>{
        this.listArticle = response;
      }
    );

  /*
    if (this.data.orderItemIndex == null)
      this.formData = {
        OrderItemId: null,
        OrderId: this.data.OrderId,
        ItemId: 0, numero: '', prix: 0,
        quantite: 0, ItemName: '', total: 0,
        produit: new Article(), approvisionnement: new Appro(),

      }
    else
      this.formData = Object.assign({}, this.AppService.orderItems[this.data.orderItemIndex]);
  }
  */
  }

  infoForm() {
    this.formData = this.fb.group({
      id: null,
      OrderId: this.data.OrderId,
      ItemId: 0,
      numero: this.data.code,
      prix: 0,
      quantite: 0,
      qteStock: 0,
      ItemName: '',
      prixAppro: 0,
      total: 0,
      produit: new Produit(),
    });
  }

  compareProduit(prod1: Produit, prod2: Produit) : boolean {
    return prod1 && prod2 ? prod1.id === prod2.id : prod1 === prod2;
  }

  selectPrice(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.f['prix'].setValue(0);
      this.f['quantite'].setValue(0);
      this.f['ItemName'].setValue('');
      this.f['qteStock'].setValue(0);
    } else {
      this.f['prix'].setValue(this.listArticle[ctrl.selectedIndex-1].prixAchat);

      this.f['ItemName'].setValue(this.listArticle[ctrl.selectedIndex-1].designation);

      this.f['qteStock'].setValue(this.listArticle[ctrl.selectedIndex-1].qtestock)
    }
    this.calculTotal();
  }

  calculTotal() {
    this.total = parseFloat((this.formData.value.quantite * this.formData.value.prixAppro).toFixed(2));
    this.f['total'].setValue(this.total);
  }

  onSubmit() {
    if (this.data.lcommandeIndex == null) {
      this.AppService.list.push(this.formData.value);
      this.dialogRef.close();
    }else {
      this.AppService.list[this.data.lcommandeIndex] = this.formData.value;
    }
    this.dialogRef.close();
  }

  validateForm(formData: LigneAppro) {
    this.isValid = true;
    if (formData.produit.id==0)
      this.isValid = false;
    else if (formData.quantite==0)
      this.isValid = false;
    return this.isValid;
  }

}
