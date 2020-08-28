import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/models/employe';
import { VersementService } from 'src/app/services/versement.service';
import { EmployeService } from 'src/app/services/employe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Versement } from 'src/app/models/versement';

@Component({
  selector: 'app-edit-versement',
  templateUrl: './edit-versement.component.html',
  styleUrls: ['./edit-versement.component.scss']
})
export class EditVersementComponent implements OnInit {

  public versement;

  public currentVersement: any;

  public idVersment: number;

  public employes: Employe[];

  constructor(private crudApi: VersementService, private empService: EmployeService,
    private route: ActivatedRoute, private router: Router, public fb: FormBuilder,public toastr: ToastrService

  ) { }

  ngOnInit() {
    this.idVersment = this.route.snapshot.params.id;
    this.crudApi.getVersementById(this.idVersment)
      .subscribe(data => {
        this.currentVersement = data;
      },err=> {
        console.log(err);
      });

    this.getListEmployes();

  }

  // Modification d'un fournisseur
  updateVersement(vers: Versement) {
    this.crudApi.updateVersement(this.idVersment, vers)
      .subscribe(data=> {
        this.versement = data;
        this.toastr.success("Versement Modifier avec Succès");
        this.router.navigate(['versements']);
      }, error=> {
        console.log(error);
      })
  }
 // Recupérer la liste des produits
  getListEmployes() {
    this.empService.getAllEmployes()
      .subscribe(data=> {
        this.employes = data;
      },err=>{
        console.log(err);
    });

  }

  GowBackToFournisseur() {
    this.router.navigate(['versements']);
  }


}
