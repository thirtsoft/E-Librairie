import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Vente } from 'src/app/models/vente';
import { VenteService } from 'src/app/services/vente.service';

@Component({
  selector: 'app-list-vente-of-user',
  templateUrl: './list-vente-of-user.component.html',
  styleUrls: ['./list-vente-of-user.component.scss']
})
export class ListVenteOfUserComponent implements OnInit {

  listData : Vente[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: VenteService
    ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getTop500OfVentesOrderByIdDesc();
      })
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.getTop500OfVentesOrderByIdDesc();


  }

  getTop500OfVentesOrderByIdDesc() {
    this.crudApi.getTop500OfVentesOrderByIdDesc()
      .subscribe(
        response => {
          this.crudApi.listData = response;
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

  /* getListOfVenteByEmployees() {
    this.crudApi.listOfVenteByUsers().subscribe(
      response =>{this.listData = response;}
    );
  } */


}
