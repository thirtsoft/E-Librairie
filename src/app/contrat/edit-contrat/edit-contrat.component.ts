import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { ContratService } from 'src/app/services/contrat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Contrat } from 'src/app/models/contrat';

@Component({
  selector: 'app-edit-contrat',
  templateUrl: './edit-contrat.component.html',
  styleUrls: ['./edit-contrat.component.scss']
})
export class EditContratComponent implements OnInit {

  public contrat;

  public currentContrat: any;

  public idCont: number;

  public clients: Client[];

  constructor(private crudApi: ContratService, private clientService: ClientService,
    private route: ActivatedRoute, private router: Router, public fb: FormBuilder,public toastr: ToastrService

  ) { }

  ngOnInit() {
    this.idCont = this.route.snapshot.params.id;
    this.crudApi.getContratById(this.idCont)
      .subscribe(data => {
        this.currentContrat = data;
      },err=> {
        console.log(err);
      });

    this.getListClients();

  }

  // Modification d'un fournisseur
  updateContrat(cont: Contrat) {
    this.crudApi.updateContrat(this.idCont, cont)
      .subscribe(data=> {
        this.contrat = data;
        this.toastr.success("Contrat Modifier avec Succès");
        this.router.navigate(['contrats']);
      }, error=> {
        console.log(error);
      })
  }
 // Recupérer la liste des produits
  getListClients() {
    this.clientService.getAllClients()
      .subscribe(data=> {
        this.clients = data;
      },err=>{
        console.log(err);
    });

  }

  GowBackToFournisseur() {
    this.router.navigate(['contrats']);
  }


}
