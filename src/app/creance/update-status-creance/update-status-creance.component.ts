import { Component, OnInit, Inject } from '@angular/core';
import { Creance } from 'src/app/models/creance';
import { CreanceService } from 'src/app/services/creance.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-update-status-creance',
  templateUrl: './update-status-creance.component.html',
  styleUrls: ['./update-status-creance.component.scss']
})
export class UpdateStatusCreanceComponent implements OnInit {

  listData : Creance[];

  StatusList= ['PAYEE','MORATOIRE','NONPAYEE'];

  constructor(public crudApi: CreanceService, public toastr: ToastrService, public fb: FormBuilder,
    private router : Router, @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<UpdateStatusCreanceComponent>,
    ) { }

  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){
      this.infoForm()
    };
  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      status: ['', [Validators.required]],
    });
  }

  getListCreances() {
    this.crudApi.getAllCreances().subscribe(
      response =>{this.listData = response;}
    );
  }

  ResetForm() {
      this.crudApi.dataForm.reset();
  }

  onSubmit() {
    console.log(this.crudApi.dataForm);
    console.log(this.crudApi.dataForm.value.status);
    this.crudApi.updateStatusCreance(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value.status).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Status Creance Modifier avec Succès");
      this.crudApi.filter('Register click');
      this.getListCreances();
      this.router.navigate(['/home/creances']);
    });
  }

  updateStatusCreance(){
    this.crudApi.updateStatusCreance(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Status Creance Modifier avec Succès");
      this.crudApi.filter('Register click');
      this.getListCreances();
      this.router.navigate(['/home/creances']);
    });
  }

}
