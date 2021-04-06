import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Versement } from 'src/app/models/versement';
import { VersementService } from 'src/app/services/versement.service';

@Component({
  selector: 'app-list-versement-of-employe',
  templateUrl: './list-versement-of-employe.component.html',
  styleUrls: ['./list-versement-of-employe.component.scss']
})
export class ListVersementOfEmployeComponent implements OnInit {

  listData : Versement[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  closeResult: string;

  constructor(public crudApi: VersementService
    ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListOfVersementByEmployes();
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

    this.crudApi.listOfVersementeByEmploye().subscribe(
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

  getListOfVersementByEmployes() {
    this.crudApi.listOfVersementeByEmploye().subscribe(
      response =>{this.listData = response;}
    );
  }

}
