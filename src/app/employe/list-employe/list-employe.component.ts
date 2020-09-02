import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Employe } from 'src/app/models/employe';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CreateEmployeComponent } from '../create-employe/create-employe.component';

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss']
})
export class ListEmployeComponent implements OnDestroy, OnInit {

  client: Employe;

  listData : Employe[];

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  constructor(public crudApi: EmployeService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router, private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateEmployeComponent>,
    ) { }


  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.crudApi.getAllEmployes().subscribe(
      response =>{
        this.listData = response;
        this.dtTrigger.next();
      }
    );

    //this.getListEmployes();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getListEmployes() {
    this.crudApi.getAllEmployes().subscribe(
      response =>{this.listData = response;}
    );

  }

  onCreateEmploye(){
    this.crudApi.choixmenu = "A";
    //this.router.navigateByUrl("employes/new");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";

    this.matDialog.open(CreateEmployeComponent, dialogConfig);
  }

  editEmploye(item : Employe) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";

    this.matDialog.open(CreateEmployeComponent, dialogConfig);
  }
  deleteEmploye(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cet Employe ?')) {
    this.crudApi.deleteEmploye(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Employe supprimé avec succès!');
          this.getListEmployes();
      },
        error => console.log(error));
    }

  }
  editerEmploye(item : Employe) {

    this.router.navigateByUrl('employes/'+item.id);

  }

}
