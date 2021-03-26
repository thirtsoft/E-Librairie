import { Component, OnInit, Inject } from '@angular/core';
import { Creance } from 'src/app/models/creance';
import { CreanceService } from 'src/app/services/creance.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-update-solde-creance',
  templateUrl: './update-solde-creance.component.html',
  styleUrls: ['./update-solde-creance.component.scss']
})
export class UpdateSoldeCreanceComponent implements OnInit {

  listData : Creance[];

  constructor(public crudApi: CreanceService, public toastr: ToastrService, public fb: FormBuilder,
    private router : Router, @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<UpdateSoldeCreanceComponent>,
    ) { }

  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){
      this.infoForm()
    };
  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      avanceCreance: ['', [Validators.required]],
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
    this.crudApi.updateAvanceCreance(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value.avanceCreance).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Solde Creance Modifier avec Succès");
      this.crudApi.filter('Register click');
      this.getListCreances();
      this.router.navigate(['/home/creances']);
    });
  }
/*
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
*/

}
