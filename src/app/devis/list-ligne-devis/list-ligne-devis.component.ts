import { Produit } from './../../models/produit';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Devis } from 'src/app/models/devis';
import { LigneDevis } from 'src/app/models/ligne-devis';
import { DevisService } from 'src/app/services/devis.service';
import { DialogService } from 'src/app/services/dialog.service';
import { LigneDevisService } from 'src/app/services/ligne-devis.service';
import { CreateDevisComponent } from '../create-devis/create-devis.component';

@Component({
  selector: 'app-list-ligne-devis',
  templateUrl: './list-ligne-devis.component.html',
  styleUrls: ['./list-ligne-devis.component.scss']
})
export class ListLigneDevisComponent implements OnInit {

  listData: LigneDevis[] = [];

  devis: Devis = new Devis();
  produit: Produit = new Produit();

  editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: LigneDevisService,
              private dialogService: DialogService,
              public devService: DevisService,
              public toastr: ToastrService,
              public fb: FormBuilder,
              private router : Router,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,

              public dialogRef:MatDialogRef<CreateDevisComponent>,
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.crudApi.getAllLigneDevis().subscribe(
      response =>{
        this.listData = response;
        console.log(response);
        this.dtTrigger.next();
      }
    );

    this.devis = new Devis();
    this.produit = new Produit();
    console.log(this.produit.designation);
  // console.log(this.devService.orderItems);
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

  getListLigneDevis() {
    this.crudApi.getAllLigneDevis().subscribe(
      response =>{this.listData = response;
      }
    );
  }

  onCreateLigneDevis() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("home/devis");
  }

  deleteLigneDevis(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteLigneDevis(id).subscribe(data => {
          this.toastr.warning('Détails Devis supprimé avec succès!');
          this.rerender();
          this.getListLigneDevis();
          this.router.navigateByUrl('home/lisDevis')
        });
      }
    });
  }


}
