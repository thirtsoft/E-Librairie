import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Charge } from 'src/app/models/charge';
import { ChargeService } from 'src/app/services/charge.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { CategorieChargeService } from 'src/app/services/categorie-charge.service';
import { CategorieCharge } from 'src/app/models/categorieCharge';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-create-charge',
  templateUrl: './create-charge.component.html',
  styleUrls: ['./create-charge.component.scss']
})
export class CreateChargeComponent implements OnInit {

  formDataContrat = new Charge();
  listData: Charge[];
  listCategorieCharge: CategorieCharge[];
  submitted = false;
  dtTrigger: Subject<any> = new Subject();

  constructor(public crudApi: ChargeService,
              public fb: FormBuilder,
              public toastr: ToastrService,
              private catChargeService: CategorieChargeService,
              private router : Router,
              private datePipe : DatePipe,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<CreateChargeComponent>,

  ) { }

  ngOnInit() {
    this.getListCategorieCharges();
    if (!isNullOrUndefined(this.data.id)) {
      this.formDataContrat = Object.assign({},this.crudApi.listData[this.data.id])
    }
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  getListCharges() {
    this.crudApi.getAllCharges().subscribe(
      response =>{this.listData = response;}
    );
  }

  getListCategorieCharges() {
    this.catChargeService.getAllCategorieCharges().subscribe(
      response => {
        this.listCategorieCharge = response;
      }
    );
  }

  onSubmit() {
    if(isNullOrUndefined(this.data.id)) {
      this.crudApi.createCharge(this.formDataContrat).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Charge Ajouté avec Succès");
        this.crudApi.getAllCharges().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/home/charges']);
      },
      (error: HttpErrorResponse) => {
        this.toastr.error("Charge existant déjà, veuillez changez de code");
        }
      );

    }else {
      this.crudApi.updateCharge(this.formDataContrat.id, this.formDataContrat).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Charge Modifiée avec Succès");
        this.crudApi.getAllCharges().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/home/charges']);
      });
    }

  }


  /*
  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.saveCharge();
    }else {
      this.updateCharge();
    }
  }
  */

  saveCharge() {
    this.crudApi.createCharge(this.crudApi.dataForm.value)
      .subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Charge Ajouté avec Succès");
        this.getListCharges();
        this.router.navigate(['/home/charges']);
    });
  }

  updateCharge(){
    this.crudApi.updateCharge(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Charge Modifier avec Succès");
      this.crudApi.filter('Register click');
      this.getListCharges();
      this.router.navigate(['/home/charges']);
    });

  }


}
