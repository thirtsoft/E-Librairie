import { Component, OnInit, OnDestroy, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Charge } from 'src/app/models/charge';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { ChargeService } from 'src/app/services/charge.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { CreateChargeComponent } from '../create-charge/create-charge.component';
import { DataTableDirective } from 'angular-datatables';
import { DialogService } from 'src/app/services/dialog.service';
import { DatePipe } from '@angular/common';
import { CategorieCharge } from 'src/app/models/categorieCharge';

@Component({
  selector: 'app-list-charge',
  templateUrl: './list-charge.component.html',
  styleUrls: ['./list-charge.component.scss']
})
export class ListChargeComponent implements OnDestroy, OnInit {

  listData : Charge[];
  charge: Charge;
  chargeID: number;

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: ChargeService, private dialogService: DialogService, public toastr: ToastrService,
    public fb: FormBuilder, private router : Router, private datePipe : DatePipe,
    private matDialog: MatDialog, private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateChargeComponent>,
    ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListCharges();
      })
  }

  ngOnInit() {
    /*
    this.chargeID = this.route.snapshot.params.id;
    if (this.chargeID == null) {
      this.resetForm();
    }else {
      this.crudApi.getChargeByID(this.chargeID).then(res => {
        this.listData = res.charge;
      });
    }
   */

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

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.crudApi.formData = {
      id: null,
      codeCharge: '',
      nature: '',
      montantCharge: 0,
      date: new Date(),
      categorieCharge: new CategorieCharge()
    };
  }

  getListCharges() {
    this.crudApi.getAllCharges().subscribe(
      response =>{this.listData = response;}
    );

  }

  addOrEditCharge(id?: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data = {
      id
    };
    this.matDialog.open(CreateChargeComponent, dialogConfig);
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

  editCharge(item : Charge) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateChargeComponent, dialogConfig);
  }
/*
  deleteCharge(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer ce Charge ?')) {
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
 */

  deleteCharge(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteCharge(id).subscribe(data => {
          this.toastr.warning('Charge supprimé avec succès!');
          this.rerender();
          this.getListCharges();
        });
      }
    });
  }


/*
  editCharge(item : Charge) {
    this.router.navigateByUrl('charges/'+item.id);
  }
*/

}
