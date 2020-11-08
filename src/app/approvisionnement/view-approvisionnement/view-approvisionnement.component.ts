import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Appro } from 'src/app/models/appro';
import { ApproService } from 'src/app/services/appro.service';
import { LigneApproService } from 'src/app/services/ligne-appro.service';
import { LigneAppro } from 'src/app/models/ligne-appro';
import { Fournisseur } from 'src/app/models/fournisseur';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Article } from 'src/app/models/article';
import { Vente } from 'src/app/models/vente';
import { LigneVente } from 'src/app/models/ligne-vente';
import { CreateVenteComponent } from 'src/app/vente/create-vente/create-vente.component';
import { LigneVenteService } from 'src/app/services/ligne-vente.service';
import { VenteService } from 'src/app/services/vente.service';

@Component({
  selector: 'app-view-approvisionnement',
  templateUrl: './view-approvisionnement.component.html',
  styleUrls: ['./view-approvisionnement.component.scss']
})
export class ViewApprovisionnementComponent implements OnInit {
  listData: Vente[];
  listDetalVente: LigneVente[];
  vente: Vente;
  venteId: number;
  currentVente;

  produit: Article = new Article();

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: VenteService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog, private lVenteService: LigneVenteService,
    @Inject(MAT_DIALOG_DATA) public data: any, private route: ActivatedRoute,
    public dialogRef:MatDialogRef<CreateVenteComponent>,
    ) { }

  ngOnInit(): void {
    this.venteId = this.route.snapshot.params.id;
    console.log(this.venteId);
    this.lVenteService.getLigneVenteId(this.venteId).subscribe(data => {
      this.currentVente = data;
      console.log(this.currentVente);
     // this.dtTrigger.next();
    }, err => {
      console.log(err);
    })

    this.vente = new Vente();
    this.vente = {
      venteId: null,
      numeroVente: '',
      totalVente: 0,
      status: '',
      DeletedOrderItemIDs: '',
      dateVente: new Date()

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

  onCreateAppro() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("approvisionnement");
  }

  onGoBack() {
    this.router.navigateByUrl('approvisionnements');
  }



}
