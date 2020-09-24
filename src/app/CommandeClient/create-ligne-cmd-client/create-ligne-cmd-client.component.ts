import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Article } from 'src/app/models/article';
import { LigneCmdClientService } from 'src/app/services/ligne-cmd-client.service';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/services/article.service';
import { CommandeClientService } from 'src/app/services/commande-client.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LigneCmdClient } from 'src/app/models/ligne-cmd-client';
import { CommandeClient } from 'src/app/models/commande-client';

@Component({
  selector: 'app-create-ligne-cmd-client',
  templateUrl: './create-ligne-cmd-client.component.html',
  styleUrls: ['./create-ligne-cmd-client.component.scss']
})
export class CreateLigneCmdClientComponent implements OnInit {

  formData: LigneCmdClient;
  listArticle: Article[];

  isValid: boolean = true;
  approvisionnement: any;
  produit: any;

  constructor(public lcmdService: LigneCmdClientService, private toastr :ToastrService,
    @Inject(MAT_DIALOG_DATA) public data, private articleService: ArticleService,
    private cmdService: CommandeClientService,public fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateLigneCmdClientComponent>,
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
        commande: new CommandeClient(),

      }
    else
      this.formData = Object.assign({}, this.cmdService.orderItems[this.data.orderItemIndex]);
  }

  selectPrice(ctrl) {
    if (ctrl.selectedIndex==0) {
      this.formData.prix = 0;
      this.formData.ItemName = '';
    }
    else {
      this.formData.prix = this.listArticle[ctrl.selectedIndex-1].prixVente;
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
        this.cmdService.orderItems.push(form.value);
      }
      else {
        this.cmdService.orderItems[this.data.orderItemIndex] = form.value;
      }
      this.dialogRef.close();
    }

  }
  validateForm(formData: LigneCmdClient) {
    this.isValid = true;
    if (formData.ItemId==0)
      this.isValid = false;
    else if (formData.quantite==0)
      this.isValid = false;
    return this.isValid;
  }

}

