import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/services/dialog.service';
import { HistoriqueCreanceService } from './../../services/historique-creance.service';
import { DataTableDirective } from 'angular-datatables';
import { HistoriqueCreance } from './../../models/historiqueCreance';
import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-historique-creance',
  templateUrl: './list-historique-creance.component.html',
  styleUrls: ['./list-historique-creance.component.scss']
})
export class ListHistoriqueCreanceComponent implements OnInit {

  listData: HistoriqueCreance[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: HistoriqueCreanceService,
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
        this.getListHistoriqueCreances();
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
    this.crudApi.getAllHistoriqueCreancesOrderDesc().subscribe(
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


  getListHistoriqueCreances() {
    this.crudApi.getAllHistoriqueCreancesOrderDesc().subscribe(
      response =>{
        this.listData = response;
      }
    );
  }


  deleteHistoriqueCreance(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteHistoriqueCreance(id).subscribe(data => {
          this.toastr.warning('HistoriqueCreance supprimé avec succès!');
          this.rerender();
          this.getListHistoriqueCreances();
        });
      }
    });
  }

  viewCreance() {
    this.router.navigateByUrl('home/creances')
  }



}
