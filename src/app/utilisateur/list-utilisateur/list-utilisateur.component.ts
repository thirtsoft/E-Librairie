import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { TokenStorageService } from './../../auth/token-storage.service';
import { AuthService } from 'src/app/auth/auth.service';
import { DatePipe } from '@angular/common';

import { UtilisateurService } from './../../services/utilisateur.service';
import { Utilisateur } from './../../models/utilisateur';
import { ActivatedUserAccount } from './../../auth/profile-info';
import { ViewUtilisateurComponent } from './../../authentication/view-utilisateur/view-utilisateur.component';
import { ActivatedUserComponent } from './../../authentication/activated-user/activated-user.component';
import { CreateUtilisateurComponent } from './../create-utilisateur/create-utilisateur.component';

@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.scss']
})
export class ListUtilisateurComponent implements OnInit {

  formDataProfile: ActivatedUserAccount = new ActivatedUserAccount();

  listData: Utilisateur[];
  sumVenteByDay;

  isActived: boolean = false;
  isEqual: boolean = true;

  id : number;
//  roles;
  currentTime: number = 0;
  img: boolean;

  info: any;
  roles: string[];

  isLoggedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  showAssocieBoard = false;
  showGerantBoard = false;
  showVendeurBoard = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: UtilisateurService,
              private autService: AuthService,
              public toastr: ToastrService,
              private datePipe : DatePipe,
              private tokenService: TokenStorageService,
              public fb: FormBuilder,
              private router : Router,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<CreateUtilisateurComponent>,
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;

      this.showManagerBoard = this.roles.includes("ROLE_MANAGER");
      this.showAssocieBoard = this.roles.includes('ROLE_ASSOCIE');

      this.id = user.id;
    };

    this.crudApi.getAllUtilisateurOrderDesc().subscribe(
      response =>{
        this.crudApi.listData = response;
        console.log(this.crudApi.listData);
        this.dtTrigger.next();
      }
    );

    if (this.crudApi.getUserAvatar(this.id) === null)
      this.img = false;
    else this.img = true;

  }

   /**
   * methode pour recharger automatique le Datatable
   */
  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first in the current context
      dtInstance.destroy();
      // call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  getTS() {
    return this.currentTime;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getListUtilisateurs() {
    this.crudApi.getAllUtilisateurOrderDesc()
      .subscribe(
        response =>{
          this.crudApi.listData = response;}
      );
  }

  onCreateUtilisateur() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("register");
    this.logout();
  }

  logout() {
    this.tokenService.signOut();
  //  this.router.navigateByUrl("");
  }

  infoForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.formDataProfile = {
      idUser: 0,
      activated: true
    };
  }

  ActivatedUser(item : Utilisateur) {
    this.autService.choixmenu = "M";
    this.autService.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(ActivatedUserComponent, dialogConfig);

  }


  addEditUtilisateur(id?: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data = {
      id
    };
    this.matDialog.open(CreateUtilisateurComponent, dialogConfig);
  }

  viewUtilisateur(id?: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data = {
      id
    };
    this.matDialog.open(ViewUtilisateurComponent, dialogConfig);
  }

  deleteUser(event) {

  }


  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd, h:mm:ss');
  }


}
