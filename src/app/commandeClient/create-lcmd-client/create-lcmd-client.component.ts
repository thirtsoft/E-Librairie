import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Article } from 'src/app/models/article';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleService } from 'src/app/services/article.service';
import { CmdClientService } from 'src/app/services/cmd-client.service';
import { LcmdClientService } from 'src/app/services/lcmd-client.service';
import { LcmdClient } from 'src/app/models/lcmd-client';

@Component({
  selector: 'app-create-lcmd-client',
  templateUrl: './create-lcmd-client.component.html',
  styleUrls: ['./create-lcmd-client.component.scss']
})
export class CreateLcmdClientComponent implements OnInit {

  formData: FormGroup;
  articleList:Article[];
  isValid:boolean=true;
  wtotht = 0;
  wtottva = 0;
  wtotttc = 0;
  constructor( public service:LcmdClientService,private toastr :ToastrService,
    @Inject(MAT_DIALOG_DATA)  public data, private articleService:ArticleService,
    private commandeService:CmdClientService,public fb: FormBuilder,
    public dialogRef:MatDialogRef<CreateLcmdClientComponent>,

  ){}

  get f() { return this.formData.controls; }

  ngOnInit() {
    //if() {
      this.InfoForm();
   // } else {
     //this.formData =this.fb.group(Object.assign({},this.commandeService.list[this.data.lcommandeIndex]));
   // }

    this.articleService.getAllArticles().subscribe(
      response =>{this.articleList= response;}
    );
  }

  InfoForm() {
    this.formData = this.fb.group({
      id: null,
      numero :0,
      quantite : 0,
      prix : 0,
     // comm_id : this.data.id,
      //prod_id : this.data.id
    });

  }

  selectPrice(ctrl){
    if(ctrl.selectedIndex == 0) {

    } else {

    }

  //this.cal();
  }

  cal(){

  /* this.wtotht =  parseFloat((this.formData.value.qte * this.formData.value.pu).toFixed(3));
  this.wtottva = parseFloat(((this.wtotht * this.formData.value.tva)*0.01).toFixed(3));
  this.wtotttc = parseFloat((this.wtotht + this.wtottva).toFixed(3));
  this.f['totht'].setValue(this.wtotht);
  this.f['tottva'].setValue(this.wtottva);
  this.f['totttc'].setValue(this.wtotttc); */
  }

  onSubmit() {
    if(this.data.lcommandeIndex==null) {
      this.commandeService.listData.push(this.formData.value)
      this.dialogRef.close();
    } else {
      this.commandeService.listData[this.data.lcommandeIndex] = this.formData.value;
    }

    this.dialogRef.close();

  }

  validateForm(formData:LcmdClient){
    this.isValid=true;
    if(formData.produit.reference=='')
      this.isValid=false;
    else if(formData.quantite ==0)
      this.isValid=false;
    return this.isValid;
  }



}
