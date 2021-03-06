import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { LigneCreance } from 'src/app/models/ligne-creance';
import { Creance } from 'src/app/models/creance';
import { Article } from 'src/app/models/article';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { LigneCreanceService } from 'src/app/services/ligne-creance.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CreanceService } from 'src/app/services/creance.service';
import { DialogService } from 'src/app/services/dialog.service';
import { CreateCreanceComponent } from '../create-creance/create-creance.component';

@Component({
  selector: 'app-list-ligne-creance',
  templateUrl: './list-ligne-creance.component.html',
  styleUrls: ['./list-ligne-creance.component.scss']
})
export class ListLigneCreanceComponent implements OnInit {

  listDataCreance: LigneCreance[];

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: LigneCreanceService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog, public creanceService: CreanceService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialogService: DialogService,
    public dialogRef:MatDialogRef<CreateCreanceComponent>,
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.crudApi.getAllLigneCreances().subscribe(
      response =>{
        this.listDataCreance = response;
        console.log(response);
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

  getListLigneCreances() {
    this.crudApi.getAllLigneCreances().subscribe(
      response =>{this.listDataCreance = response;
      }
    );
  }

  onCreateCreance() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("creance");
  }

  deleteLigneCreance(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteLigneCreance(id).subscribe(data => {
          this.toastr.warning('Détails Creance supprimé avec succès!');
          this.rerender();
          this.getListLigneCreances();
        });
      }
    });
  }

}
