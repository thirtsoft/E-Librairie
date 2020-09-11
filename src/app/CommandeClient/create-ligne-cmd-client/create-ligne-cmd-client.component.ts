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
  commande: any;
  produit: any;

  constructor(public lcomService: LigneCmdClientService, private toastr :ToastrService,
    @Inject(MAT_DIALOG_DATA) public data, private articleService: ArticleService,
    private commandeService: CommandeClientService,public fb: FormBuilder,
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
      if (this.data.orderItemIndex == null) {
        this.commandeService.orderItems.push(form.value);
      }
      else {
        this.commandeService.orderItems[this.data.orderItemIndex] = form.value;
      }
      this.dialogRef.close();
    }

  }

  validateForm(formData: LigneCmdClient) {
    this.isValid = true;
    if (formData.ItemId==0)
      this.isValid = false;
    else if (formData.quantite == 0)
      this.isValid = false;
    return this.isValid;
  }

}





 /*  formData: FormGroup;
  articleList:Article[];
  isValid:boolean=true;
  wtotht = 0;
  wtottva = 0;
  wtotttc = 0;
  constructor(public service: LigneCmdClientService, private toastr :ToastrService,
    @Inject(MAT_DIALOG_DATA)  public data, private articleService: ArticleService,
    private commandeService: CommandeClientService,public fb: FormBuilder,
    public dialogRef:MatDialogRef<CreateLigneCmdClientComponent>,

  ){}

  get f() { return this.formData.controls; } */

  /* ngOnInit() {
    if(this.data.lcommandeIndex == null) {
      this.InfoForm();
    } else {
      this.formData =this.fb.group(Object.assign({},this.commandeService.list[this.data.lcommandeIndex]));
    }

    this.articleService.getAllArticles().subscribe(
      response =>{this.articleList= response;}
    );
  } */

 /*  InfoForm() {
    this.formData = this.fb.group({
      id: null,
      numero :0,
      quantite : 0,
      prix : 0,
      tva : 0,
      totht : 0,
      tottva :0,
      totttc :0,
      code_article :'',
      libart :'', */
     // comm_id : this.data.id,
      //prod_id : this.data.id
  //  });

  //}

/*   selectPrice(ctrl){
    if(ctrl.selectedIndex == 0){
      this.formData.get('prix').setValue(0);
      this.formData.get('tva').setValue(0);
      this.formData.get('libart').setValue('');
      this.formData.get('quantite').setValue(0);
    }
    else{
      this.formData.get('prix').setValue(this.articleList[ctrl.selectedIndex-1].prixVente);
      this.formData.get('tva').setValue(this.articleList[ctrl.selectedIndex-1].tva);
      this.formData.get('libart').setValue(this.articleList[ctrl.selectedIndex - 1].designation);
      this.formData.get('code_article').setValue( this.articleList[ctrl.selectedIndex - 1].id);
    }
    this.cal();
  } */

/*
  cal(){

  this.wtotht =  parseFloat((this.formData.value.quantite * this.formData.value.prix).toFixed(3));
  this.wtottva = parseFloat(((this.wtotht * this.formData.value.tva)*0.01).toFixed(3));
  this.wtotttc = parseFloat((this.wtotht + this.wtottva).toFixed(3));
  this.formData.get('totht').setValue(this.wtotht); */
 /* this.formData.get('tottva').setValue(this.wtottva);
  this.formData.get('totttc').setValue(this.wtotttc); */
  //}

  /* onSubmit() {
    if(this.data.lcommandeIndex==null) {
      this.commandeService.list.push(this.formData.value)
      this.dialogRef.close();
    } else {
      this.commandeService.list[this.data.lcommandeIndex] = this.formData.value;
    }

    this.dialogRef.close();

  } */

  /* validateForm(formData: LigneCmdClient){
    this.isValid=true;
    if(formData.produit.reference=='')
      this.isValid=false;
    else if(formData.quantite ==0)
      this.isValid=false;
    return this.isValid;
  }
 */


