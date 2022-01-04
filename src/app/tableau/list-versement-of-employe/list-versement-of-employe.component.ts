import { Creance } from 'src/app/models/creance';
import { CreanceService } from 'src/app/services/creance.service';
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

  listDataCreance: Creance[];
  compteurCreance = 0;
  creanceLimit;
  endDate: Date;
  dateResult: Date;
  dateResult2;
  numberDay;
  dateJour;
  NbreJourLimit;
  convertNumber = 1000 * 60 * 60 * 24;
  corlor = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  closeResult: string;

  constructor(public crudApi: VersementService,
    private creanceService: CreanceService
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
      pageLength: 25,
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

    this.getListCreancesLimiteDateOut();
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

  getListCreancesLimiteDateOut() {
    this.creanceService.getAllCreances().subscribe(response => {
      this.listDataCreance = response;
      console.log(this.listDataCreance);
      for (let i = 0; i < this.listDataCreance.length; i++) {
        this.endDate = new Date(this.listDataCreance[i].dateCreance);
        this.numberDay = this.listDataCreance[i].nbreJours;
        this.dateResult = new Date(this.endDate);
        this.dateResult2 = new Date(this.dateResult.setDate(this.dateResult.getDate() + this.numberDay));
        this.dateJour = new Date();

        this.NbreJourLimit = ((this.dateResult2.getTime())-(this.dateJour.getTime()));

        this.creanceLimit = Math.floor((this.NbreJourLimit)/(this.convertNumber));
        if (this.creanceLimit <= 7) {
          this.compteurCreance++;
          this.corlor = true;
        }
      }
    })
  }

}
