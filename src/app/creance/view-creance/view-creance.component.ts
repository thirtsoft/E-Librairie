import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Article } from 'src/app/models/article';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Creance } from 'src/app/models/creance';
import { LigneCreance } from 'src/app/models/ligne-creance';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CreanceService } from 'src/app/services/creance.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { LigneCreanceService } from 'src/app/services/ligne-creance.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CreateCreanceComponent } from '../create-creance/create-creance.component';

@Component({
  selector: 'app-view-creance',
  templateUrl: './view-creance.component.html',
  styleUrls: ['./view-creance.component.scss']
})
export class ViewCreanceComponent implements OnInit {

  listData: Creance[];
  listDatalcmd: LigneCreance[];
  cmdClient: Creance;

  creanceId: number;
  numeroCreance;
  totalCreance;
  client;

  produit: Article = new Article();

  private editForm: FormGroup;

  @ViewChild('content') content: ElementRef;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: CreanceService,public fb: FormBuilder,
    public toastr: ToastrService,  private lcreanceService: LigneCreanceService,
    private router : Router, private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private route: ActivatedRoute,
    public dialogRef:MatDialogRef<CreateCreanceComponent>,
    ) { }

  ngOnInit(): void {
    this.creanceId = this.route.snapshot.params.id;
    console.log(this.creanceId);
    this.lcreanceService.getAllLigneCreanceByCreance(this.creanceId).subscribe((data: LigneCreance[]) => {
      this.lcreanceService.listData = data;
    //  this.currentCommande = data;
      console.log(this.lcreanceService.listData);

      console.log(this.lcreanceService.listData[0].numero);
      this.numeroCreance = this.lcreanceService.listData[0].numero;
      console.log(this.lcreanceService.listData[0].creance.totalCreance);
      this.totalCreance = this.lcreanceService.listData[0].creance.totalCreance;
      this.client = this.lcreanceService.listData[0].creance.client.chefService;
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

  getListCreances() {
    this.crudApi.getAllCreances().subscribe(
      response =>{
        this.listData = response;
      });
  }

  onCreateCreance() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("creance");
  }
  deleteCreance(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cette Commande ?')) {
    this.crudApi.deleteCreance(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Creance supprimé avec succès!');
          this.rerender();
          this.getListCreances();
      },
        error => console.log(error));
    }

  }

  onGoBack() {
    this.router.navigateByUrl('creances');
  }


}
