import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Fournisseur } from 'src/app/models/fournisseur';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CreateFournisseurComponent } from '../create-fournisseur/create-fournisseur.component';
import { DataTableDirective } from 'angular-datatables';
import { DialogService } from 'src/app/services/dialog.service';
import { ViewFournisseurComponent } from '../view-fournisseur/view-fournisseur.component';
import { EnvoiSMSFournisseurComponent } from '../envoi-smsfournisseur/envoi-smsfournisseur.component';
import { EnvoiEmailFournisseurComponent } from '../envoi-email-fournisseur/envoi-email-fournisseur.component';

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.scss']
})
export class ListFournisseurComponent implements OnDestroy, OnInit {

  fournisseur: Fournisseur;
  FourID: number;

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: FournisseurService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router, private route: ActivatedRoute,
    private matDialog: MatDialog, private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateFournisseurComponent>,
    ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListFournisseurs();
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
    this.crudApi.getAllFournisseurs().subscribe(
      response =>{
        this.crudApi.listData = response;
        console.log(this.crudApi.listData);
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
      raisonSociale: '',
      prenom: '',
      nom: '',
      numeroCompte: '',
      nomBank: '',
      adresse: '',
      email: '',
      fax: '',
      telephone: '',
      subject: '',
      message: '',
    };

  }

  getListFournisseurs() {
    this.crudApi.getAllFournisseurs().subscribe(
      response =>{this.crudApi.listData = response;}
    );
  }

  viewFournisseur(item: Fournisseur) {
   // this.router.navigateByUrl('fournisseurView/' + item.id);
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(ViewFournisseurComponent, dialogConfig);
  }

  onCreateFournisseur(){
    this.crudApi.choixmenu = "A";
    //this.router.navigateByUrl("fournisseurs/new");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateFournisseurComponent, dialogConfig);
  }

  editFournisseur(item: Fournisseur) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateFournisseurComponent, dialogConfig);
  }

  envoiEmail(item: Fournisseur) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(EnvoiEmailFournisseurComponent, dialogConfig);
  }

  envoiSMS(item: Fournisseur) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(EnvoiSMSFournisseurComponent, dialogConfig);
  }
  deleteFournisseur(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteFournisseur(id).subscribe(data => {
          this.toastr.warning('Fournisseur supprimé avec succès!');
          this.rerender();
          this.getListFournisseurs();
        });
      }
    });
  }

  editerFournisseur(item : Fournisseur) {
    this.router.navigateByUrl('fournisseurs/'+item.id);
  }


}
