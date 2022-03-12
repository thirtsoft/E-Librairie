import { DashboardService } from 'src/app/services/dashboard.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Component, OnInit, OnDestroy, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Charge } from 'src/app/models/charge';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { ChargeService } from 'src/app/services/charge.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { CreateChargeComponent } from '../create-charge/create-charge.component';
import { DataTableDirective } from 'angular-datatables';
import { DialogService } from 'src/app/services/dialog.service';
import { DatePipe } from '@angular/common';
import { CategorieCharge } from 'src/app/models/categorieCharge';

@Component({
  selector: 'app-list-charge',
  templateUrl: './list-charge.component.html',
  styleUrls: ['./list-charge.component.scss']
})
export class ListChargeComponent implements OnDestroy, OnInit {

  listData : Charge[];
  charge: Charge;
  chargeID: number;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  info: any;
  roles: string[];

  isLoggedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  showAssocieBoard = false;
  showGerantBoard = false;
  showVendeurBoard = false;

  sumTotalOfChargebyYear;

  constructor(public crudApi: ChargeService,
              public dashboarservice: DashboardService,
              private dialogService: DialogService,
              public toastr: ToastrService,
              private tokenService: TokenStorageService,
              public fb: FormBuilder,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<CreateChargeComponent>,
  ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListCharges();
      })
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showManagerBoard = this.roles.includes("ROLE_MANAGER");
      this.showAssocieBoard = this.roles.includes('ROLE_ASSOCIE');
      this.showGerantBoard = this.roles.includes('ROLE_GERANT');
      this.showVendeurBoard = this.roles.includes('ROLE_VENDEUR');

    };

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 35,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.crudApi.getAllChargesOrderDesc().subscribe(
      response =>{
        this.crudApi.listData = response;
        this.dtTrigger.next();
      }
    );

    this.getSumTotalOfChargeByYear();
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

  getSumTotalOfChargeByYear() {
    this.dashboarservice.getSumTotalOfChargeByYear().subscribe(
      response =>{
        this.sumTotalOfChargebyYear = response;
      }
    );
  }

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.crudApi.formData = {
      id: null,
      codeCharge: '',
      nature: '',
      montantCharge: 0,
      date: new Date(),
      categorieCharge: new CategorieCharge()
    };
  }

  getListCharges() {
    this.crudApi.getAllChargesOrderDesc().subscribe(
      response =>{
        this.listData = response;
      }
    );

  }

  addOrEditCharge(id?: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data = {
      id
    };
    this.matDialog.open(CreateChargeComponent, dialogConfig);
  }

  onCreateCharge(){
    this.crudApi.choixmenu == 'A';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateChargeComponent, dialogConfig);
  }

  editCharge(item : Charge) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateChargeComponent, dialogConfig);
  }


  deleteCharge(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteCharge(id).subscribe(data => {
          this.toastr.warning('Charge supprimé avec succès!');
          this.rerender();
          this.getListCharges();
        });
      }
    });
  }


}
