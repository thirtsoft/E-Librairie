import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Appro } from 'src/app/models/appro';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApproService } from 'src/app/services/appro.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { CreateApproComponent } from '../create-appro/create-appro.component';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { Fournisseur } from 'src/app/models/fournisseur';
import { DataTableDirective } from 'angular-datatables';
import { DialogService } from 'src/app/services/dialog.service';
import { DatePipe } from '@angular/common';
import { UpdateMontantApproComponent } from '../update-montant-appro/update-montant-appro.component';
import { UpdateStatusApproComponent } from '../update-status-appro/update-status-appro.component';

@Component({
  selector: 'app-list-appro',
  templateUrl: './list-appro.component.html',
  styleUrls: ['./list-appro.component.scss']
})
export class ListApproComponent implements OnDestroy, OnInit {

  //listData: Appro[];

  listData;

  fournisseur;

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: ApproService, private dialogService: DialogService,
    private datePipe : DatePipe, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateApproComponent>,
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.crudApi.getAllAppros().subscribe(
      response =>{
        this.listData = response;
        console.log(this.listData);
        this.dtTrigger.next();
      }
    );

    this.fournisseur = new Fournisseur();
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

  getListAppros() {
    this.crudApi.getAllAppros().subscribe(
      response =>{
        this.listData = response;
      });

  }

  onCreateAppro() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("approvisionnement");
  }

  addEditMontantAvanceAppro(item : Appro) {
    this.crudApi.choixmenu = "M";
    this.crudApi.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(UpdateMontantApproComponent, dialogConfig);

  }

  addEditStatusAppro(item : Appro) {
    this.crudApi.choixmenu = "M";
    this.crudApi.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(UpdateStatusApproComponent, dialogConfig);

  }

/*  deleteAppro(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cet Approvisionnement ?')) {
    this.crudApi.deleteApprovisionnement(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Approvisionnement supprimé avec succès!');
          this.rerender
          this.getListAppros();
        },
        error => console.log(error)
      );
    }

  } */

  deleteAppro(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteApprovisionnement(id).subscribe(data => {
          this.toastr.warning('Approvisionnement supprimé avec succès!');
          this.rerender
          this.getListAppros();
        });
      }
    });
  }

  editeAppro(item : Appro) {
    this.router.navigateByUrl('approvisionnement/'+item.id);
  }

  viewAppro(item : Appro) {
    this.router.navigateByUrl('approView/'+item.id);
  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd, h:mm:ss');
  }

}
