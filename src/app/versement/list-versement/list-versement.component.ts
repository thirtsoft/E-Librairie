import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Versement } from 'src/app/models/versement';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VersementService } from 'src/app/services/versement.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CreateVersementComponent } from '../create-versement/create-versement.component';
import { DataTableDirective } from 'angular-datatables';
import { DialogService } from 'src/app/services/dialog.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-versement',
  templateUrl: './list-versement.component.html',
  styleUrls: ['./list-versement.component.scss']
})
export class ListVersementComponent implements OnDestroy, OnInit {

  listData : Versement[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: VersementService,public fb: FormBuilder,
    public toastr: ToastrService, private router : Router, private datePipe : DatePipe,
    private matDialog: MatDialog, private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateVersementComponent>,
    ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListVersements();
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

    this.crudApi.getAllVersements().subscribe(
      response =>{
        this.crudApi.listData = response;
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

  getListVersements() {
    this.crudApi.getAllVersements().subscribe(
      response =>{this.crudApi.listData = response;}
    );
  }

  onCreateVersement(){
    this.crudApi.choixmenu = "A";
    //this.router.navigateByUrl("versements/new");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data="gdddd";
    this.matDialog.open(CreateVersementComponent, dialogConfig);
  }

  addEditVersement(verId?: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data = {
      verId
    };
    this.matDialog.open(CreateVersementComponent, dialogConfig);

  }

  editerVersement(item : Versement) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateVersementComponent, dialogConfig);
  }
  /*
  deleteVersement(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer ce Versement ?')) {
    this.crudApi.deleteVersement(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Versement supprimé avec succès!');
          this.rerender();
          this.getListVersements();
      },
        error => console.log(error));
    }
  }*/

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  deleteVersement(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteVersement(id).subscribe(data => {
          this.toastr.warning('Versement supprimé avec succès!');
          this.rerender();
          this.getListVersements();
        });
      }
    });
  }

  editVersement(item : Versement) {
    this.router.navigateByUrl('versements/'+item.id);
  }

}
