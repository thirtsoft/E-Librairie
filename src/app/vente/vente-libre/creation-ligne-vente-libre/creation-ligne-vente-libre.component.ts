import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { LigneVente } from 'src/app/models/ligne-vente';
import { Produit } from 'src/app/models/produit';
import { Vente } from 'src/app/models/vente';
import { ProduitService } from 'src/app/services/article.service';
import { LigneVenteService } from 'src/app/services/ligne-vente.service';
import { VenteService } from 'src/app/services/vente.service';

@Component({
  selector: 'app-creation-ligne-vente-libre',
  templateUrl: './creation-ligne-vente-libre.component.html',
  styleUrls: ['./creation-ligne-vente-libre.component.scss']
})
export class CreationLigneVenteLibreComponent implements OnInit {

  listArticle: Produit[];

  isValid: boolean = true;
  total = 0;
  formData: FormGroup;

  constructor(public lventeService: LigneVenteService,
              private articleService: ProduitService,
              private venteService: VenteService,
              @Inject(MAT_DIALOG_DATA) public data,
              public fb: FormBuilder,
              public dialogRef: MatDialogRef<CreationLigneVenteLibreComponent>,
  ) { }

  get f() { return this.formData.controls; }

  ngOnInit() {
    if (this.data.lcommandeIndex == null) {
      this.infoForm();
    } else {
      this.formData = this.fb.group(Object.assign({}, this.venteService.list[this.data.lcommandeIndex]));
    }
    this.articleService.getAllProductsOrderByDesignationAsc().subscribe(
      response =>{
        this.listArticle = response;
      }
    );
  }

  infoForm() {
    this.formData = this.fb.group({
    //  id: null,
      OrderId: this.data.OrderId,
      ItemId: 0,
      numero: this.data.numeroVente,
      prixVente: 0,
      quantite: 0,
      qteStock: 0,
      ItemName: '',
      total: 0,
      produit: new Produit(),
      vente: new Vente(),
    });
  }

  compareProduit(prod1: Produit, prod2: Produit) : boolean {
    return prod1 && prod2 ? prod1.id === prod2.id : prod1 === prod2;
  }

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
    this.calculTotal();
  }

  calculTotal() {
    this.total = parseFloat((this.formData.value.quantite * this.formData.value.prixVente).toFixed(2));
    this.f['total'].setValue(this.total);
  }

  onSubmit() {
    if (this.data.lcommandeIndex == null) {
      this.venteService.list.push(this.formData.value);
      this.dialogRef.close();
    }else {
      this.venteService.list[this.data.lcommandeIndex] = this.formData.value;
    }
    this.dialogRef.close();
  }

  validateForm(formData: LigneVente){
    this.isValid=true;
    if(formData.produit.id==0)
      this.isValid=false;
      else if(formData.quantite==0)
      this.isValid=false;
    return this.isValid;
  }
}
