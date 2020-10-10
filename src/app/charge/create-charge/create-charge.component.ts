import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Charge } from 'src/app/models/charge';
import { ChargeService } from 'src/app/services/charge.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-charge',
  templateUrl: './create-charge.component.html',
  styleUrls: ['./create-charge.component.scss']
})
export class CreateChargeComponent implements OnInit {

  public charge = new Charge();
  submitted = false;
  dtTrigger: Subject<any> = new Subject();

  constructor(public crudApi: ChargeService,public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<CreateChargeComponent>,

  ) { }

  ngOnInit() {

  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.saveCharge(this.charge);
    }else {
      this.updateCharge();
    }

  }
  saveCharge(cont: Charge) {
    this.crudApi.createCharge(cont).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success("Charge Ajouté avec Succès");

      this.router.navigate(['/charges']);

    });
  }

  updateCharge(){
    this.crudApi.updateCharge(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Charge Modifier avec Succès");
      this.crudApi.getAllCharges().subscribe(
        response =>{this.crudApi.listData = response;}
      );
      this.router.navigate(['/charges']);
    });

  }


}
