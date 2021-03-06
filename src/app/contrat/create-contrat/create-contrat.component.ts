import { Component, OnInit, Inject } from '@angular/core';
import { Contrat } from 'src/app/models/contrat';
import { Client } from 'src/app/models/client';
import { ContratService } from 'src/app/services/contrat.service';
import { ClientService } from 'src/app/services/client.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-contrat',
  templateUrl: './create-contrat.component.html',
  styleUrls: ['./create-contrat.component.scss']
})
export class CreateContratComponent implements OnInit {

  public contrat = new Contrat();
  formDataContrat: Contrat  = new Contrat();

  listClient:  Client[];


  fileContrat: File;

  submitted = false;

  constructor(public crudApi: ContratService, public clientService: ClientService ,
    public toastr: ToastrService, private datePipe : DatePipe,
    private router : Router, public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<CreateContratComponent>,

  ) { }


  ngOnInit() {
    this.getClients();
    if (!isNullOrUndefined(this.data.id)) {
      this.formDataContrat = Object.assign({},this.crudApi.listData[this.data.id])
    }
  }

  getClients() {
    this.clientService.getAllClients().subscribe((response) => {
      this.listClient = response as Client[];});
  }

  infoForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.crudApi.formData = {
      id: null,
      reference: '',
      nature: '',
      fileContrat: '',
      montantContrat: 0,
      description: '',
      dateDebutContrat: new Date(),
      dateFinContrat: new Date(),
      client: new Client()
    };
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  // selectionner une image et la garder
  selectFileContrat(event) {
    this.fileContrat = event.target.files[0];
  }

  onSubmit() {
    if(isNullOrUndefined(this.data.id)) {
      this.crudApi.createContrat2(this.formDataContrat, this.fileContrat).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Contrat Ajouté avec Succès");
       /*  this.crudApi.getAllContrats().subscribe(
          response =>{this.crudApi.listData = response;},
        ); */
        this.router.navigate(['/home/contrats']);
      });

    }else {
      this.crudApi.updateContrat(this.formDataContrat.id, this.formDataContrat).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Contrat Modifiée avec Succès");
        this.crudApi.getAllContrats().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/home/contrats']);
      });
    }

  }

  saveContrat(cont: Contrat) {
    this.crudApi.createContrat(cont).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Contrat Ajouté avec Succès");
      this.crudApi.filter('Register click');
      this.crudApi.getAllContrats().subscribe(
        response =>{this.crudApi.listData = response;},

      );
      this.router.navigate(['/home/contrats']);
    });
  }

  updateContrat(){
    this.crudApi.updateContrat(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Contrat Modifier avec Succès");
      this.crudApi.getAllContrats().subscribe(
        response =>{this.crudApi.listData = response;}
      );
      this.router.navigate(['/home/contrats']);
    });

  }


}
