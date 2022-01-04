import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { CategorieCharge } from 'src/app/models/categorieCharge';
import { FormGroup, FormControl, FormBuilder, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CategorieChargeService } from 'src/app/services/categorie-charge.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { CreateCategorieChargeComponent } from '../create-categorie-charge/create-categorie-charge.component';

@Component({
  selector: 'app-list-categorie-charge',
  templateUrl: './list-categorie-charge.component.html',
  styleUrls: ['./list-categorie-charge.component.scss']
})
export class ListCategorieChargeComponent implements OnDestroy, OnInit {

  categorie: CategorieCharge;

  listData : CategorieCharge[];
  CatId: number;

  private editForm: FormGroup;

  control: FormControl = new FormControl('');

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild("fileUploadInput")
  fileUploadInput: any;
  mesagge: string;

  constructor(public crudApi: CategorieChargeService,
              private dialogService: DialogService,
              public toastr: ToastrService,
              private router : Router,
              private route: ActivatedRoute,
              private matDialog: MatDialog,
              public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<CreateCategorieChargeComponent>,
    ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListCategorieCharges();
      })
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.crudApi.getAllCategorieChargesOrderDesc().subscribe(
      response =>{
        this.listData = response;
        this.dtTrigger.next();
      }, err=> {

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
      codeCategorieCharge: '',
      nomCategorieCharge: ''
    };

  }

  getListCategorieCharges() {
    this.crudApi.getAllCategorieChargesOrderDesc()
      .subscribe(
        response =>{
          this.listData = response;
        }
      );

  }

  onCreateCategorieCharge(){
    this.crudApi.choixmenu = "A";
    //this.router.navigateByUrl("categories/new");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="30%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(CreateCategorieChargeComponent, dialogConfig);
  }

  selectData(item : CategorieCharge) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateCategorieChargeComponent, dialogConfig);
  }

  deleteCategorieCharge(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteCategorieCharge(id).subscribe(data => {
          this.toastr.warning('CategorieCharge supprimé avec succès!');
          this.rerender();
          this.getListCategorieCharges();
        },
          (error: HttpErrorResponse) => {
          this.toastr.error("Impossible de supprimer cet charge, veuillez supprimer tous les charges lié à cet catégorie charge");
          }
        );
      }
    });
  }

}
