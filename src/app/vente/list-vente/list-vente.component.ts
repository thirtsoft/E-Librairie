import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Vente } from 'src/app/models/vente';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { VenteService } from 'src/app/services/vente.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CreateVenteComponent } from '../create-vente/create-vente.component';

@Component({
  selector: 'app-list-vente',
  templateUrl: './list-vente.component.html',
  styleUrls: ['./list-vente.component.scss']
})
export class ListVenteComponent implements OnDestroy, OnInit {

  listData: Vente[];

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  constructor(public crudApi: VenteService,public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateVenteComponent>,
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.crudApi.getAllVentes().subscribe(
      response =>{
        this.listData = response;
        console.log(this.listData);
        this.dtTrigger.next();
      }
    );

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getListVentes() {
    this.crudApi.getAllVentes().subscribe(
      response =>{
        this.listData = response;

      });

  }

  onCreateVente() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("vente");
  }

  deleteVente(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cette vente ?')) {
    this.crudApi.deleteVente(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Vente supprimé avec succès!');
          this.getListVentes();
      },
        error => console.log(error));
    }

  }

  editerVente(item : Vente) {

    this.router.navigateByUrl('vente/'+item.venteId);

  }


}
