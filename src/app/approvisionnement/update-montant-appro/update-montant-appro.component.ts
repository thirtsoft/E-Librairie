import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Appro } from 'src/app/models/appro';
import { ApproService } from 'src/app/services/appro.service';

@Component({
  selector: 'app-update-montant-appro',
  templateUrl: './update-montant-appro.component.html',
  styleUrls: ['./update-montant-appro.component.scss']
})
export class UpdateMontantApproComponent implements OnInit {

  listData : Appro[];

  constructor(public crudApi: ApproService,
              public toastr: ToastrService,
              public fb: FormBuilder,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<UpdateMontantApproComponent>,
  ) { }

  ngOnInit() {
    if (this.crudApi.choixmenu == 'A'){
      this.infoForm();
    };
  }


  infoForm() {
    this.crudApi.formData = this.fb.group({
      id: [this.crudApi.formData.value.id, [Validators.required]],
      montantAvance: [this.crudApi.formData.value.montantAvance, [Validators.required]],
    });
  }

  getListAppros() {
    this.crudApi.getAllAppros().subscribe(
      response =>{
        this.listData = response;
      }
    );
  }

  ResetForm() {
      this.crudApi.formData.reset();
  }

  onSubmit() {
    console.log(this.crudApi.formData.value);
    console.log(this.crudApi.formData.value.id);
    console.log(this.crudApi.formData.value.montantAvance);
    this.crudApi.updateMontantAvanceAppro(this.crudApi.formData.value.id,this.crudApi.formData.value.montantAvance).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("MontantAvancée Modifier avec Succès");
      this.crudApi.filter('Register click');
      this.getListAppros();
      this.router.navigate(['/home/approvisionnements']);
    });
  }

  updateMontantAnceAppro(){
    this.crudApi.updateMontantAvanceAppro(this.crudApi.formData.value.id,this.crudApi.formData.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("MontantAvancée Modifier avec Succès");
      this.crudApi.filter('Register click');
      this.getListAppros();
      this.router.navigate(['/home/approvisionnements']);
    });
  }

}
