import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Appro } from 'src/app/models/appro';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApproService } from 'src/app/services/appro.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CreateApproComponent } from '../create-appro/create-appro.component';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { Fournisseur } from 'src/app/models/fournisseur';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-list-appro',
  templateUrl: './list-appro.component.html',
  styleUrls: ['./list-appro.component.scss']
})
export class ListApproComponent implements OnDestroy, OnInit {

  listData: Appro[];

  fournisseur;

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: ApproService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateApproComponent>,
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.crudApi.getAllAppros().subscribe(
      response =>{
        this.listData = response;
        console.log(this.listData);
        this.dtTrigger.next();
      }
    );

    this.fournisseur = new Fournisseur();
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

  getListAppros() {
    this.crudApi.getAllAppros().subscribe(
      response =>{
        this.listData = response;

      });

  }

  onCreateAppro() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("approvisionnement");
  }

  deleteAppro(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cet Approvisionnement ?')) {
    this.crudApi.deleteApprovisionnement(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Approvisionnement supprimé avec succès!');
          this.rerender
          this.getListAppros();
        },
        error => console.log(error)
      );
    }

  }

  editeAppro(item : Appro) {

    this.router.navigateByUrl('approvisionnement/'+item.id);

  }

  viewAppro() {

  }

}
