import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/models/employe';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss']
})
export class ListEmployeComponent implements OnInit {

  client: Employe;

  listData : Employe[];

  private editForm: FormGroup;

  constructor(public crudApi: EmployeService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router
    ) { }


  ngOnInit() {
    this.getListEmployes();
  }

  getListEmployes() {
    this.crudApi.getAllEmployes().subscribe(
      response =>{this.listData = response;}
    );

  }

  onCreateEmploye(){
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("employes/new");
   /* const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%"; */
    //dialogConfig.data="gdddd";
   // this.matDialog.open(CreateClientComponent, dialogConfig);
  }
  deleteEmploye(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cet Employe ?')) {
    this.crudApi.deleteEmploye(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.success('Employe supprimé avec succès!');
          this.getListEmployes();
      },
        error => console.log(error));
    }

  }
  editEmploye(item : Employe) {

    this.router.navigateByUrl('employes/'+item.id);

  }

}
