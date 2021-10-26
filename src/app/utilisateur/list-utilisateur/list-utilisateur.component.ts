import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { TokenStorageService } from './../../auth/token-storage.service';
import { DatePipe } from '@angular/common';
import { DialogService } from './../../services/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { UtilisateurService } from './../../services/utilisateur.service';
import { Utilisateur } from './../../models/utilisateur';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.scss']
})
export class ListUtilisateurComponent implements OnInit {

  listData: Utilisateur[];
  sumVenteByDay;
  info: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: UtilisateurService,
              public toastr: ToastrService,
              private dialogService: DialogService,
              private datePipe : DatePipe,
              private tokenService: TokenStorageService,
              public fb: FormBuilder,
              private router : Router,
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.crudApi.getAllUtilisateurOrderDesc().subscribe(
      response =>{
        this.listData = response;
        console.log(this.listData);
        this.dtTrigger.next();
      }
    );

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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getListUtilisateurs() {
    this.crudApi.getAllUtilisateurOrderDesc().subscribe(
      response =>{this.listData = response;}
    );
  }

  onCreateUtilisateur() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("register");
    this.logout();
  }

  logout() {
    this.tokenService.signOut();
    //  window.location.reload();
    this.router.navigateByUrl("");
  }

  activated() {

  }

  deleteUser(event) {

  }


  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd, h:mm:ss');
  }


}
