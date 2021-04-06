import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Register } from 'src/app/auth/register';
import { Login } from 'src/app/auth/login';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  signupInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
//  roles: string[] = [];
//  loginInfo: Login;

   listData: Register;

 //listDataRole: Array<string> = [];
   roles: Array<string> = [];


  //listDataRole;
  listDataRole: Array<string> = ['admin', 'user', 'vendeur'];

  constructor(private authService: AuthService,
    private roleService: RoleService,
    private toastr :ToastrService,
    private router : Router,) { }

  ngOnInit() {
  //  this.getRole();

  }

 /*  getRole() {
    for (let i = 0; i< this.listData.role.length; i++) {
      this.listDataRole = this.listData.role[i];
      console.log(this.listData.role.length);
      console.log(this.listData.role[i]);
    }
  } */

  onSubmit() {
  //  console.log(this.form);
    this.signupInfo = new Register(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password,
     // this.form.role
    );

    console.log(this.signupInfo);
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        console.log("User register Succeffuly");
        this.toastr.warning("User register Succeffuly");
        this.router.navigateByUrl("");
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );

  }

}
