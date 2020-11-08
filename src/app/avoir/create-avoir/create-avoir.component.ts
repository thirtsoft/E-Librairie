import { Component, OnInit, Inject } from '@angular/core';
import { Avoir } from 'src/app/models/avoir';
import { Fournisseur } from 'src/app/models/fournisseur';
import { AvoirService } from 'src/app/services/avoir.service';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-create-avoir',
  templateUrl: './create-avoir.component.html',
  styleUrls: ['./create-avoir.component.scss']
})
export class CreateAvoirComponent implements OnInit {

  public avoir = new Avoir();
  formDataAvoir = new Avoir();
  listFournisseurs: Fournisseur[];

  submitted = false;

  constructor(public crudApi: AvoirService, public fourService: FournisseurService ,
    public fb: FormBuilder, public toastr: ToastrService, private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data, public dialogRef:MatDialogRef<CreateAvoirComponent>,

  ) { }

  ngOnInit() {
    this.getFournisseurs();
    if (!isNullOrUndefined(this.data.avoirId)) {
      this.formDataAvoir = Object.assign({},this.crudApi.listData[this.data.avoirId])
    }

  }

  getFournisseurs() {
    this.fourService.getAllFournisseurs().subscribe((response) => {
      this.listFournisseurs = response as Fournisseur[];});
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if(isNullOrUndefined(this.data.avoirId)) {
      this.crudApi.createAvoir(this.formDataAvoir).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Avoir Ajouté avec Succès");
        this.crudApi.getAllAvoirs().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/avoirs']);
      });

    }else {
      this.crudApi.updateAvoir(this.formDataAvoir.id, this.formDataAvoir).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Avoir Modifiée avec Succès");
        this.crudApi.getAllAvoirs().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/avoirs']);
      });
    }

  }

/*
  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.saveAvoir(this.avoir);
    }else {
      this.updateAvoir();
    }
  }*/

  saveAvoir(avoir: Avoir) {
    this.crudApi.createAvoir(avoir).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success("Avoir Ajouté avec Succès");
      this.crudApi.getAllAvoirs().subscribe(
        response =>{
          this.crudApi.listData = response;
        }

      );
      this.router.navigate(['/avoirs']);
    });
  }

  updateAvoir(){
    this.crudApi.updateAvoir(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Avoir Modifier avec Succès");
      this.crudApi.getAllAvoirs().subscribe(
        response =>{this.crudApi.listData = response;}
      );
      this.router.navigate(['/avoirs']);
    });

  }

}
