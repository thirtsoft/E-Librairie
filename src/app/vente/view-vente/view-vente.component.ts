import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Vente } from 'src/app/models/vente';
import { VenteService } from 'src/app/services/vente.service';
import { LigneVenteService } from 'src/app/services/ligne-vente.service';
import { LigneVente } from 'src/app/models/ligne-vente';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Article } from 'src/app/models/article';
import { CreateVenteComponent } from '../create-vente/create-vente.component';

@Component({
  selector: 'app-view-vente',
  templateUrl: './view-vente.component.html',
  styleUrls: ['./view-vente.component.scss']
})
export class ViewVenteComponent implements OnDestroy, OnInit {

  listData: Vente[];
  listDatalVente: LigneVente[];
  cmdVente: Vente;
  vente;
  venteId: number;
  currentVente;

  produit: Article = new Article();

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: VenteService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog, private lventeService: LigneVenteService,
    @Inject(MAT_DIALOG_DATA) public data: any, private route: ActivatedRoute,
    public dialogRef:MatDialogRef<CreateVenteComponent>,
    ) { }

  ngOnInit(): void {
    this.venteId = this.route.snapshot.params.id;
    console.log(this.venteId);
    this.lventeService.getLigneVentesByVente(this.venteId).subscribe(data => {
      this.currentVente = data;
      console.log(this.currentVente);
     // this.dtTrigger.next();
    }, err => {
      console.log(err);
    })

    this.cmdVente = new Vente();
    this.cmdVente = {
      venteId: null,
      numeroVente: '',
      totalVente: 0,
      status: '',
      dateVente: new Date(),
      DeletedOrderItemIDs: ''
    }
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

  getListVentes() {
    this.crudApi.getAllVentes().subscribe(
      response =>{this.listData = response;}
    );
  }

  onCreateVente() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("vente");
  }

  onGoBack() {
    this.router.navigateByUrl('ventes');
  }


}
