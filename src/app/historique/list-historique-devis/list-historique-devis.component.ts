import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/services/dialog.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { HistoriqueChargeService } from './../../services/historique-charge.service';
import { HistoriqueCharge } from './../../models/historiqueCharge';

@Component({
  selector: 'app-list-historique-devis',
  templateUrl: './list-historique-devis.component.html',
  styleUrls: ['./list-historique-devis.component.scss']
})
export class ListHistoriqueDevisComponent implements OnInit {

  listData: HistoriqueCharge[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: HistoriqueChargeService,
              private dialogService: DialogService,
              public toastr: ToastrService,
              public fb: FormBuilder,
              private router : Router,
   //           @Inject(MAT_DIALOG_DATA) public data: any,
   //           public dialogRef:MatDialogRef<CreateFournisseurComponent>,
  ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListHistoriqueCharges();
      })
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };
    this.crudApi.getAllHistoriqueChargesOrderDesc().subscribe(
      response =>{
        this.listData = response;
        console.log(this.listData);
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


  getListHistoriqueCharges() {
    this.crudApi.getAllHistoriqueChargesOrderDesc().subscribe(
      response =>{
        this.listData = response;
      }
    );
  }


  deleteHistoriqueCharge(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteHistoriqueCharge(id).subscribe(data => {
          this.toastr.warning('HistoriqueCharge supprimé avec succès!');
          this.rerender();
          this.getListHistoriqueCharges();
        });
      }
    });
  }

  viewCharge() {
    this.router.navigateByUrl('home/charges')
  }


}
