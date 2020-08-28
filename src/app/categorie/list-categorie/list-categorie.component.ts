import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/categorie';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategorieService } from 'src/app/services/categorie.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.scss']
})
export class ListCategorieComponent implements OnInit {

  categorie: Categorie;

  listData : Categorie[];

  private editForm: FormGroup;

  constructor(public crudApi: CategorieService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router
    ) { }


  ngOnInit() {
    this.getListCategories();
  }

  getListCategories() {
    this.crudApi.getAllCategories().subscribe(
      response =>{this.listData = response;}
    );

  }

  onCreateCategorie(){
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("categories/new");
   /* const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%"; */
    //dialogConfig.data="gdddd";
   // this.matDialog.open(CreateClientComponent, dialogConfig);
  }
  deleteCategorie(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cet Categorie ?')) {
    this.crudApi.deleteCategorie(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.success('Categorie supprimé avec succès!');
          this.getListCategories();
      },
        error => console.log(error));
    }

  }
  editCategorie(item : Categorie) {

    this.router.navigateByUrl('categories/'+item.id);

  }

}
