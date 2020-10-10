import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Contrat } from 'src/app/models/contrat';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ContratService } from 'src/app/services/contrat.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from "@angular/material/dialog";
import { CreateContratComponent } from '../create-contrat/create-contrat.component';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-list-contrat',
  templateUrl: './list-contrat.component.html',
  styleUrls: ['./list-contrat.component.scss']
})
export class ListContratComponent implements OnDestroy, OnInit {

  listData : Contrat[];

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: ContratService,public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
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

  getListContrats() {
    this.crudApi.getAllContrats().subscribe(
      response =>{this.listData = response;}
    );
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

  editerContrat(item : Contrat) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateContratComponent, dialogConfig);

  }
  deleteContrat(id: number) {
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

  }
  editContrat(item : Contrat) {

    this.router.navigateByUrl('contrats/'+item.id);

  }


}
