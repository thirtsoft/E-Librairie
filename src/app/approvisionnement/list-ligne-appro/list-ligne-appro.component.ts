import { Produit } from './../../models/produit';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { LigneAppro } from 'src/app/models/ligne-appro';
import { Appro } from 'src/app/models/appro';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { LigneApproService } from 'src/app/services/ligne-appro.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CreateLigneApproComponent } from '../create-ligne-appro/create-ligne-appro.component';
import { DataTableDirective } from 'angular-datatables';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-list-ligne-appro',
  templateUrl: './list-ligne-appro.component.html',
  styleUrls: ['./list-ligne-appro.component.scss']
})
export class ListLigneApproComponent implements OnInit {

  //listData : LigneAppro[];

  listData : LigneAppro[];
 // listData : LigneAppro[] = [];


  appro: Appro = new Appro();

  produit: Produit = new Produit();

  /* produit1: Article = {
    id: null, reference: '', designation: '', photo: '',
    add_date: new Date(), prixAchat: 0,
    prixVente: 0, prixDetail: 0, promo: false, tva: 0,
    qtestock: 0, stockInitial: 0,
    scategorie: new Scategorie(), categorie: new Categorie(),
  }; */

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: LigneApproService, private dialogService: DialogService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateLigneApproComponent>,
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.crudApi.getAllLigneAppros().subscribe(
      response =>{
        this.listData = response;
        console.log(response);
        this.dtTrigger.next();
      }
    );

    this.appro = new Appro();
    this.produit = this.produit;
    //console.log(this.produit1);
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

  getListLigneAppros() {
    this.crudApi.getAllLigneAppros().subscribe(
      response =>{this.listData = response;
      }
    );
  }

  onCreateLigneAppro() {
    this.crudApi.choixmenu = "A";
  //  this.router.navigateByUrl("alamine/approvisionnements/approvisionnement");
    this.router.navigateByUrl("home/approvisionnement");

  }

/*  deleteLigneAppro(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer ce Détails Appro ?')) {
    this.crudApi.deleteLigneAppro(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Détails Appro supprimé avec succès!');
          this.rerender();
          this.getListLigneAppros();
      },
        error => console.log(error));
    }
  } */

  deleteLigneAppro(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteLigneAppro(id).subscribe(data => {
          this.toastr.warning('Détails Appro supprimé avec succès!');
          this.rerender();
          this.getListLigneAppros();
        });
      }
    });
  }

  editerLigneAppro(item : LigneAppro) {
    this.router.navigateByUrl('detailsApprovisionnement/'+item.id);
  }

}
