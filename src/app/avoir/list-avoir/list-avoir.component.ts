import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Avoir } from 'src/app/models/avoir';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { AvoirService } from 'src/app/services/avoir.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { CreateAvoirComponent } from '../create-avoir/create-avoir.component';

@Component({
  selector: 'app-list-avoir',
  templateUrl: './list-avoir.component.html',
  styleUrls: ['./list-avoir.component.scss']
})
export class ListAvoirComponent implements OnDestroy, OnInit {

  listData : Avoir[];

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  constructor(public crudApi: AvoirService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateAvoirComponent>,
    ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.crudApi.getAllAvoirs().subscribe(
      response =>{
        this.listData = response;
        this.dtTrigger.next();
      }
    );

    //this.getListContrats();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getListAvoirs() {
    this.crudApi.getAllAvoirs().subscribe(
      response =>{this.listData = response;}
    );

  }

  onCreateAvoir(){
    this.crudApi.choixmenu = "A";
    //this.router.navigateByUrl("contrats/new");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";

    this.matDialog.open(CreateAvoirComponent, dialogConfig);
  }

  editerAvoir(item : Avoir) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";

    this.matDialog.open(CreateAvoirComponent, dialogConfig);

  }
  deleteAvoir(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cet Avoir ?')) {
    this.crudApi.deleteAvoir(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Avoir supprimé avec succès!');
          this.getListAvoirs();
      },
        error => console.log(error));
    }

  }
  editAvoir(item : Avoir) {

    this.router.navigateByUrl('avoirs/'+item.id);

  }


}
