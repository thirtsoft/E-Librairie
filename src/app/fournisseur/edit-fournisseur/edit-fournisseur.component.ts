import { Component, OnInit } from '@angular/core';
import { Fournisseur } from 'src/app/models/fournisseur';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-fournisseur',
  templateUrl: './edit-fournisseur.component.html',
  styleUrls: ['./edit-fournisseur.component.scss']
})
export class EditFournisseurComponent implements OnInit {

  fournisseur: Fournisseur;

  fournisseurs: Fournisseur[];

  private editForm: FormGroup;

  currentFournisseur: any;

  public idFour: number;

  constructor(public crudApi: FournisseurService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router, private route: ActivatedRoute
    ) { }


  ngOnInit() {
    this.idFour = this.route.snapshot.params.id;
    console.log(this.idFour);
    this.crudApi.getFournisseurById(this.idFour)
      .subscribe(data => {
        this.currentFournisseur = data;
      },err=> {
        console.log(err);
      });
   /*  this.editForm = this.fb.group({
      id: [''],
      raisonSocial: [''],
      chefService: [''],
      adresse: [''],
      telephone: [''],
      email: ['']
    }); */

  }

  updateFournisseur(four: Fournisseur){
    this.crudApi.updateFournisseur(this.idFour,four).
    subscribe( data => {
      this.toastr.success("Fournisseur Modifier avec Succès");
      this.crudApi.getAllFournisseurs().subscribe(
        response =>{this.crudApi.listData = response;}
      );
      this.router.navigateByUrl('fournisseurs');
    });
  }

  onSubmit() {
    this.crudApi.updateFournisseur(this.editForm.value.id, this.crudApi.dataForm.value).
    subscribe(data => {
      this.toastr.success("Fournisseur Modifier avec succes");
      this.crudApi.getAllFournisseurs().subscribe(
        response => {this.crudApi.listData = response;
        }
      );
      this.router.navigateByUrl("fournisseurs");
    });
  }

  GowBackToFournisseur() {
    this.router.navigateByUrl('fournisseurs');
  }

}
