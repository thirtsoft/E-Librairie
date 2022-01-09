import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Versement } from 'src/app/models/versement';
import { VersementService } from 'src/app/services/versement.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-upload-file-versement',
  templateUrl: './upload-file-versement.component.html',
  styleUrls: ['./upload-file-versement.component.scss']
})
export class UploadFileVersementComponent implements OnInit {

  listData : Versement[];
  versementFile: File;
  formDataContrat: Versement = new Versement();

  constructor(public crudApi: VersementService,
              public toastr: ToastrService,
              public fb: FormBuilder,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<UploadFileVersementComponent>,
  ) { }

  ngOnInit() {
    if (!isNullOrUndefined(this.data.id)) {
      this.formDataContrat = Object.assign({},this.crudApi.listData[this.data.id])
    }
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  getListVersements() {
    this.crudApi.getAllVersementsOrderDesc().subscribe(
      response =>{this.listData = response;}
    );
  }

  selectFileVersement(event) {
    this.versementFile = event.target.files[0];
  }

  onSubmit() {
    console.log(this.versementFile, this.formDataContrat.id);
    this.crudApi.uploadVersementFileInPah(this.versementFile, this.formDataContrat.id).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Fichier Pdf Modifier avec Succès");
      this.crudApi.filter('Register click');
      this.router.navigate(['/home/versements']);
    });

  }


}
