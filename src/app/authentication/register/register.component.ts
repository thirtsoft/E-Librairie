import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerList;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit(dataform) {
    this.authService.register(dataform).subscribe(data => {
      this.registerList = data;
    });
  }

}
