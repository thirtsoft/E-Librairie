import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Employe } from 'src/app/models/employe';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CreateEmployeComponent } from '../create-employe/create-employe.component';
import { DataTableDirective } from 'angular-datatables';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss']
})
export class ListEmployeComponent implements OnDestroy, OnInit {

  emp: Employe;
  listData : Employe[];
  empID: number;

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: EmployeService ,public fb: FormBuilder,
    private route: ActivatedRoute, private router : Router, private dialogService: DialogService,
    public toastr: ToastrService, private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateEmployeComponent>,
    ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListEmployes();
      })
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };
    this.crudApi.getAllEmployes().subscribe(
      response =>{
        this.listData = response;
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

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.crudApi.formData = {
      id: null,
      prenom: '',
      nom: '',
      cni: '',
      adresse: '',
      email: '',
      telephone: '',
      telephone2: ''
    };

  }

  getListEmployes() {
    this.crudApi.getAllEmployes().subscribe(
      response =>{this.listData = response;}
    );
  }

  onCreateEmploye(){
    this.crudApi.choixmenu = "A";
    //this.router.navigateByUrl("employes/new");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateEmployeComponent, dialogConfig);
  }

  editEmploye(item : Employe) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateEmployeComponent, dialogConfig);
  }
  deleteEmploye(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteEmploye(id).subscribe(data => {
          this.toastr.warning('Employe supprimé avec succès!');
          this.rerender();
          this.getListEmployes();
        });
      }
    });
  }
}
