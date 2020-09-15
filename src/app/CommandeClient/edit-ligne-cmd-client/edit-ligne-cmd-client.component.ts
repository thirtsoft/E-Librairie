import { Component, OnInit, Inject } from '@angular/core';
import { Article } from 'src/app/models/article';
import { LigneCmdClientService } from 'src/app/services/ligne-cmd-client.service';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/services/article.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CommandeClientService } from 'src/app/services/commande-client.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeClient } from 'src/app/models/commande-client';
import { LigneCmdClient } from 'src/app/models/ligne-cmd-client';

@Component({
  selector: 'app-edit-ligne-cmd-client',
  templateUrl: './edit-ligne-cmd-client.component.html',
  styleUrls: ['./edit-ligne-cmd-client.component.scss']
})
export class EditLigneCmdClientComponent implements OnInit {

  listArticle: Article[];

  public currentLigneCmdClient: any;

  public idLcom: number;

  formData: LigneCmdClient;

  isValid: boolean = true;
  commande: any;
  produit: any;

  constructor(public lcomService: LigneCmdClientService, private toastr :ToastrService,
    @Inject(MAT_DIALOG_DATA) public data, private articleService: ArticleService,
    private commandeService: CommandeClientService,public fb: FormBuilder,
    private route: ActivatedRoute, private router: Router,
    public dialogRef: MatDialogRef<EditLigneCmdClientComponent>,
   ) { }

   ngOnInit() {
    let idLcom = this.route.snapshot.params.id;
    this.commandeService.getCommandeClientById(this.idLcom)
      .subscribe(data => {
        this.currentLigneCmdClient = data;
      },err=> {
      console.log(err);
    });

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
      this.formData = Object.assign({}, this.commandeService.orderItems[this.data.orderItemIndex]);
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
      if (this.data.orderItemIndex == null)
        this.commandeService.orderItems.push(form.value);
      else
        this.commandeService.orderItems[this.data.orderItemIndex] = form.value;
      this.dialogRef.close();
    }
  }

  validateForm(formData: LigneCmdClient) {
    this.isValid = true;
    if (formData.OrderId==0)
      this.isValid = false;
    else if (formData.quantite==0)
      this.isValid = false;
    return this.isValid;
  }

}
