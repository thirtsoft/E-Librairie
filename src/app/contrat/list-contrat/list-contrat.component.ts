import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Contrat } from 'src/app/models/contrat';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ContratService } from 'src/app/services/contrat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from "@angular/material/dialog";
import { CreateContratComponent } from '../create-contrat/create-contrat.component';
import { DataTableDirective } from 'angular-datatables';
import { DialogService } from 'src/app/services/dialog.service';
import { EditContratComponent } from '../edit-contrat/edit-contrat.component';
import { Client } from 'src/app/models/client';
import { DatePipe } from '@angular/common';
import { ViewContratComponent } from '../view-contrat/view-contrat.component';

@Component({
  selector: 'app-list-contrat',
  templateUrl: './list-contrat.component.html',
  styleUrls: ['./list-contrat.component.scss']
})
export class ListContratComponent implements OnDestroy, OnInit {

  listData : Contrat[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: ContratService,  private dialogService: DialogService,
     public toastr: ToastrService, private datePipe: DatePipe,
    public fb: FormBuilder, private router : Router, private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private currentRoute: ActivatedRoute,
    public dialogRef:MatDialogRef<CreateContratComponent>,
    ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListContrats();
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

    this.crudApi.getAllContrats().subscribe(
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

  getListContrats() {
    this.crudApi.getAllContrats().subscribe(
      response =>{this.crudApi.listData = response;}
    );
  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  onCreateContrat(){
    this.crudApi.choixmenu = "A";
    //this.router.navigateByUrl("contrats/new");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateContratComponent, dialogConfig);
  }

  addEditContrat(id?: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data = {
      id
    };
    this.matDialog.open(CreateContratComponent, dialogConfig);
  }

  viewContrat(id?: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data = {
      id
    };
    this.matDialog.open(ViewContratComponent, dialogConfig);
  }

/*
  downloadFile(fileName){

    this.fileDownloadService.downloadFile({'filename':fileName})
    .subscribe(data => {

      saveAs(new Blob([data],{type:"application/pdf"}),fileName);

    })

  }
*/



/*   deleteContrat(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer ce Contrat ?')) {
    this.crudApi.deleteContrat(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Contrat supprimé avec succès!');
          this.rerender();
          this.getListContrats();
      },
        error => console.log(error));
    }

  } */

  deleteContrat(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteContrat(id).subscribe(data => {
          this.toastr.warning('Contrat supprimé avec succès!');
          this.rerender();
          this.getListContrats();
        });
      }
    });
  }


}
