import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/services/dialog.service';
import { HistoriqueVenteService } from './../../services/historique-vente.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HistoriqueVente } from './../../models/historiqueVente';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-historique-vente',
  templateUrl: './list-historique-vente.component.html',
  styleUrls: ['./list-historique-vente.component.scss']
})
export class ListHistoriqueVenteComponent implements OnInit {

  listData: HistoriqueVente[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: HistoriqueVenteService,
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
        this.getListHistoriqueVentes();
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
    this.crudApi.getAllHistoriqueVentesOrderDesc().subscribe(
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


  getListHistoriqueVentes() {
    this.crudApi.getAllHistoriqueVentesOrderDesc().subscribe(
      response =>{
        this.listData = response;
      }
    );
  }


  deleteHistoriqueVente(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteHistoriqueVente(id).subscribe(data => {
          this.toastr.warning('HistoriqueVente supprimé avec succès!');
          this.rerender();
          this.getListHistoriqueVentes();
        });
      }
    });
  }

  viewVentes() {
    this.router.navigateByUrl('home/ventes')
  }


}
