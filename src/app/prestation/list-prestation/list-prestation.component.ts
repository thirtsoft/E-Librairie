import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CreatePrestationComponent } from './../create-prestation/create-prestation.component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DialogService } from 'src/app/services/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { PrestationService } from './../../services/prestation.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Prestation } from './../../models/prestation';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';

@Component({
  selector: 'app-list-prestation',
  templateUrl: './list-prestation.component.html',
  styleUrls: ['./list-prestation.component.scss']
})
export class ListPrestationComponent implements OnInit {

  listData: Prestation[];
  clientID: number;

  editForm: FormGroup;

  sumPrestationInMonth;

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

  constructor(public crudApi: PrestationService,
              public fb: FormBuilder,
              public toastr: ToastrService,
              private dialogService: DialogService,
              private tokenService: TokenStorageService,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<CreatePrestationComponent>,
  ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListPrestations();
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
      pageLength: 25,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.crudApi.getAllPrestationsOrderDesc()
      .subscribe(
        response =>{
          this.crudApi.listData = response;
          this.dtTrigger.next();
        }
    );

    this.getSumPrestationInMonth();
  }

  getSumPrestationInMonth() {
    this.crudApi.getSumsOfPrestationsByMonth()
      .subscribe(
        response =>{
          this.sumPrestationInMonth = response;
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

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.crudApi.formData = {
      id: null,
      designation: '',
      montant: 0,
      datePrestation: new Date(),
    };

  }

  getListPrestations() {
    this.crudApi.getAllPrestationsOrderDesc()
      .subscribe(
        response =>{
          this.crudApi.listData = response;
        }
      );

  }

  onCreatePrestation(){
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreatePrestationComponent, dialogConfig);
  }

  editPrestation(item : Prestation) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreatePrestationComponent, dialogConfig);
  }

  deletePrestation(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deletePrestation(id).subscribe(data => {
          this.toastr.error('avec succès','Client supprimé', {
            timeOut: 1500,
            positionClass: 'toast-top-right',
          });
          this.rerender();
          this.getListPrestations();
        });
      }
    });
  }



}
