import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Article } from 'src/app/models/article';
import { LigneCmdClientService } from 'src/app/services/ligne-cmd-client.service';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/services/article.service';
import { CommandeClientService } from 'src/app/services/commande-client.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LigneCmdClient } from 'src/app/models/ligne-cmd-client';
//import { CommandeClient } from 'src/app/models/commande-client';

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
  isInvalidQte;

  formData: FormGroup;

  constructor(public lcmdService: LigneCmdClientService, private cmdService: CommandeClientService,
    private articleService: ArticleService,
    public fb: FormBuilder, private toastr :ToastrService,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<CreateLigneCmdClientComponent>,
   ) { }

  get f() { return this.lcmdService.dataForm.controls; }

  ngOnInit() {
    if (this.data.lcommandeIndex == null) {
      this.infoForm();
    }else {
      this.lcmdService.dataForm = this.fb.group(Object.assign({}, this.cmdService.list[this.data.lcommandeIndex]));
      console.log(this.lcmdService.dataForm);
    }

    this.articleService.getAllArticles().subscribe(
      response =>{
        this.listArticle = response;
      }
    );

  }

  infoForm() {
    this.lcmdService.dataForm = this.fb.group({
     // OrderItemId: null,
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

  compareProduit(prod1: Article, prod2: Article) : boolean {
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

  matchQuantite() {
    this.isInvalidQte = this.lcmdService.dataForm.value.qtestock < this.lcmdService.dataForm.value.quantite
  }

  calculTotal() {
    this.total = parseFloat((this.lcmdService.dataForm.value.quantite * this.lcmdService.dataForm.value.prixCommande).toFixed(2));
    this.f['total'].setValue(this.total);
  }

  onSubmit() {
    if ((this.data.lcommandeIndex == null)  || (this.lcmdService.dataForm.invalid)) {
      this.cmdService.list.push(this.lcmdService.dataForm.value);
      this.dialogRef.close();
    }else {
      this.cmdService.list[this.data.lcommandeIndex] = this.lcmdService.dataForm.value;
    }
    this.dialogRef.close();
  }

 validateForm(formData: LigneCmdClient){
  this.isValid=true;
  if(formData.produit.id==0)
    this.isValid=false;
    else if(formData.quantite==0)
    this.isValid=false;
    return this.isValid;
}

}

