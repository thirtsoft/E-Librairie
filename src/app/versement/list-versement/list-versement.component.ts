import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Versement } from 'src/app/models/versement';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VersementService } from 'src/app/services/versement.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CreateVersementComponent } from '../create-versement/create-versement.component';

@Component({
  selector: 'app-list-versement',
  templateUrl: './list-versement.component.html',
  styleUrls: ['./list-versement.component.scss']
})
export class ListVersementComponent implements OnDestroy, OnInit {

  listData : Versement[];

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  constructor(public crudApi: VersementService,public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateVersementComponent>,
    ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.crudApi.getAllVersements().subscribe(
      response =>{
        this.listData = response;
        this.dtTrigger.next();
      }
    );

    //this.getListVersements();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getListVersements() {
    this.crudApi.getAllVersements().subscribe(
      response =>{this.listData = response;}
    );

  }

  onCreateVersement(){
    this.crudApi.choixmenu = "A";
    //this.router.navigateByUrl("versements/new");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data="gdddd";

    this.matDialog.open(CreateVersementComponent, dialogConfig);
  }

  editVersement(item : Versement) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";

    this.matDialog.open(CreateVersementComponent, dialogConfig);
  }
  deleteVersement(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer ce Versement ?')) {
    this.crudApi.deleteVersement(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Versement supprimé avec succès!');
          this.getListVersements();
      },
        error => console.log(error));
    }

  }
  editerVersement(item : Versement) {

    this.router.navigateByUrl('versements/'+item.id);

  }

}
