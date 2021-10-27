import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfileInfo } from 'src/app/auth/profile-info';
import { UpdateUsernameInfo } from 'src/app/auth/profile-info';
import { Register } from 'src/app/auth/register';
import { Creance } from 'src/app/models/creance';
import { CreanceService } from 'src/app/services/creance.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-update-username',
  templateUrl: './update-username.component.html',
  styleUrls: ['./update-username.component.scss']
})
export class UpdateUsernameComponent implements OnInit {

 // listData : Register[];

  formDataProfile: UpdateUsernameInfo  = new UpdateUsernameInfo();

//  username = '';
//  password = '';
//  profileInfo: ProfileInfo = {} as ProfileInfo;

  constructor(public crudApi: AuthService, 
              public toastr: ToastrService, 
              public fb: FormBuilder,
              private route: ActivatedRoute,
              private router : Router, 
              @Inject(MAT_DIALOG_DATA)  public data,  
              public dialogRef:MatDialogRef<UpdateUsernameComponent>,
  ) { }

  ngOnInit() {

  }

  infoForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.formDataProfile = {
      username: '',
      newUsername: '',
    };
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    console.log(this.formDataProfile.username);
    console.log(this.formDataProfile.newUsername);
    this.crudApi.updateUsername(this.formDataProfile).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Username Modifier avec Succès");
      console.log(data);
    });
  }

}
