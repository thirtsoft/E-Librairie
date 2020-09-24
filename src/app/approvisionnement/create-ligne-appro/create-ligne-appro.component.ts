import { Component, OnInit, Inject } from '@angular/core';
import { LigneAppro } from 'src/app/models/ligne-appro';
import { Article } from 'src/app/models/article';
import { LigneApproService } from 'src/app/services/ligne-appro.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ArticleService } from 'src/app/services/article.service';
import { ApproService } from 'src/app/services/appro.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { Appro } from 'src/app/models/appro';

@Component({
  selector: 'app-create-ligne-appro',
  templateUrl: './create-ligne-appro.component.html',
  styleUrls: ['./create-ligne-appro.component.scss']
})
export class CreateLigneApproComponent implements OnInit {

  formData: LigneAppro;
  listArticle: Article[];

  isValid: boolean = true;
  approvisionnement: any;
  produit: any;

  constructor(public lApproService: LigneApproService, private toastr :ToastrService,
    @Inject(MAT_DIALOG_DATA) public data, private articleService: ArticleService,
    private AppService: ApproService,public fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateLigneApproComponent>,
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
        prix: 0,
        quantite: 0,
        ItemName: '',
        total: 0,
        produit: new Article(),
        approvisionnement: new Appro(),

      }
    else
      this.formData = Object.assign({}, this.AppService.orderItems[this.data.orderItemIndex]);
  }

  selectPrice(ctrl) {
    if (ctrl.selectedIndex==0) {
      this.formData.prix = 0;
      this.formData.ItemName = '';
    }
    else {
      this.formData.prix = this.listArticle[ctrl.selectedIndex-1].prixAchat;
      this.formData.ItemName = this.listArticle[ctrl.selectedIndex-1].designation;

    }

    this.calculTotal();

  }

  calculTotal() {
    this.formData.total = parseFloat((this.formData.quantite * this.formData.prix).toFixed(2));
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null) {
        this.AppService.orderItems.push(form.value);
      }
      else {
        this.AppService.orderItems[this.data.orderItemIndex] = form.value;
      }
      this.dialogRef.close();
    }

  }
  validateForm(formData: LigneAppro) {
    this.isValid = true;
    if (formData.ItemId==0)
      this.isValid = false;
    else if (formData.quantite==0)
      this.isValid = false;
    return this.isValid;
  }

}
