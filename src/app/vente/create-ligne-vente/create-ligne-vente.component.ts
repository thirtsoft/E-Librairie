import { Component, OnInit, Inject } from '@angular/core';
import { LigneVente } from 'src/app/models/ligne-vente';
import { Article } from 'src/app/models/article';
import { LigneVenteService } from 'src/app/services/ligne-vente.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ArticleService } from 'src/app/services/article.service';
import { VenteService } from 'src/app/services/vente.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { Vente } from 'src/app/models/vente';

@Component({
  selector: 'app-create-ligne-vente',
  templateUrl: './create-ligne-vente.component.html',
  styleUrls: ['./create-ligne-vente.component.scss']
})
export class CreateLigneVenteComponent implements OnInit {

  formData: LigneVente;
  listArticle: Article[];

  isValid: boolean = true;
  approvisionnement: any;
  produit: any;

  constructor(public lVenteService: LigneVenteService, private toastr :ToastrService,
    @Inject(MAT_DIALOG_DATA) public data, private articleService: ArticleService,
    private venteService: VenteService,public fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateLigneVenteComponent>,
   ) { }

   ngOnInit() {
    this.articleService.getAllArticles().subscribe(
      response =>{
        this.listArticle = response;
      }
    );

    if (this.data.orderItemIndex == null)
      this.formData = {
        OrderItemId: null,
        OrderId: this.data.OrderId,
        ItemId: 0,
        numero: '',
        prixVente: 0,
        quantite: 0,
        ItemName: '',
        total: 0,
        produit: new Article(),
        vente: new Vente(),

      }
    else
      this.formData = Object.assign({}, this.venteService.orderItems[this.data.orderItemIndex]);
  }

  selectPrice(ctrl) {
    if (ctrl.selectedIndex==0) {
      this.formData.prixVente = 0;
      this.formData.ItemName = '';
    }
    else {
      this.formData.prixVente = this.listArticle[ctrl.selectedIndex-1].prixDetail;
      this.formData.ItemName = this.listArticle[ctrl.selectedIndex-1].designation;

    }

    this.calculTotal();

  }

  calculTotal() {
    this.formData.total = parseFloat((this.formData.quantite * this.formData.prixVente).toFixed(2));
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null) {
        this.venteService.orderItems.push(form.value);
      }
      else {
        this.venteService.orderItems[this.data.orderItemIndex] = form.value;
      }
      this.dialogRef.close();
    }

  }
  validateForm(formData: LigneVente) {
    this.isValid = true;
    if (formData.ItemId==0)
      this.isValid = false;
    else if (formData.quantite==0)
      this.isValid = false;
    return this.isValid;
  }

}
