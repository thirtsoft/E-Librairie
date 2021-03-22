import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Appro } from 'src/app/models/appro';
import { ApproService } from 'src/app/services/appro.service';

@Component({
  selector: 'app-update-status-appro',
  templateUrl: './update-status-appro.component.html',
  styleUrls: ['./update-status-appro.component.scss']
})
export class UpdateStatusApproComponent implements OnInit {

  listData : Appro[];

  StatusList= ['PAYEE','MORATOIRE','NONPAYEE'];

  constructor(public crudApi: ApproService, public toastr: ToastrService, public fb: FormBuilder,
    private router : Router, @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<UpdateStatusApproComponent>,
    ) { }

  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){
      this.infoForm()
    };
  }

  infoForm() {
    this.crudApi.formData = this.fb.group({
      id: null,
      status: ['', [Validators.required]],
    });
  }

  getListAppro() {
    this.crudApi.getAllAppros().subscribe(
      response =>{this.listData = response;}
    );
  }

  ResetForm() {
      this.crudApi.formData.reset();
  }

  onSubmit() {
    this.crudApi.updateStatusApproCreance(this.crudApi.formData.value.id,this.crudApi.formData.value.status).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Status Appro Modifier avec Succès");
      this.crudApi.filter('Register click');
      this.getListAppro();
      this.router.navigate(['/home/approvisionnements']);
    });
  }

  updateStatusAppro(){
    this.crudApi.updateStatusApproCreance(this.crudApi.formData.value.id,this.crudApi.formData.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Status Appro Modifier avec Succès");
      this.crudApi.filter('Register click');
      this.getListAppro();
      this.router.navigate(['/home/approvisionnements']);
    });
  }


}
