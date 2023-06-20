import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LigneVente } from 'src/app/models/ligne-vente';
import { Utilisateur } from 'src/app/models/utilisateur';
import { Vente } from 'src/app/models/vente';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-detail-vente-employe',
  templateUrl: './detail-vente-employe.component.html',
  styleUrls: ['./detail-vente-employe.component.scss']
})
export class DetailVenteEmployeComponent implements OnInit {

  listData: Utilisateur[];
  employee: Utilisateur;

  lVentes: LigneVente[];

  userId: number;
  currentDevis;
  numeroDevis;
  nomEmploye;
  usernameEmploye;
  role;
  email;

  editForm: FormGroup;

  @ViewChild('content') content: ElementRef;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: UtilisateurService,
              public toastr: ToastrService,
              private router : Router,
              public fb: FormBuilder,
              private datePipe : DatePipe,
              public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    console.log(this.userId);
    this.crudApi.getAllVenteByEmployeId(this.userId).subscribe((data: Vente[]) => {
      this.crudApi.listVente = data;
      for(let i=0; i<this.crudApi.listVente.length; i++) {
        console.log(this.crudApi.listVente);
        console.log(this.crudApi.listVente[i].utilisateur.name)
        this.nomEmploye = this.crudApi.listVente[i].utilisateur.name;
        this.usernameEmploye = this.crudApi.listVente[i].utilisateur.username;
        this.email = this.crudApi.listVente[i].utilisateur.email;
        this.role = this.crudApi.listVente[i].utilisateur.roles[0].name;
        this.lVentes = this.crudApi.listVente[i].ligneVentes;
        console.log(this.lVentes);
      }
      
    
    /*
      console.log(this.ldevService.listData[0].numero);
      this.numeroDevis = this.ldevService.listData[0].numero;
      console.log(this.ldevService.listData[0].devis.totalDevis);
      this.totalDevis = this.ldevService.listData[0].devis.totalDevis;
      console.log(this.ldevService.listData[0].devis.dateDevis);
      this.dateDevis = this.ldevService.listData[0].devis.dateDevis;
      this.client = this.ldevService.listData[0].devis.client.raisonSocial;
      */
     // this.dtTrigger.next();
    }, err => {
      console.log(err);
    })

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

  transformDate(date){
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  onGoBack() {
    this.router.navigateByUrl('home/employees');
  }


}
