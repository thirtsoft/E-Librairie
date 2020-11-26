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

@Component({
  selector: 'app-create-charge',
  templateUrl: './create-charge.component.html',
  styleUrls: ['./create-charge.component.scss']
})
export class CreateChargeComponent implements OnInit {

  public charge = new Charge();
  listData: Charge[];
  submitted = false;
  dtTrigger: Subject<any> = new Subject();

  constructor(public crudApi: ChargeService,public fb: FormBuilder,
    public toastr: ToastrService, private router : Router, private datePipe : DatePipe,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<CreateChargeComponent>,

  ) { }

  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){
      this.infoForm()
    };

  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      codeCharge: ['', [Validators.required]],
      nature: ['', [Validators.required]],
      montantCharge: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });

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
  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.saveCharge();
    }else {
      this.updateCharge();
    }

  }

  saveCharge() {
    this.crudApi.createCharge(this.crudApi.dataForm.value)
      .subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Charge Ajouté avec Succès");
        this.getListCharges();
        this.router.navigate(['/charges']);
    });
  }

  updateCharge(){
    this.crudApi.updateCharge(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Charge Modifier avec Succès");
      this.crudApi.filter('Register click');
      this.getListCharges();
      this.router.navigate(['/charges']);
    });

  }


}
