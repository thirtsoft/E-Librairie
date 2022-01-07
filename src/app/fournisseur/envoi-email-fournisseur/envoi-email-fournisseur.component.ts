import { Component, OnInit, Inject } from '@angular/core';
import { Fournisseur } from 'src/app/models/fournisseur';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-envoi-email-fournisseur',
  templateUrl: './envoi-email-fournisseur.component.html',
  styleUrls: ['./envoi-email-fournisseur.component.scss']
})
export class EnvoiEmailFournisseurComponent implements OnInit {

  four: Fournisseur = new Fournisseur();

  constructor(public crudApi: FournisseurService,
              private mailService: EmailService,
              public fb: FormBuilder,
              public toastr: ToastrService,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<EnvoiEmailFournisseurComponent>,
  ) { }

  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){
      this.infoForm()
    };
  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      email: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });

  }


  onSubmit() {
    this.mailService.sendMail(this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success("Email Envoyé avec Succès");
    //  this.getListFournisseurs();
      this.router.navigate(['/fournisseurs']);
    });
  }

  onSubmit12() {
    this.mailService.sendEmail(this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success("Email Envoyé avec Succès");
    //  this.getListFournisseurs();
      this.router.navigate(['/fournisseurs']);
    });
  }

}
