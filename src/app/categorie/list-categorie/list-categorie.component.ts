import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Categorie } from 'src/app/models/categorie';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators, NgForm } from '@angular/forms';
import { CategorieService } from 'src/app/services/categorie.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogRef } from "@angular/material/dialog";
import { DialogService } from 'src/app/services/dialog.service';

import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import { CreateCategorieComponent } from '../create-categorie/create-categorie.component';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.scss']
})
export class ListCategorieComponent implements OnDestroy, OnInit {

  categorie: Categorie;

  listData : Categorie[];
  CatId: number;

  private editForm: FormGroup;

  control: FormControl = new FormControl('');

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild("fileUploadInput")
  fileUploadInput: any;
  mesagge: string;

  constructor(public crudApi: CategorieService, private dialogService: DialogService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog, private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateCategorieComponent>,
    ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListCategories();
      })
  }

  ngOnInit(): void {
    /*
    this.CatId = this.route.snapshot.params.id;
    if (this.CatId == null) {
      this.resetForm();
    }else {
      this.crudApi.getCategorieByID(this.CatId).then(res => {
        this.listData = res.categorie;
      });
    }
    */

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };
    this.crudApi.getAllCategories().subscribe(
      response =>{
        this.listData = response;
        this.dtTrigger.next();
      });

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

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.crudApi.formData = {
      id: null,
      code: '',
      designation: ''
    };

  }

  getListCategories() {
    this.crudApi.getAllCategories().subscribe(
      response =>{this.listData = response;}
    );

  }

  onCreateCategorie(){
    this.crudApi.choixmenu = "A";
    //this.router.navigateByUrl("categories/new");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="30%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(CreateCategorieComponent, dialogConfig);
  }

  selectData(item : Categorie) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateCategorieComponent, dialogConfig);
  }
/*
  deleteCategorie(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cet Categorie ?')) {
    this.crudApi.deleteCategorie(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Categorie supprimé avec succès!');
          this.rerender();
          this.getListCategories();
      },
        error => console.log(error));
    }

  } */

  deleteCategorie(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteCategorie(id).subscribe(data => {
          this.toastr.warning('Categorie supprimé avec succès!');
          this.rerender();
          this.getListCategories();
        });
      }
    });
  }

  /*
  editCategorie(item : Categorie) {
    this.router.navigateByUrl('categories/'+item.id);
  }
*/

  uploadExcelFile() {
    let formData = new FormData();
    console.log(formData)
    formData.append('file', this.fileUploadInput.nativeElement.files[0]);
    this.crudApi.uploadCategorieExcelFile(formData).subscribe(result => {
      console.log(result);
      this.mesagge = result.toString();
      this.toastr.warning('Fichier Importé avec succès!');
      this.rerender();
      this.getListCategories();
    })
  }

  generateExcel() {
    this.crudApi.generateExcelFile();
    this.toastr.warning('Fichier Télécharger avec succès!');
  }


  generatePdf() {
    this.crudApi.exportPdfCategories().subscribe(x => {
      const blob = new Blob([x], {type: 'application/pdf'});
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob);
        return;

      }
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'categories.pdf';
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));

      setTimeout(function() {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100)

    });
    this.toastr.warning('Fichier Exportée avec succès!');

  }


}
