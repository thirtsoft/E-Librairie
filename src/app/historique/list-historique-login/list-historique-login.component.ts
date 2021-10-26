import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/services/dialog.service';
import { HistoriqueLoginService } from './../../services/historique-login.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HistoriqueLogin } from './../../models/historiqueLogin';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-historique-login',
  templateUrl: './list-historique-login.component.html',
  styleUrls: ['./list-historique-login.component.scss']
})
export class ListHistoriqueLoginComponent implements OnInit {

  listData: HistoriqueLogin[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: HistoriqueLoginService,
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
        this.getListHistoriqueLogins();
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
    this.crudApi.getAllHistoriqueLoginsOrderDesc().subscribe(
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


  getListHistoriqueLogins() {
    this.crudApi.getAllHistoriqueLoginsOrderDesc().subscribe(
      response =>{
        this.listData = response;
      }
    );
  }


  deleteHistoriqueLogin(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteHistoriqueLogin(id).subscribe(data => {
          this.toastr.warning('HistoriqueLogins supprimé avec succès!');
          this.rerender();
          this.getListHistoriqueLogins();
        });
      }
    });
  }

  viewUtilisateurs() {
    this.router.navigateByUrl('home/utilisateurs')
  }


}
