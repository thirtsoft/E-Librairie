import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { Creance } from 'src/app/models/creance';
import { CreanceService } from 'src/app/services/creance.service';
import { UpdatePasswordInfo } from 'src/app/auth/profile-info';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  formDataProfile: UpdatePasswordInfo  = new UpdatePasswordInfo();

  constructor(public crudApi: AuthService, public toastr: ToastrService, public fb: FormBuilder,
    private router : Router, @Inject(MAT_DIALOG_DATA)  public data,  private route: ActivatedRoute,
    public dialogRef:MatDialogRef<UpdatePasswordComponent>,
    ) { }

  ngOnInit() {

  }

  infoForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.formDataProfile = {
      username: '',
      password: '',
      newPassword: '',
    };
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    console.log(this.formDataProfile.username);
    console.log(this.formDataProfile.password);
    this.crudApi.updatePassword(this.formDataProfile).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Password Modifier avec Succès");
      console.log(data);
    });
  }

}
