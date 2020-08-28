import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/models/employe';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-employe',
  templateUrl: './edit-employe.component.html',
  styleUrls: ['./edit-employe.component.scss']
})
export class EditEmployeComponent implements OnInit {

  employe: Employe;

  employes: Employe[];

  private editForm: FormGroup;

  currentEmploye: any;

  public idEmp: number;

  constructor(public crudApi: EmployeService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router, private route: ActivatedRoute
    ) { }


  ngOnInit() {
    this.idEmp = this.route.snapshot.params.id;
    console.log(this.idEmp);
    this.crudApi.getEmployeById(this.idEmp)
      .subscribe(data => {
        this.currentEmploye = data;
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

  updateEmploye(emp: Employe){
    this.crudApi.updateEmploye(this.idEmp,emp).
    subscribe( data => {
      this.toastr.success("Employe Modifier avec Succès");
      this.crudApi.getAllEmployes().subscribe(
        response =>{this.crudApi.listData = response;}
      );
      this.router.navigateByUrl('employes');
    });
  }

  onSubmit() {
    this.crudApi.updateEmploye(this.editForm.value.id, this.crudApi.dataForm.value).
    subscribe(data => {
      this.toastr.success("Employe Modifier avec succes");
      this.crudApi.getAllEmployes().subscribe(
        response => {this.crudApi.listData = response;
        }
      );
      this.router.navigateByUrl("employes");
    });
  }

  GowBackToFournisseur() {
    this.router.navigateByUrl('clients');
  }


}
