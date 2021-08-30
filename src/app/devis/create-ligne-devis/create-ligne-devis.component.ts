import { ProduitService } from './../../services/article.service';
import { Produit } from './../../models/produit';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { LigneDevis } from 'src/app/models/ligne-devis';
import { DevisService } from 'src/app/services/devis.service';
import { LigneDevisService } from 'src/app/services/ligne-devis.service';

@Component({
  selector: 'app-create-ligne-devis',
  templateUrl: './create-ligne-devis.component.html',
  styleUrls: ['./create-ligne-devis.component.scss']
})
export class CreateLigneDevisComponent implements OnInit {

  //  formData: LigneCmdClient;
  listArticle: Produit[];
  isValid: boolean = true;
  approvisionnement: any;
  produit: any;
  total = 0;
  ldevis: LigneDevis;
  isInvalidQte;

  formData: FormGroup;

  constructor(public ldevisService: LigneDevisService,
              private toastr :ToastrService,
              private articleService: ProduitService,
              private devisService: DevisService,
              public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<CreateLigneDevisComponent>,
  ) { }

  get f() { return this.ldevisService.dataForm.controls; }

  ngOnInit() {
    if (this.data.ldevisIndex == null) {
      this.infoForm();
    }else {
      this.ldevisService.dataForm = this.fb.group(Object.assign({}, this.devisService.list[this.data.ldevisIndex]));
      console.log(this.ldevisService.dataForm);
    }

    this.articleService.getAllProduits().subscribe(
      response =>{
        this.listArticle = response;
      }
    );

  }

  infoForm() {
    this.ldevisService.dataForm = this.fb.group({
     // OrderItemId: null,
      id: null,
      OrderId: [this.data.OrderId, [Validators.required]],
      ItemId:  [, [Validators.required]],
      numero:  [this.data.numeroCommande, [Validators.required]],
      prix: [ , [Validators.required]],
      quantite: [ , [Validators.required]],
      qteStock: [ , [Validators.required]],
      ItemName: ['', [Validators.required]],
      prixDevis: [, [Validators.required]],
      total: [0, [Validators.required]],
      produit: [, [Validators.required]],
     // commande: new CommandeClient(),
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
      this.f['prix'].setValue(this.listArticle[ctrl.selectedIndex-1].prixVente);

      this.f['ItemName'].setValue(this.listArticle[ctrl.selectedIndex-1].designation);

      this.f['qteStock'].setValue(this.listArticle[ctrl.selectedIndex-1].qtestock);
    }
    this.calculTotal();
  }

  calculTotal() {
    this.total = parseFloat((this.ldevisService.dataForm.value.quantite * this.ldevisService.dataForm.value.prixDevis).toFixed(2));
    this.f['total'].setValue(this.total);
  }

  onSubmit() {
    if ((this.data.ldevisIndex == null)  || (this.ldevisService.dataForm.invalid)) {
      this.devisService.list.push(this.ldevisService.dataForm.value);
      this.dialogRef.close();
    }else {
      this.devisService.list[this.data.ldevisIndex] = this.ldevisService.dataForm.value;
    }
    this.dialogRef.close();
  }

 validateForm(formData: LigneDevis){
    this.isValid=true;
    if(formData.produit.id==0)
      this.isValid=false;
      else if(formData.quantite==0)
      this.isValid=false;
      return this.isValid;
  }

}
