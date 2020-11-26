import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { Article } from 'src/app/models/Article';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { StockService } from 'src/app/services/stock.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { CreateArticleComponent } from 'src/app/article/create-article/create-article.component';
import { CreateApproComponent } from 'src/app/approvisionnement/create-appro/create-appro.component';
import { DataTableDirective } from 'angular-datatables';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-list-stock',
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.scss']
})
export class ListStockComponent implements OnDestroy, OnInit {

  listData : Stock[];
  listArticle : Article[];

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  closeResult: string;

  constructor(public crudApi: StockService, private artService: ArticleService,
    public toastr: ToastrService, private router : Router, public fb: FormBuilder,
    private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateApproComponent>,

  ) { }


  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };
    /*
    this.crudApi.getAllStocks().subscribe(
      response =>{
        this.listData = response;
        console.log(this.listData);
        this.dtTrigger.next();
      }
    ); */
    this.artService.getAllArticles().subscribe(
      response => {
        this.listArticle = response;
        this.dtTrigger.next();
      }
    );

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

  getListArticle() {
    this.artService.getAllArticles().subscribe(
      response =>{this.listArticle = response;}
    );
  }

  getListStocks() {
    this.crudApi.getAllStocks().subscribe(
      response =>{this.listData = response;}
    );
  }

  onCreateStock() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("approvisionnement");
  }
/*
  onCreateStock(){
    this.crudApi.choixmenu = "A";
   // this.router.navigateByUrl("scategorie");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateApproComponent, dialogConfig);
  }
*/
  editeStock(item : Stock) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateApproComponent, dialogConfig);
  }
  deleteStock(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer ce Stock ?')) {
    this.crudApi.deleteStock(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Stock supprimé avec succès!');
          this.rerender();
          this.getListStocks();
      },
        error => console.log(error));
    }

  }
  editScategorie(item : Stock) {

    this.router.navigateByUrl('stock/'+item.id);

  }


}
