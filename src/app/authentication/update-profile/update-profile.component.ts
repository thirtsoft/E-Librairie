import { UpdateUsernameInfo, UpdateProfilInfo } from './../../auth/profile-info';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../auth/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  formDataProfile: UpdateProfilInfo  = new UpdateProfilInfo();

  constructor(public crudApi: AuthService,
    public toastr: ToastrService,
    public fb: FormBuilder,
    private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data,
    private route: ActivatedRoute,
    public dialogRef:MatDialogRef<UpdateProfileComponent>,
    ) { }

  ngOnInit() {

  }

  infoForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.formDataProfile = {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    console.log(this.formDataProfile.username);
    console.log(this.formDataProfile.name);
    this.crudApi.updateProfil(this.formDataProfile).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Profil Utilisateur Modifier avec Succès");
      console.log(data);
    });
  }


}
