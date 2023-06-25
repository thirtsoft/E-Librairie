import { ProduitService } from './../../services/article.service';
import { Produit } from './../../models/produit';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { LigneCmdClient } from 'src/app/models/ligne-cmd-client';
import { CommandeClientService } from 'src/app/services/commande-client.service';
import { LigneCmdClientService } from 'src/app/services/ligne-cmd-client.service';

@Component({
  selector: 'app-create-ligne-commande',
  templateUrl: './create-ligne-commande.component.html',
  styleUrls: ['./create-ligne-commande.component.scss']
})
export class CreateLigneCommandeComponent implements OnInit {

  listArticle: Produit[];
  isValid: boolean = true;
  formData: FormGroup;
  isInvalidQte;

  total = 0;

  constructor(public lcmdService: LigneCmdClientService,
              private cmdService: CommandeClientService,
              private articleService: ProduitService,
              public fb: FormBuilder,
              private toastr :ToastrService,
              @Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<CreateLigneCommandeComponent>,
   ) { }

  get f() { return this.lcmdService.dataForm.controls; }

  ngOnInit() {
    if (this.data.lcommandeIndex == null) {
      this.infoForm();
    }else {
      this.lcmdService.dataForm = this.fb.group(Object.assign({}, this.cmdService.list[this.data.lcommandeIndex]));
      console.log(this.lcmdService.dataForm);
    }

    this.articleService.getAllProductsOrderByDesignationAsc().subscribe(
      response =>{
        this.listArticle = response;
      }
    );

  }

  infoForm() {
    this.lcmdService.dataForm = this.fb.group({
      id: null,
      OrderId: [this.data.OrderId, [Validators.required]],
      ItemId:  [, [Validators.required]],
      numero:  [this.data.numeroCommande, [Validators.required]],
      prix: [ , [Validators.required]],
      quantite: [ , [Validators.required]],
      qteStock: [ , [Validators.required]],
      ItemName: ['', [Validators.required]],
      prixCommande: [, [Validators.required]],
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
    //  this.f['prix'].setValue(0);
      this.f['prixCommande'].setValue(0);
      this.f['quantite'].setValue(0);
      this.f['ItemName'].setValue('');
      this.f['qteStock'].setValue(0);
    } else {
    //  this.f['prix'].setValue(this.listArticle[ctrl.selectedIndex-1].prixVente);
      this.f['prixCommande'].setValue(this.listArticle[ctrl.selectedIndex-1].prixVente);

      this.f['ItemName'].setValue(this.listArticle[ctrl.selectedIndex-1].designation);

      this.f['qteStock'].setValue(this.listArticle[ctrl.selectedIndex-1].qtestock);
    }
    this.calculTotal();
  }

  calculTotal() {
/*     this.total = parseFloat((this.lcmdService.dataForm.value.quantite * this.lcmdService.dataForm.value.prixCommande).toFixed(2)); */
    this.total = parseFloat((this.lcmdService.dataForm.value.quantite * this.lcmdService.dataForm.value.prixCommande).toFixed(2));
    this.f['total'].setValue(this.total);
  }

  onSubmit() {
    if (this.validateForm()){
      if ((this.data.lcommandeIndex == null)  || (this.lcmdService.dataForm.invalid)) {
        this.cmdService.list.push(this.lcmdService.dataForm.value);
        this.dialogRef.close();
      }else {
        this.cmdService.list[this.data.lcommandeIndex] = this.lcmdService.dataForm.value;
      }
      this.dialogRef.close();

    }else {

      this.toastr.error('Veuillez vérifier le prix et la quantité saisies','Données non valides', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });

    }

  }

  validateForm() {
    this.isValid = false;
    if ((this.lcmdService.dataForm.value.quantite <= 0) ||
        (this.lcmdService.dataForm.value.quantite > this.lcmdService.dataForm.value.qteStock))
      this.isValid = false;
    else
      this.isValid = true;
    return this.isValid;
  }

  /* validateForm(formData: LigneCmdClient){
    this.isValid=true;
    if(formData.produit.id==0)
      this.isValid=false;
    else if(formData.quantite==0)
      this.isValid=false;
    return this.isValid;
  } */

}
