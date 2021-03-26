import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Vente } from 'src/app/models/vente';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { VenteService } from 'src/app/services/vente.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { DialogService } from 'src/app/services/dialog.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-vente',
  templateUrl: './list-vente.component.html',
  styleUrls: ['./list-vente.component.scss']
})
export class ListVenteComponent implements OnDestroy, OnInit {

  listData;
  sumVenteByDay;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: VenteService,public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private dialogService: DialogService, private datePipe : DatePipe,
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.crudApi.getAllVentes().subscribe(
      response =>{
        this.listData = response;
        console.log(this.listData);
        this.dtTrigger.next();
      }
    );

    this.getSumOfVenteByDay();

  }

  getSumOfVenteByDay(): void {
    this.crudApi.getSumVenteByDay().subscribe(data => {
      this.sumVenteByDay = data;
      console.log(this.sumVenteByDay);
    });
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

  getListVentes() {
    this.crudApi.getAllVentes().subscribe(
      response =>{this.listData = response;}
    );
  }

  onCreateVente() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("home/vente");
  }

  deleteVente(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteVente(id).subscribe(data => {
          this.toastr.warning('Vente supprimé avec succès!');
          this.rerender();
          this.getListVentes();
          this.router.navigateByUrl('home/ventes')
        });
      }
    });
  }

  editerVente(item : Vente) {
    this.router.navigateByUrl('home/vente/'+item.id);
  }

  viewVente(item: Vente) {
    this.router.navigateByUrl('home/venteView/' + item.id);
  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd, h:mm:ss');
  }

}
