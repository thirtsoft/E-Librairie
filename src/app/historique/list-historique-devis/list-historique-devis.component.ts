import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/services/dialog.service';
import { HistoriqueDevisService } from './../../services/historique-devis.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HistoriqueDevis } from './../../models/historiqueDevis';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-historique-devis',
  templateUrl: './list-historique-devis.component.html',
  styleUrls: ['./list-historique-devis.component.scss']
})
export class ListHistoriqueDevisComponent implements OnInit {

  listData: HistoriqueDevis[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: HistoriqueDevisService,
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
        this.getListHistoriqueDevis();
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
    this.crudApi.getAllHistoriqueDevissOrderDesc().subscribe(
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


  getListHistoriqueDevis() {
    this.crudApi.getAllHistoriqueDevissOrderDesc().subscribe(
      response =>{
        this.listData = response;
      }
    );
  }


  deleteHistoriqueDevis(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteHistoriqueDevis(id).subscribe(data => {
          this.toastr.warning('HistoriqueDevis supprimé avec succès!');
          this.rerender();
          this.getListHistoriqueDevis();
        });
      }
    });
  }

  viewDevis() {
    this.router.navigateByUrl('home/devis')
  }


}
