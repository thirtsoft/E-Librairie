import { Component, OnInit, Inject } from '@angular/core';
import { Versement } from 'src/app/models/versement';
import { Employe } from 'src/app/models/employe';
import { VersementService } from 'src/app/services/versement.service';
import { EmployeService } from 'src/app/services/employe.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-versement',
  templateUrl: './create-versement.component.html',
  styleUrls: ['./create-versement.component.scss']
})
export class CreateVersementComponent implements OnInit {

  public versement = new Versement();

  public employes:  Employe[]

  submitted = false;

  constructor(public crudApi: VersementService, public empService: EmployeService ,
    public fb: FormBuilder, public toastr: ToastrService, private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<CreateVersementComponent>,
  ) { }


  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){

     // this.infoForm()};
      this.empService.getAllEmployes().subscribe(
        response =>{this.employes = response;}
      );

    }

 /*  infoForm() {
    let cat = new SousCategorie();
    this.crudApi.dataForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      libelle: ['', [Validators.required]],
      categories: ['', [Validators.required]],

    }); */


  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.saveVersement(this.versement);
    }else {
      this.updateVersement();
    }

  }
  saveVersement(versment: Versement) {
    this.crudApi.createVersement(versment).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success("Versement Ajouté avec Succès");
      this.router.navigate(['/versements']);
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
      this.router.navigate(['/versements']);
    });

  }

}
