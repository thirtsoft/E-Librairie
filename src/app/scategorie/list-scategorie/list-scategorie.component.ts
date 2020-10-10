import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Scategorie } from 'src/app/models/scategorie';
import { Categorie } from 'src/app/models/categorie';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ScategorieService } from 'src/app/services/scategorie.service';
//import { CategorieService } from 'src/app/services/categorie.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CreateScategorieComponent } from '../create-scategorie/create-scategorie.component';
import { EditScategorieComponent } from '../edit-scategorie/edit-scategorie.component';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-list-scategorie',
  templateUrl: './list-scategorie.component.html',
  styleUrls: ['./list-scategorie.component.scss']
})
export class ListScategorieComponent implements OnDestroy, OnInit {

  listData : Scategorie[];

  listCategorie : Categorie[];

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  closeResult: string;

  constructor(public crudApi: ScategorieService,
    public fb: FormBuilder, public toastr: ToastrService,
    private router : Router,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateScategorieComponent>,
    ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListScategories();
      })
     }


  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.crudApi.getAllScategories().subscribe(
      response =>{
        this.listData = response;
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

  getListScategories() {
    this.crudApi.getAllScategories().subscribe(
      response =>{this.listData = response;}
    );

  }

  onCreateScategorie(){
    this.crudApi.choixmenu = "A";
   // this.router.navigateByUrl("scategorie");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateScategorieComponent, dialogConfig);
  }

  editerScategorie(item : Scategorie) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";

    this.matDialog.open(CreateScategorieComponent, dialogConfig);
  }
  deleteScategorie(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cette Sous-Categorie ?')) {
    this.crudApi.deleteScategorie(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Scategorie supprimé avec succès!');
          this.getListScategories();
      },
        error => console.log(error));
    }

  }
  editScategorie(item : Scategorie) {

    this.router.navigateByUrl('scategorie/'+item.id);

  }

}
