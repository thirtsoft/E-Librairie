import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Creance } from 'src/app/models/creance';
import { CreanceService } from 'src/app/services/creance.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  listData : Creance[];

  constructor(public crudApi: CreanceService, public toastr: ToastrService, public fb: FormBuilder,
    private router : Router, @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<UpdatePasswordComponent>,
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
      this.router.navigate(['/creances']);
    });
  }

  updateStatusCreance(){
    this.crudApi.updateStatusCreance(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Status Creance Modifier avec Succès");
      this.crudApi.filter('Register click');
      this.getListCreances();
      this.router.navigate(['/creances']);
    });
  }

}
