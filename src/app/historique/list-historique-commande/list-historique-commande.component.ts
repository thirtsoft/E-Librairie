import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/services/dialog.service';
import { HistoriqueCommandeService } from './../../services/historique-commande.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { HistoriqueCommande } from './../../models/historiqueCommande';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-historique-commande',
  templateUrl: './list-historique-commande.component.html',
  styleUrls: ['./list-historique-commande.component.scss']
})
export class ListHistoriqueCommandeComponent implements OnInit {

  listData: HistoriqueCommande[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: HistoriqueCommandeService,
              private dialogService: DialogService,
              public toastr: ToastrService,
              public fb: FormBuilder,
              private router : Router
  ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListHistoriqueCommandes();
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
    this.crudApi.getAllHistoriqueCommandesOrderDesc().subscribe(
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


  getListHistoriqueCommandes() {
    this.crudApi.getAllHistoriqueCommandesOrderDesc().subscribe(
      response =>{
        this.listData = response;
      }
    );
  }


  deleteHistoriqueCommande(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteHistoriqueCommande(id).subscribe(data => {
          this.toastr.warning('HistoriqueCommande supprimé avec succès!');
          this.rerender();
          this.getListHistoriqueCommandes();
        });
      }
    });
  }

  viewCommande() {
    this.router.navigateByUrl('home/commandes')
  }



}
