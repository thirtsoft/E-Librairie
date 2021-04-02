import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Register } from 'src/app/auth/register';
import { Login } from 'src/app/auth/login';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ToastrService } from 'ngx-toastr';

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
  roles: string[] = [];
  loginInfo: Login;

  constructor(private authService: AuthService,
    private router : Router,
    private tokenService: TokenStorageService,
    private toastr :ToastrService) { }

  ngOnInit() { }

  onSubmit() {
  //  console.log(this.form);
    this.signupInfo = new Register(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password,
    );
    
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        console.log("User register Succeffuly");
        this.toastr.warning("User register Succeffuly");
        this.router.navigateByUrl("home");
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
