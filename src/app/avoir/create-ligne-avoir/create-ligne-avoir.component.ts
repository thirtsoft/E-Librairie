import { Component, OnInit, Inject } from '@angular/core';
import { Article } from 'src/app/models/article';
import { LigneAvoir } from 'src/app/models/ligne-avoir';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LigneAvoirService } from 'src/app/services/ligne-avoir.service';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/services/article.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AvoirService } from 'src/app/services/avoir.service';
import { Avoir } from 'src/app/models/avoir';

@Component({
  selector: 'app-create-ligne-avoir',
  templateUrl: './create-ligne-avoir.component.html',
  styleUrls: ['./create-ligne-avoir.component.scss']
})
export class CreateLigneAvoirComponent implements OnInit {

  listArticle: Article[];
  isValid: boolean = true;
  avoir: any;
  produit: any;
  total = 0;
  lavoir: LigneAvoir;

  formData: FormGroup;

  constructor(public crudApi: LigneAvoirService, private toastr :ToastrService,
    @Inject(MAT_DIALOG_DATA) public data, private articleService: ArticleService,
    private avoirService: AvoirService,public fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateLigneAvoirComponent>,
   ) { }

  get f() { return this.formData.controls; }

  ngOnInit() {
    if (this.data.lavoirIndex == null) {
      this.infoForm();
    }else {
      this.formData = this.fb.group(Object.assign({}, this.avoirService.list[this.data.lavoirIndex]));
      console.log(this.formData);
    }

    this.articleService.getAllArticles().subscribe(
      response =>{
        this.listArticle = response;
      }
    );
  }

  infoForm() {
    this.formData = this.fb.group({
      id: null,
      OrderId: this.data.OrderId,
      ItemId: 0,
      numero: this.data.numeroCommande,
      prix: 0,
      quantite: 0,
      qteStock: 0,
      ItemName: '',
      total: 0,
      produit: new Article(),
      avoir: new Avoir(),
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

  calculTotal() {
    this.total = parseFloat((this.formData.value.quantite * this.formData.value.prix).toFixed(2));
    this.f['total'].setValue(this.total);
  }
  onSubmit() {
    if (this.data.lavoirIndex == null) {
      this.avoirService.list.push(this.formData.value);
      this.dialogRef.close();
    }else {
      this.avoirService.list[this.data.lavoirIndex] = this.formData.value;
    }
    this.dialogRef.close();
  }
 validateForm(formData: LigneAvoir){
  this.isValid=true;
  if(formData.produit.id==0)
    this.isValid=false;
    else if(formData.quantite==0)
    this.isValid=false;
    return this.isValid;
 }

}
