import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Fournisseur } from 'src/app/models/fournisseur';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CreateFournisseurComponent } from '../create-fournisseur/create-fournisseur.component';

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.scss']
})
export class ListFournisseurComponent implements OnDestroy, OnInit {

  fournisseur: Fournisseur;

  listData : Fournisseur[];

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  constructor(public crudApi: FournisseurService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateFournisseurComponent>,
    ) { }


  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.crudApi.getAllFournisseurs().subscribe(
      response =>{
        this.listData = response;
        this.dtTrigger.next();
      }
    );

    //this.getListFournisseurs();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getListFournisseurs() {
    this.crudApi.getAllFournisseurs().subscribe(
      response =>{this.listData = response;}
    );

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

  editFournisseur(item : Fournisseur) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";

    this.matDialog.open(CreateFournisseurComponent, dialogConfig);
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
  editerFournisseur(item : Fournisseur) {

    this.router.navigateByUrl('fournisseurs/'+item.id);

  }


}
