import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfileInfo } from 'src/app/auth/profile-info';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UpdatePasswordComponent } from '../update-password/update-password.component';
import { UpdateUsernameComponent } from '../update-username/update-username.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  username = '';
  password = '';
  profileInfo: ProfileInfo = {} as ProfileInfo;
  info;

  constructor(private authService: AuthService, private tokenService: TokenStorageService,
    public toastr: ToastrService, private dialogService: DialogService,
    public fb: FormBuilder, private router : Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<ProfilComponent>,
  ) {
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.params.username;
    this.authService.getUserByUsername(this.username).subscribe(info => {
      this.profileInfo = info;
    });

  //  const user = this.tokenService.getUser();
  //  this.password = user.password

  }

  processForm() {

  }

  onSelectFile(event) {

  }

  addEditUsername(item : ProfileInfo) {
  //  console.log(item.password);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.authService.listData = Object.assign({}, item)
    /* dialogConfig.data = {
      item
    }; */
    this.matDialog.open(UpdateUsernameComponent, dialogConfig);
  }

  addEditPassword(item : ProfileInfo) {
   console.log(item);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.authService.listData = Object.assign({}, item)
    /* dialogConfig.data = {
      item
    }; */
    this.matDialog.open(UpdatePasswordComponent, dialogConfig);

  }

  logout(): void {
    this.tokenService.signOut();
    this.router.navigateByUrl('/');
  }

  editProfil() {

  }

}
