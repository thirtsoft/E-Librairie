import { Component, OnInit } from '@angular/core';
import { Scategorie } from 'src/app/models/scategorie';
import { Categorie } from 'src/app/models/categorie';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ScategorieService } from 'src/app/services/scategorie.service';
//import { CategorieService } from 'src/app/services/categorie.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-scategorie',
  templateUrl: './list-scategorie.component.html',
  styleUrls: ['./list-scategorie.component.scss']
})
export class ListScategorieComponent implements OnInit {

  listData : Scategorie[];

  listCategorie : Categorie[];

  private editForm: FormGroup;

  constructor(public crudApi: ScategorieService,
    public fb: FormBuilder, public toastr: ToastrService,
    private router : Router
    ) { }


  ngOnInit() {
    this.getListScategories();
  }

  getListScategories() {
    this.crudApi.getAllScategories().subscribe(
      response =>{this.listData = response;}
    );

  }

  onCreateScategorie(){
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("scategories/new");
   /* const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%"; */
    //dialogConfig.data="gdddd";
   // this.matDialog.open(CreateClientComponent, dialogConfig);
  }
  deleteScategorie(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cette Sous-Categorie ?')) {
    this.crudApi.deleteScategorie(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.success('Scategorie supprimé avec succès!');
          this.getListScategories();
      },
        error => console.log(error));
    }

  }
  editScategorie(item : Scategorie) {

    this.router.navigateByUrl('scategories/'+item.id);

  }

}
