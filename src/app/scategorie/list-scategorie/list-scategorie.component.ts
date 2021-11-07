import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DataTableDirective } from 'angular-datatables';
import { DialogService } from 'src/app/services/dialog.service';

import { ScategorieService } from 'src/app/services/scategorie.service';
import { Scategorie } from 'src/app/models/scategorie';
import { Categorie } from 'src/app/models/categorie';
import { CreateScategorieComponent } from '../create-scategorie/create-scategorie.component';

@Component({
  selector: 'app-list-scategorie',
  templateUrl: './list-scategorie.component.html',
  styleUrls: ['./list-scategorie.component.scss']
})
export class ListScategorieComponent implements OnDestroy, OnInit {

  listData : Scategorie[];
  scat: Scategorie;
  ScatID: number;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild("fileUploadInput")
  fileUploadInput: any;
  mesagge: string;

  closeResult: string;

  constructor(public crudApi: ScategorieService,
              public fb: FormBuilder,
              public toastr: ToastrService,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogService: DialogService,
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

    this.crudApi.getAllScategorieOrderDesc().subscribe(
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

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.crudApi.formData = {
      id: null,
      code: '',
      libelle: '',
      categorie : new Categorie()
    };
  }

  getListScategories() {
    this.crudApi.getAllScategorieOrderDesc().subscribe(
      response =>{
        this.listData = response;
      }
    );
  }

  onCreateScategorie(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateScategorieComponent, dialogConfig);
  }

  addEditScategorie(scatId?: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data = {
      scatId
    };
    this.matDialog.open(CreateScategorieComponent, dialogConfig);

  }

  deleteScategorie(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteScategorie(id).subscribe(data => {
          this.toastr.warning('Scategorie supprimé avec succès!');
          this.rerender();
          this.getListScategories();
        },
        (error: HttpErrorResponse) => {
          this.toastr.error("Impossible de supprimer cet sous_catégorie, veuillez supprimer tous les articles lié à celle-ci");
        }
        );
      }
    });
  }

  uploadExcelFile() {
    let formData = new FormData();
    formData.append('file', this.fileUploadInput.nativeElement.files[0]);
    this.crudApi.uploadScategorieExcelFile(formData).subscribe(result => {
      console.log(result);
      this.mesagge = result.toString();
      this.toastr.warning('Fichier Excel importé avec succès!');
      this.rerender();
      this.getListScategories();
    })
  }

  generateExcel() {
    this.crudApi.generateExcelFile();
    this.toastr.warning("Excel téléchargé avec succès");
  }

  generatePdf() {
    this.crudApi.exportPdfScategories().subscribe(x => {
      const blob = new Blob([x], {type: 'application/pdf'});
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob);
        return;
      }
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'scategories.pdf';
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));

      setTimeout(function() {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100)

    });
    this.toastr.warning("Pdf Télécharger avec succès");

  }

}
