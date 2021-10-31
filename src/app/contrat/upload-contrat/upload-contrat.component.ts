import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { Contrat } from 'src/app/models/contrat';
import { ContratService } from 'src/app/services/contrat.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-upload-contrat',
  templateUrl: './upload-contrat.component.html',
  styleUrls: ['./upload-contrat.component.scss']
})
export class UploadContratComponent implements OnInit {

  listData : Contrat[];
  contratFile: File;
  formDataContrat: Contrat = new Contrat();

  constructor(public crudApi: ContratService,
              public toastr: ToastrService,
              public fb: FormBuilder,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<UploadContratComponent>,
  ) { }

  ngOnInit() {
    if (!isNullOrUndefined(this.data.id)) {
      this.formDataContrat = Object.assign({},this.crudApi.listData[this.data.id])
    }
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  getListContrat() {
    this.crudApi.getAllContrats().subscribe(
      response =>{this.listData = response;}
    );
  }

  selectFileContrat(event) {
    this.contratFile = event.target.files[0];
  }

  onSubmit() {
    console.log(this.contratFile, this.formDataContrat.id);
    this.crudApi.uploadContratFile(this.contratFile, this.formDataContrat.id).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Fichier Pdf Modifier avec Succès");
      this.crudApi.filter('Register click');
      this.router.navigate(['/home/contrats']);
    });

  }


}
