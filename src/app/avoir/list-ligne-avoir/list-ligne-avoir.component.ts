import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { LigneAvoir } from 'src/app/models/ligne-avoir';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { LigneAvoirService } from 'src/app/services/ligne-avoir.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AvoirService } from 'src/app/services/avoir.service';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogService } from 'src/app/services/dialog.service';
import { CreateAvoirComponent } from '../create-avoir/create-avoir.component';

@Component({
  selector: 'app-list-ligne-avoir',
  templateUrl: './list-ligne-avoir.component.html',
  styleUrls: ['./list-ligne-avoir.component.scss']
})
export class ListLigneAvoirComponent implements OnInit {

  listDataAvoir: LigneAvoir[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: LigneAvoirService, private avoirService: AvoirService,
    public toastr: ToastrService,private dialogService: DialogService,
    private router : Router, public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog,
    public dialogRef:MatDialogRef<CreateAvoirComponent>,
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.crudApi.getAllLigneAvoirs().subscribe(
      response =>{
        this.listDataAvoir = response;
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

  getListLigneAvoirs() {
    this.crudApi.getAllLigneAvoirs().subscribe(
      response =>{this.listDataAvoir = response;
      }
    );
  }

  onCreateAvoir() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("avoir");
  }

  deleteLigneAvoir(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteLigneAvoir(id).subscribe(data => {
          this.toastr.warning('Détails Avoir supprimé avec succès!');
          this.rerender();
          this.getListLigneAvoirs();
        });
      }
    });
  }


}
