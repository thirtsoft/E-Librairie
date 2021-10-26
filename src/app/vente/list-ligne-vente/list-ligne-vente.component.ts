import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { LigneVente } from 'src/app/models/ligne-vente';
import { Vente } from 'src/app/models/vente';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { LigneVenteService } from 'src/app/services/ligne-vente.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateLigneVenteComponent } from '../create-ligne-vente/create-ligne-vente.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataTableDirective } from 'angular-datatables';
import { DialogService } from 'src/app/services/dialog.service';
import { VenteService } from 'src/app/services/vente.service';
import { Produit } from './../../models/produit';


@Component({
  selector: 'app-list-ligne-vente',
  templateUrl: './list-ligne-vente.component.html',
  styleUrls: ['./list-ligne-vente.component.scss']
})
export class ListLigneVenteComponent implements OnDestroy, OnInit {

  listData : LigneVente[];

  vente: Vente = new Vente();
  produit: Produit = new Produit();

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: LigneVenteService,
              public fb: FormBuilder,
              public toastr: ToastrService,
              private router : Router,
              private dialogService: DialogService,
              private ventService: VenteService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private matDialog: MatDialog,
              public dialogRef:MatDialogRef<CreateLigneVenteComponent>,
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.crudApi.getAllLigneVenteOrderDesc().subscribe(
      response =>{
        this.listData = response;
        console.log(response);
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

  getListLigneVentes() {
    this.crudApi.getAllLigneVenteOrderDesc().subscribe(
      response =>{
        this.listData = response;
      }
    );
  }

  onCreateLigneVente() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("home/vente");
  }

  deleteLigneVente(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteLigneVente(id).subscribe(data => {
           this.toastr.warning('Détails Vente supprimé avec succès!');
          this.rerender();
          this.getListLigneVentes();
        });
      }
    });
  }

}
