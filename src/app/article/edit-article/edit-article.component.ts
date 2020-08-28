import { Component, OnInit } from '@angular/core';
import { Scategorie } from 'src/app/models/scategorie';
import { Categorie } from 'src/app/models/categorie';
import { ArticleService } from 'src/app/services/article.service';
import { ScategorieService } from 'src/app/services/scategorie.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  public article;

  public currentArticle: any;

  public idArt: number;

  public categories: Categorie[];

  public scategories: Scategorie[];

  constructor(private crudApi:ArticleService, private ScatService: ScategorieService,
    private catService: CategorieService, private route: ActivatedRoute,
    private router: Router, public fb: FormBuilder,public toastr: ToastrService

  ) { }

  ngOnInit() {
    this.idArt = this.route.snapshot.params.id;
    this.crudApi.getArticleById(this.idArt)
      .subscribe(data => {
        this.currentArticle = data;
      },err=> {
        console.log(err);
      });

    this.getAllCategories();
    this.getAllScategories();
  }

  // Modification d'un fournisseur
  updateArticle(art: Article) {
    this.crudApi.updateArticle(this.idArt, art)
      .subscribe(data=> {
        this.article = data;
        this.toastr.success("Article Modifier avec Succès");
        this.router.navigate(['articles']);
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

  getAllScategories() {
    this.ScatService.getAllScategories()
      .subscribe(data=> {
        this.scategories = data;
      },err=>{
        console.log(err);
      });
  }

  GowBackToFournisseur() {
    this.router.navigate(['articles']);
  }


}
