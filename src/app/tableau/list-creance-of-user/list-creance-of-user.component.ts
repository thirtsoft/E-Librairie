import { CreanceService } from 'src/app/services/creance.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-creance-of-user',
  templateUrl: './list-creance-of-user.component.html',
  styleUrls: ['./list-creance-of-user.component.scss']
})
export class ListCreanceOfUserComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: CreanceService
    ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getTop500CreancesOrderByIdDesc();
      })
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this. getTop500CreancesOrderByIdDesc();


  }

  getTop500CreancesOrderByIdDesc() {
    this.crudApi.getTop500CreancesOrderByIdDesc()
    .subscribe(
      response => {
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



}
