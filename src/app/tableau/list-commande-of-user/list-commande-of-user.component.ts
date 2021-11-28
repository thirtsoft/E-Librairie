import { CommandeClientService } from 'src/app/services/commande-client.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-commande-of-user',
  templateUrl: './list-commande-of-user.component.html',
  styleUrls: ['./list-commande-of-user.component.scss']
})
export class ListCommandeOfUserComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: CommandeClientService
    ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getTop500CommandesOrderByIdDesc();
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

    this.getTop500CommandesOrderByIdDesc();



  }

  getTop500CommandesOrderByIdDesc() {
    this.crudApi.getTop500CommandesOrderByIdDesc()
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
