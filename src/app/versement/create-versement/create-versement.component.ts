import { Component, OnInit, Inject } from '@angular/core';
import { Versement } from 'src/app/models/versement';
import { Employe } from 'src/app/models/employe';
import { VersementService } from 'src/app/services/versement.service';
import { EmployeService } from 'src/app/services/employe.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-versement',
  templateUrl: './create-versement.component.html',
  styleUrls: ['./create-versement.component.scss']
})
export class CreateVersementComponent implements OnInit {

  formDataVersement = new Versement();
  listEmployes: Employe[];
  submitted = false;

  fileVersement: File;

  constructor(public crudApi: VersementService, public empService: EmployeService ,
    public toastr: ToastrService, private datePipe : DatePipe,
    private router : Router, public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<CreateVersementComponent>,
  ) { }

  ngOnInit() {
    this.getEmployes();
    if (!isNullOrUndefined(this.data.verId)) {
      this.formDataVersement = Object.assign({},this.crudApi.listData[this.data.verId])
    }

  }

  getEmployes() {
    this.empService.getAllEmployes().subscribe((response) => {
      this.listEmployes = response as Employe[];});
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  selectFileVersement(event) {
    this.fileVersement = event.target.files[0];
  }

  onSubmit() {
    if(isNullOrUndefined(this.data.verId)) {
      /* this.crudApi.createVersementWithFile(this.formDataVersement, this.fileVersement).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Versement Ajouté avec Succès");
        this.crudApi.getAllVersements().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/versements']);
      }); */

      this.saveVersement();

    }else {
      /* this.crudApi.updateVersement(this.formDataVersement.id, this.formDataVersement).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Versement Modifiée avec Succès");
        this.crudApi.getAllVersements().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/versements']);
      }); */
      this.updateVersement();
    }

  }

  saveVersement() {
    this.crudApi.createVersementWithFile(this.formDataVersement, this.fileVersement).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Versement Ajouté avec Succès");
        this.router.navigate(['/home/versements']);
      });
  }

  updateVersement(){
    this.crudApi.updateVersement(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Versement Modifier avec Succès");
      this.crudApi.getAllVersements().subscribe(
        response =>{this.crudApi.listData = response;}
      );
      this.router.navigate(['/home/versements']);
    });

  }

}
