import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { Fournisseur } from 'src/app/models/fournisseur';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ListFournisseurComponent } from '../list-fournisseur/list-fournisseur.component';

@Component({
  selector: 'app-view-fournisseur',
  templateUrl: './view-fournisseur.component.html',
  styleUrls: ['./view-fournisseur.component.scss']
})
export class ViewFournisseurComponent implements OnInit {

  listData: Fournisseur[];
  fourId: number;
  raisonSocial: string;
  nomFour: string;
  prenom: string;
  numeroCreance;
  totalCreance;
  client;

  currentFournisseur: any;

 // @ViewChild('content') content: ElementRef;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(private crudApi: FournisseurService, private fb: FormBuilder,
    private toastr: ToastrService,
    private router : Router, private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private route: ActivatedRoute,
    public dialogRef:MatDialogRef<ViewFournisseurComponent>,
    ) { }

  ngOnInit(): void {
    if (this.crudApi.choixmenu == "A") {
      this.infoForm();
    }

    /*
    this.fourId = this.route.snapshot.params.id;
    console.log(this.fourId);
    this.crudApi.getFournisseurById(this.fourId).subscribe((data: any) => {
      this.crudApi.dataForm = data;

      console.log(this.currentFournisseur);
/*
      console.log(this.lcreanceService.listData[0].numero);
      this.numeroCreance = this.lcreanceService.listData[0].numero;
      console.log(this.lcreanceService.listData[0].creance.totalCreance);
      this.totalCreance = this.lcreanceService.listData[0].creance.totalCreance;
      this.client = this.lcreanceService.listData[0].creance.client.chefService;
     */

  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      raisonSociale: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      nomBank: ['', [Validators.required]],
      numeroCompte: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      fax: ['', [Validators.required]],
      email: ['', [Validators.required]],
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

  getListFournisseurs() {
    this.crudApi.getAllFournisseurs().subscribe(
      response =>{
        this.crudApi.dataForm = response;
      });
  }

  onCreateCreance() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("creance");
  }
  deleteCreance(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cette données ?')) {
    this.crudApi.deleteFournisseur(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Fournisseur supprimé avec succès!');
          this.rerender();
          this.getListFournisseurs();
      },
        error => console.log(error));
    }

  }

  onGoBack() {
    this.router.navigateByUrl('creances');
  }


}
