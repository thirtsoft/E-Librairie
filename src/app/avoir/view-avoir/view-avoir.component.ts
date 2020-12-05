import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Avoir } from 'src/app/models/avoir';
import { LigneAvoir } from 'src/app/models/ligne-avoir';
import { Article } from 'src/app/models/article';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { AvoirService } from 'src/app/services/avoir.service';
import { FormBuilder } from '@angular/forms';
import { LigneAvoirService } from 'src/app/services/ligne-avoir.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CreateAvoirComponent } from '../create-avoir/create-avoir.component';

@Component({
  selector: 'app-view-avoir',
  templateUrl: './view-avoir.component.html',
  styleUrls: ['./view-avoir.component.scss']
})
export class ViewAvoirComponent implements OnInit {

  listData: Avoir[];
  listDatalcmd: LigneAvoir[];
  avoirId: number;
  numeroAvoir;
  totalAvoir;
  fournisseur;

  produit: Article = new Article();

  @ViewChild('content') content: ElementRef;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: AvoirService, private lavoirService: LigneAvoirService,
    public toastr: ToastrService, public fb: FormBuilder,
    private router : Router, private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private route: ActivatedRoute,
    public dialogRef:MatDialogRef<CreateAvoirComponent>,
    ) { }

  ngOnInit(): void {
    this.avoirId = this.route.snapshot.params.id;
    console.log(this.avoirId);
    this.lavoirService.getAllLigneAvoirByAvoir(this.avoirId).subscribe((data: LigneAvoir[]) => {
      this.lavoirService.listData = data;
    //  this.currentCommande = data;
      console.log(this.lavoirService.listData);

      console.log(this.lavoirService.listData[0].numero);
      this.numeroAvoir = this.lavoirService.listData[0].numero;
      console.log(this.lavoirService.listData[0].avoir.totalAvoir);
      this.totalAvoir = this.lavoirService.listData[0].avoir.totalAvoir;
      this.fournisseur = this.lavoirService.listData[0].avoir.fournisseur.raisonSociale;
     // this.dtTrigger.next();
    }, err => {
      console.log(err);
    });

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

  getListAvoirs() {
    this.crudApi.getAllAvoirs().subscribe(
      response =>{
        this.listData = response;
      });
  }

  onCreateAvoir() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("avoir");
  }
  deleteAvoir(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cet Avoir ?')) {
    this.crudApi.deleteAvoir(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Avoir supprimé avec succès!');
          this.rerender();
          this.getListAvoirs();
      },
        error => console.log(error));
    }

  }

  onGoBack() {
    this.router.navigateByUrl('avoirs');
  }


}
