import { Component, OnInit, Inject } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { EmailService } from 'src/app/services/email.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-envoi-email-client',
  templateUrl: './envoi-email-client.component.html',
  styleUrls: ['./envoi-email-client.component.scss']
})
export class EnvoiEmailClientComponent implements OnInit {

  constructor(public crudApi: ClientService, private mailService: EmailService,
    public fb: FormBuilder, public toastr: ToastrService, private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<EnvoiEmailClientComponent>,
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
    console.log(this.crudApi.dataForm.value);
    this.mailService.sendMailToCustomer(this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success("Email Envoyé avec Succès");
    //  this.getListFournisseurs();
      this.router.navigate(['/clients']);
    });
  }

}
