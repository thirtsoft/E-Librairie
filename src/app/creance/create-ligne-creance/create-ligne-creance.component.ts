import { Component, OnInit, Inject } from '@angular/core';
import { Article } from 'src/app/models/article';
import { LigneCreance } from 'src/app/models/ligne-creance';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LigneCreanceService } from 'src/app/services/ligne-creance.service';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/services/article.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CreanceService } from 'src/app/services/creance.service';
import { Avoir } from 'src/app/models/avoir';
import { Creance } from 'src/app/models/creance';

@Component({
  selector: 'app-create-ligne-creance',
  templateUrl: './create-ligne-creance.component.html',
  styleUrls: ['./create-ligne-creance.component.scss']
})
export class CreateLigneCreanceComponent implements OnInit {

  listArticle: Article[];
  isValid: boolean = true;
  creance: any;
  produit: any;
  total = 0;
  lcreance: LigneCreance;

  formData: FormGroup;

  constructor(public crudApi: LigneCreanceService, private toastr :ToastrService,
    @Inject(MAT_DIALOG_DATA) public data, private articleService: ArticleService,
    private creanceService: CreanceService,public fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateLigneCreanceComponent>,
   ) { }

  get f() { return this.formData.controls; }

  ngOnInit() {
    if (this.data.lcreanceIndex == null) {
      this.infoForm();
    }else {
      this.formData = this.fb.group(Object.assign({}, this.creanceService.list[this.data.lcreanceIndex]));
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
      creance: new Creance(),
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
    if (this.data.lcreanceIndex == null) {
      this.creanceService.list.push(this.formData.value);
      this.dialogRef.close();
    }else {
      this.creanceService.list[this.data.lcreanceIndex] = this.formData.value;
    }
    this.dialogRef.close();
  }
 validateForm(formData: LigneCreance){
  this.isValid=true;
  if(formData.produit.id==0)
    this.isValid=false;
    else if(formData.quantite==0)
    this.isValid=false;
    return this.isValid;
 }

}
