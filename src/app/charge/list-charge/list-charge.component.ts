import { Component, OnInit, OnDestroy, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Charge } from 'src/app/models/charge';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ChargeService } from 'src/app/services/charge.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { CreateChargeComponent } from '../create-charge/create-charge.component';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-list-charge',
  templateUrl: './list-charge.component.html',
  styleUrls: ['./list-charge.component.scss']
})
export class ListChargeComponent implements OnDestroy, OnInit {

  listData : Charge[];

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: ChargeService,public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateChargeComponent>
    ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListCharges();
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

    this.crudApi.getAllCharges().subscribe(
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

  getListCharges() {
    this.crudApi.getAllCharges().subscribe(
      response =>{this.listData = response;}
    );

  }

  onCreateCharge(){
    this.crudApi.choixmenu = "A";
    //this.router.navigateByUrl("contrats/new");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";

    this.matDialog.open(CreateChargeComponent, dialogConfig);
  }

  editerCharge(item : Charge) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateChargeComponent, dialogConfig);

  }
  deleteCharge(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cette Charge ?')) {
    this.crudApi.deleteCharge(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Charge supprimé avec succès!');
          this.rerender();
          this.getListCharges();
      },
        error => console.log(error));
    }

  }
  editCharge(item : Charge) {

    this.router.navigateByUrl('charges/'+item.id);

  }


}
