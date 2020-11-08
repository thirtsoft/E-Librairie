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

//  formData: LigneCmdClient;
  listArticle: Article[];
  isValid: boolean = true;
  approvisionnement: any;
  produit: any;
  total = 0;
  lcom: LigneCmdClient;

  formData: FormGroup;

  constructor(public lcmdService: LigneCmdClientService, private toastr :ToastrService,
    @Inject(MAT_DIALOG_DATA) public data, private articleService: ArticleService,
    private cmdService: CommandeClientService,public fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateLigneCmdClientComponent>,
   ) { }

  get f() { return this.formData.controls; }

  ngOnInit() {
    if (this.data.lcommandeIndex == null) {
      this.infoForm();
    }else {
      this.formData = this.fb.group(Object.assign({}, this.cmdService.list[this.data.lcommandeIndex]));
      console.log(this.formData);
    }

    this.articleService.getAllArticles().subscribe(
      response =>{
        this.listArticle = response;
      }
    );
  /*
    if (this.data.lcommandeIndex == null)
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
      this.formData = Object.assign({}, this.cmdService.orderItems[this.data.lcommandeIndex]);
      console.log(this.formData);
      */
  }
  infoForm() {
    this.formData = this.fb.group({
      OrderItemId: null,
      OrderId: this.data.OrderId,
      ItemId: 0,
      numero: this.data.numeroCommande,
      prix: 0,
      quantite: 0,
      ItemName: '',
     // code_article: '',
      total: 0,
      produit: new Article(),
     // commande: new CommandeClient(),
    });
  }

  compareProduit(prod1: Article, prod2: Article) : boolean {
    return prod1 && prod2 ? prod1.id === prod2.id : prod1 === prod2;

  }

  selectPrice(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.f['prix'].setValue(0);
      this.f['quantite'].setValue(0);
      this.f['ItemName'].setValue('');
    } else {
      this.f['prix'].setValue(this.listArticle[ctrl.selectedIndex-1].prixVente);

      this.f['ItemName'].setValue(this.listArticle[ctrl.selectedIndex-1].designation);
    }
    this.calculTotal();
  }
  calculTotal() {
    this.total = parseFloat((this.formData.value.quantite * this.formData.value.prix).toFixed(2));
    this.f['total'].setValue(this.total);

  }
  /*
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
*/
  onSubmit() {
    if (this.data.lcommandeIndex == null) {
      this.cmdService.list.push(this.formData.value);
      this.dialogRef.close();
    }else {
      this.cmdService.list[this.data.lcommandeIndex] = this.formData.value;
    }
    this.dialogRef.close();
  }
  /*
  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.lcommandeIndex == null) {
        this.cmdService.orderItems.push(form.value);
      }
      else {
        this.cmdService.orderItems[this.data.lcommandeIndex] = form.value;
      }
      this.dialogRef.close();
    }

  }
  */

 validateForm(formData:LigneCmdClient){
  this.isValid=true;
  if(formData.ItemId==0)
    this.isValid=false;
    else if(formData.quantite==0)
    this.isValid=false;
    return this.isValid;
}
/*
  validateForm(formData: LigneCmdClient) {
    this.isValid = true;
    if (formData.ItemId==0)
      this.isValid = false;
    else if (formData.quantite==0)
      this.isValid = false;
    return this.isValid;
  }
*/
}

