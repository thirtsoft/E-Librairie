import { Component, OnInit, Inject } from '@angular/core';
import { LigneAppro } from 'src/app/models/ligne-appro';
import { Appro } from 'src/app/models/appro';
import { Article } from 'src/app/models/article';
import { Scategorie } from 'src/app/models/scategorie';
import { Categorie } from 'src/app/models/categorie';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { LigneApproService } from 'src/app/services/ligne-appro.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CreateLigneApproComponent } from '../create-ligne-appro/create-ligne-appro.component';

@Component({
  selector: 'app-list-ligne-appro',
  templateUrl: './list-ligne-appro.component.html',
  styleUrls: ['./list-ligne-appro.component.scss']
})
export class ListLigneApproComponent implements OnInit {

  listData : LigneAppro[];

  appro: Appro = new Appro();
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

  constructor(public crudApi: LigneApproService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateLigneApproComponent>,
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.crudApi.getAllLigneAppros().subscribe(
      response =>{
        this.listData = response;
        console.log(response);
        this.dtTrigger.next();
      }
    );

    this.commande1 = new Appro();
   // this.produit1= new Article() = {}
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
    this.router.navigateByUrl("approvisionnement");
  }

  deleteLigneAppro(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer ce Détails Appro ?')) {
    this.crudApi.deleteLigneAppro(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Détails Appro supprimé avec succès!');
          this.getListLigneAppros();
      },
        error => console.log(error));
    }

  }

  editerLigneAppro(item : LigneAppro) {

    this.router.navigateByUrl('detailsApprovisionnement/'+item.OrderItemId);

  }

}
