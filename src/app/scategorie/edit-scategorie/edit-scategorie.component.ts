import { Component, OnInit, Inject } from '@angular/core';
import { Categorie } from 'src/app/models/categorie';
import { ScategorieService } from 'src/app/services/scategorie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/services/categorie.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Scategorie } from 'src/app/models/scategorie';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-scategorie',
  templateUrl: './edit-scategorie.component.html',
  styleUrls: ['./edit-scategorie.component.scss']
})
export class EditScategorieComponent implements OnInit {

  public scategorie;

  public currentScategorie: any;

  public idScat: number;

  public categories: Categorie[];

  constructor(private crudApi:ScategorieService, private route: ActivatedRoute,
    private catService: CategorieService, private router: Router,
    public fb: FormBuilder,public toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<EditScategorieComponent>,
    ) { }

  ngOnInit() {
    this.idScat = this.route.snapshot.params.id;
    this.crudApi.getScategorieById(this.idScat)
      .subscribe(data => {
        this.currentScategorie = data;
      },err=> {
        console.log(err);
      });

    this.getAllCategories();
  }

  // Modification d'un fournisseur
  updateScategorie(Scat: Scategorie) {
    this.crudApi.updateScategorie(this.idScat, Scat)
      .subscribe(data=> {
        this.scategorie = data;
        this.dialogRef.close();
        this.toastr.success("Scategorie Modifier avec Succès");
        this.router.navigate(['/scategories']);
      }, error=> {
        console.log(error);
      })
  }
 // Recupérer la liste des produits
  getAllCategories() {
    this.catService.getAllCategories()
      .subscribe(data=> {
        this.categories = data;
      },err=>{
        console.log(err);
      });
  }

  GowBackToFournisseur() {
    this.router.navigate(['scategories']);
  }


}
