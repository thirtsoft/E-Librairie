import { Component, OnInit } from '@angular/core';
import { Contrat } from 'src/app/models/contrat';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ContratService } from 'src/app/services/contrat.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-contrat',
  templateUrl: './list-contrat.component.html',
  styleUrls: ['./list-contrat.component.scss']
})
export class ListContratComponent implements OnInit {

  listData : Contrat[];

  private editForm: FormGroup;

  constructor(public crudApi: ContratService,public fb: FormBuilder,
    public toastr: ToastrService, private router : Router
    ) { }

  ngOnInit() {
    this.getListContrats();
  }

  getListContrats() {
    this.crudApi.getAllContrats().subscribe(
      response =>{this.listData = response;}
    );

  }

  onCreateContrat(){
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("contrats/new");
   /* const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%"; */
    //dialogConfig.data="gdddd";
   // this.matDialog.open(CreateClientComponent, dialogConfig);
  }
  deleteContrat(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer ce Contrat ?')) {
    this.crudApi.deleteContrat(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.success('Contrat supprimé avec succès!');
          this.getListContrats();
      },
        error => console.log(error));
    }

  }
  editContrat(item : Contrat) {

    this.router.navigateByUrl('contrats/'+item.id);

  }


}
