import { Component, OnInit, OnDestroy } from '@angular/core';
import { Categorie } from 'src/app/models/categorie';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategorieService } from 'src/app/services/categorie.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.scss']
})
export class ListCategorieComponent implements OnDestroy, OnInit {

  categorie: Categorie;

  listData : Categorie[];

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(public crudApi: CategorieService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router
    ) { }


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.crudApi.getAllCategories().subscribe(
      response =>{
        this.listData = response;
        this.dtTrigger.next();
      }
    );
    //this.getListCategories();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
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
