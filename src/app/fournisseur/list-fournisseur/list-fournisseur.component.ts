import { Component, OnInit } from '@angular/core';
import { Fournisseur } from 'src/app/models/fournisseur';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.scss']
})
export class ListFournisseurComponent implements OnInit {

  fournisseur: Fournisseur;

  listData : Fournisseur[];

  private editForm: FormGroup;

  constructor(public crudApi: FournisseurService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router
    ) { }


  ngOnInit() {
    this.getListFournisseurs();
  }

  getListFournisseurs() {
    this.crudApi.getAllFournisseurs().subscribe(
      response =>{this.listData = response;}
    );

  }

  onCreateFournisseur(){
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("fournisseurs/new");
   /* const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%"; */
    //dialogConfig.data="gdddd";
   // this.matDialog.open(CreateClientComponent, dialogConfig);
  }
  deleteFournisseur(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer ce Fournisseur ?')) {
    this.crudApi.deleteFournisseur(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.success('Fournisseur supprimé avec succès!');
          this.getListFournisseurs();
      },
        error => console.log(error));
    }

  }
  editFournisseur(item : Fournisseur) {

    this.router.navigateByUrl('fournisseurs/'+item.id);

  }


}
