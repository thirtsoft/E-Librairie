import { Component, Inject, OnInit, ViewChild } from '@angular/core';

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
import { ViewUtilisateurComponent } from './../../authentication/view-utilisateur/view-utilisateur.component';


@Component({
  selector: 'app-employe-avec-compte',
  templateUrl: './employe-avec-compte.component.html',
  styleUrls: ['./employe-avec-compte.component.scss']
})
export class EmployeAvecCompteComponent implements OnInit {

  listData: Utilisateur[];
  sumVenteByDay;

  isActived: boolean = false;
  isEqual: boolean = true;

  id : number;
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
              private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showManagerBoard = this.roles.includes("ROLE_MANAGER");
      this.showAssocieBoard = this.roles.includes('ROLE_ASSOCIE');
      this.showGerantBoard = this.roles.includes('ROLE_GERANT');
      this.showVendeurBoard = this.roles.includes('ROLE_VENDEUR');

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

  detailVenteEmploye(item: Utilisateur) {
    this.router.navigateByUrl('home/employe/detail-vente/' + item.id);
   

  }

  logout() {
    this.tokenService.signOut();
  //  this.router.navigateByUrl("");
  }



  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd, h:mm:ss');
  }


}
