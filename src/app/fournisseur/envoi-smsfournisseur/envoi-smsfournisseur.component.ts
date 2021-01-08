import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SmsService } from 'src/app/services/sms.service';

@Component({
  selector: 'app-envoi-smsfournisseur',
  templateUrl: './envoi-smsfournisseur.component.html',
  styleUrls: ['./envoi-smsfournisseur.component.scss']
})
export class EnvoiSMSFournisseurComponent implements OnInit {

  constructor(public crudApi: FournisseurService, private smsService: SmsService ,public fb: FormBuilder,
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
      message: ['', [Validators.required]],

    });

  }


  onSubmit() {
    this.smsService.sendSMSToFournisseur(this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success("Sms Envoyé avec Succès");
    //  this.getListFournisseurs();
      this.router.navigate(['/fournisseurs']);
    });
  }

}
