import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-envoi-smsfournisseur',
  templateUrl: './envoi-smsfournisseur.component.html',
  styleUrls: ['./envoi-smsfournisseur.component.scss']
})
export class EnvoiSMSFournisseurComponent implements OnInit {

  constructor(public crudApi: FournisseurService ,public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<EnvoiSMSFournisseurComponent>,
    ) { }

  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){
      this.infoForm()
    };
  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      telephone: ['', [Validators.required]],
    });

  }


  onSubmit() {

  }

}
