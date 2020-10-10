import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { LigneVente } from 'src/app/models/ligne-vente';
import { Vente } from 'src/app/models/vente';
import { Article } from 'src/app/models/article';
import { Scategorie } from 'src/app/models/scategorie';
import { Categorie } from 'src/app/models/categorie';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { LigneVenteService } from 'src/app/services/ligne-vente.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateLigneVenteComponent } from '../create-ligne-vente/create-ligne-vente.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-list-ligne-vente',
  templateUrl: './list-ligne-vente.component.html',
  styleUrls: ['./list-ligne-vente.component.scss']
})
export class ListLigneVenteComponent implements OnDestroy, OnInit {

  listData : LigneVente[];

  vente: Vente = new Vente();
  produit: Article = {
    id: null,
    reference: '',
    designation: '',
    photo: '',
    add_date: new Date(),
    prixAchat: 0,
    prixVente: 0,
    prixDetail: 0,
    promo: false,
    tva: 0,
    qtestock: 0,
    stockInitial: 0,
    scategorie: new Scategorie(),
    categorie: new Categorie(),


  };

  produit1;
  commande1;

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: LigneVenteService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
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

    this.crudApi.getAllLigneVentes().subscribe(
      response =>{
        this.listData = response;
        console.log(response);
        this.dtTrigger.next();
      }
    );

    this.commande1 = new Vente();
   // this.produit1= new Article() = {}
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
    this.crudApi.getAllLigneVentes().subscribe(
      response =>{this.listData = response;

      });

  }

  onCreateLigneVente() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("vente");
  }

  deleteLigneVente(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer ce Détails Vente ?')) {
    this.crudApi.deleteLigneVente(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Détails Vente supprimé avec succès!');
          this.rerender();
          this.getListLigneVentes();
      },
        error => console.log(error));
    }

  }

  editerLigneVente(item : LigneVente) {

    this.router.navigateByUrl('detailsVente/'+item.OrderItemId);

  }


}
