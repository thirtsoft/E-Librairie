import { ApproService } from 'src/app/services/appro.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-appro-of-user',
  templateUrl: './list-appro-of-user.component.html',
  styleUrls: ['./list-appro-of-user.component.scss']
})
export class ListApproOfUserComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: ApproService
    ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getTop500ApprovisionnementsOrderByIdDesc();
      });

  }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.getTop500ApprovisionnementsOrderByIdDesc();

  }

  getTop500ApprovisionnementsOrderByIdDesc() {
    this.crudApi.getTop500ApprosOrderByIdDesc()
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

}
