import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/services/dialog.service';
import { HistoriqueApproService } from './../../services/historique-appro.service';
import { DataTableDirective } from 'angular-datatables';

import { HistoriqueAppro } from './../../models/historiqueAppro';

@Component({
  selector: 'app-list-historique-appro',
  templateUrl: './list-historique-appro.component.html',
  styleUrls: ['./list-historique-appro.component.scss']
})
export class ListHistoriqueApproComponent implements OnInit {

  fournisseur: HistoriqueAppro[];
  FourID: number;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: HistoriqueApproService,
              private dialogService: DialogService,
              public toastr: ToastrService,
              public fb: FormBuilder,
              private router : Router
  ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListHistoriqueAppros();
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
    this.crudApi.getAllHistoriqueApprosOrderDesc().subscribe(
      response =>{
        this.crudApi.listData = response;
        console.log(this.crudApi.listData);
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


  getListHistoriqueAppros() {
    this.crudApi.getAllHistoriqueApprosOrderDesc().subscribe(
      response =>{
        this.crudApi.listData = response;
        console.log(this.crudApi.listData);
      }
    );
  }


  deleteHistoriqueAppro(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteHistoriqueAppro(id).subscribe(data => {
          this.toastr.warning('HistoriqueAppro supprimé avec succès!');
          this.rerender();
          this.getListHistoriqueAppros();
        });
      }
    });
  }

  viewAppro() {
    this.router.navigateByUrl('home/approvisionnements')
  }



}
