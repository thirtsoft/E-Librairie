import { Component, OnInit, Inject } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { SmsService } from 'src/app/services/sms.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-envoi-smsclient',
  templateUrl: './envoi-smsclient.component.html',
  styleUrls: ['./envoi-smsclient.component.scss']
})
export class EnvoiSMSClientComponent implements OnInit {

  constructor(public crudApi: ClientService, private smsService: SmsService ,public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<EnvoiSMSClientComponent>,
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
    this.smsService.sendSMSToCustomer(this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success("Sms Envoyé avec Succès");
    //  this.getListFournisseurs();
      this.router.navigate(['/clients']);
    });
  }

}
