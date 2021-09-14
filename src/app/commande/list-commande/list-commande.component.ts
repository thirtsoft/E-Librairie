import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CommandeClient } from 'src/app/models/commande-client';
import { CommandeClientService } from 'src/app/services/commande-client.service';
import { DialogService } from 'src/app/services/dialog.service';
import { CreateCommandeComponent } from '../create-commande/create-commande.component';

@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.scss']
})
export class ListCommandeComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: CommandeClientService,
              public toastr: ToastrService,
              private dialogService: DialogService,
              private datePipe : DatePipe,
              public fb: FormBuilder,
              private router : Router,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<CreateCommandeComponent>
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.crudApi.getAllCommandeClients().subscribe(
      response =>{
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

  getListCommandeClients() {
    this.crudApi.getAllCommandeClients().subscribe(
      response =>{
        this.crudApi.listData = response;
      });
  }

  onCreateCommandeClient() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("home/commande");
  }

  editCommandeClient(item: CommandeClient) {
    this.crudApi.formData = this.fb.group(Object.assign({}, item));
    this.crudApi.choixmenu = "M"
    this.router.navigate(['/home/commandeclient']);
  }

  viewCommandeClient(item: CommandeClient) {
    this.router.navigateByUrl('home/commandeView/' + item.id);
  }

  deleteCommandeClient(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteCommande(id).subscribe(data => {
          this.toastr.warning('Commande supprimé avec succès!');
          this.rerender();
          this.getListCommandeClients();
          this.router.navigate(['/home/listcommandes']);
        });
      }
    });
  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd, h:mm:ss');
  }

}
