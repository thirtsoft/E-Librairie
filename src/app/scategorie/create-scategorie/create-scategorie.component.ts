import { Component, OnInit } from '@angular/core';
import { Scategorie } from 'src/app/models/scategorie';
import { Categorie } from 'src/app/models/categorie';
import { ScategorieService } from 'src/app/services/scategorie.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-scategorie',
  templateUrl: './create-scategorie.component.html',
  styleUrls: ['./create-scategorie.component.scss']
})
export class CreateScategorieComponent implements OnInit {

  public scat = new Scategorie();

  public categories: Categorie[];

  submitted = false;

  constructor(public crudApi: ScategorieService , private catService: CategorieService,
    public fb: FormBuilder,public toastr: ToastrService,private router : Router
    ) { }


  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){

     // this.infoForm()};
      this.catService.getAllCategories().subscribe(
        response =>{this.categories = response;}
      );

    }

 /*  infoForm() {
    let cat = new SousCategorie();
    this.crudApi.dataForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      libelle: ['', [Validators.required]],
      categories: ['', [Validators.required]],

    }); */


  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.saveScategorie(this.scat);
    }else {
      this.updateScategorie();
    }

  }
  saveScategorie(Scat: Scategorie) {
    this.crudApi.createScategorie(Scat).
    subscribe( data => {
      this.toastr.success("Scategorie Ajouté avec Succès");
      //this.dialogRef.close();
      this.crudApi.getAllScategories().subscribe(
        response =>{this.crudApi.listData = response;},

      );
      this.router.navigate(['/scategories']);
    });
  }

  updateScategorie(){
    this.crudApi.updateScategorie(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success("Scategorie Modifier avec Succès");
      this.crudApi.getAllScategories().subscribe(
        response =>{this.crudApi.listData = response;}
      );
      this.router.navigate(['/scategories']);
    });
  }


}
