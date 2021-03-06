import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Creance } from 'src/app/models/creance';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { CreanceService } from 'src/app/services/creance.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { CreateCreanceComponent } from '../create-creance/create-creance.component';
import { DataTableDirective } from 'angular-datatables';
import { DialogService } from 'src/app/services/dialog.service';
import { DatePipe } from '@angular/common';
import { UpdateStatusCreanceComponent } from '../update-status-creance/update-status-creance.component';
import { UpdateSoldeCreanceComponent } from '../update-solde-creance/update-solde-creance.component';

@Component({
  selector: 'app-list-creance',
  templateUrl: './list-creance.component.html',
  styleUrls: ['./list-creance.component.scss']
})
export class ListCreanceComponent implements OnDestroy, OnInit {

  listData : Creance[];
  status: string = "PAYEE";

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: CreanceService, private datePipe : DatePipe,
    public toastr: ToastrService, private dialogService: DialogService,
    public fb: FormBuilder, private router : Router,
    private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateCreanceComponent>,
    ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListCreances();
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

    this.crudApi.getAllCreances().subscribe(
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

  getListCreances() {
    this.crudApi.getAllCreances().subscribe(
      response =>{this.crudApi.listData = response;}
    );
  }

  viewCreance(item: Creance) {
    this.router.navigateByUrl('creanceView/' + item.id);
  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd, h:mm:ss');
  }

  addEditStatus(item : Creance) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(UpdateStatusCreanceComponent, dialogConfig);
  }

  addEditSolde(item : Creance) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(UpdateSoldeCreanceComponent, dialogConfig);
  }

  onCreateCreance() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("creance");
  }

  addEditCreance(creanceId?: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data = {
      creanceId
    };
    this.matDialog.open(CreateCreanceComponent, dialogConfig);

  }

  editerCreance(item : Creance) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateCreanceComponent, dialogConfig);
  }

  deleteCreance(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteCreance(id).subscribe(data => {
          this.toastr.warning('Creance supprimé avec succès!');
          this.rerender();
          this.getListCreances();
        });
      }
    });
  }

  editContrat(item : Creance) {
    this.router.navigateByUrl('creances/'+item.id);
  }


}
