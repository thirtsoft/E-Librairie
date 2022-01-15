import { OrangeSMSapiService } from './../../services/orange-smsapi.service';
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

  constructor(public crudApi: ClientService,
              private smsService: SmsService,
              private sendSMSservice: OrangeSMSapiService,
              public fb: FormBuilder,
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
      mobile: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }


  onSubmit() {
    this.sendSMSservice.sendSMS(this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success('avec succès','Sms Envoyé', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.router.navigate(['/home/clients']);
    });
  }

 /*  onSubmit() {
    this.smsService.sendSMSToCustomer(this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success('avec succès','Sms Envoyé', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.router.navigate(['/home/clients']);
    });
  } */

}
