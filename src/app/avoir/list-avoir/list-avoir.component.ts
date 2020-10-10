import { Component, OnInit, Inject, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Avoir } from 'src/app/models/avoir';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { AvoirService } from 'src/app/services/avoir.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { CreateAvoirComponent } from '../create-avoir/create-avoir.component';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-list-avoir',
  templateUrl: './list-avoir.component.html',
  styleUrls: ['./list-avoir.component.scss']
})
export class ListAvoirComponent implements OnDestroy, OnInit {

  listData : Avoir[];

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: AvoirService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateAvoirComponent>
    ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListAvoirs();
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

    this.crudApi.getAllAvoirs().subscribe(
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

  getListAvoirs() {
    this.crudApi.getAllAvoirs().subscribe(
      response =>{this.listData = response;}
    );

  }

  onCreateAvoir(){
    this.crudApi.choixmenu = "A";
    //this.router.navigateByUrl("contrats/new");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateAvoirComponent, dialogConfig);
  }

  editerAvoir(item : Avoir) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateAvoirComponent, dialogConfig);

  }
  deleteAvoir(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cet Avoir ?')) {
    this.crudApi.deleteAvoir(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Avoir supprimé avec succès!');
          this.rerender();
          this.getListAvoirs();
      },
        error => console.log(error));
    }

  }
  editAvoir(item : Avoir) {

    this.router.navigateByUrl('avoirs/'+item.id);

  }


}
