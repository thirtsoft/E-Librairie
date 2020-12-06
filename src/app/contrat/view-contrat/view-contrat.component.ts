import { Component, OnInit, Inject } from '@angular/core';
import { Contrat } from 'src/app/models/contrat';
import { Client } from 'src/app/models/client';
import { ContratService } from 'src/app/services/contrat.service';
import { ClientService } from 'src/app/services/client.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-view-contrat',
  templateUrl: './view-contrat.component.html',
  styleUrls: ['./view-contrat.component.scss']
})
export class ViewContratComponent implements OnInit {

  formDataContrat = new Contrat();
  listClient:  Client[];

  constructor(public crudApi: ContratService, public clientService: ClientService ,
    public toastr: ToastrService, private datePipe : DatePipe,
    private router : Router, public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<ViewContratComponent>,

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

}
