import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { StockService } from 'src/app/services/stock.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { CreateArticleComponent } from 'src/app/article/create-article/create-article.component';
import { CreateApproComponent } from 'src/app/approvisionnement/create-appro/create-appro.component';

@Component({
  selector: 'app-list-stock',
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.scss']
})
export class ListStockComponent implements OnDestroy, OnInit {

  listData : Stock[];

  private editForm: FormGroup;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  closeResult: string;

  constructor(public crudApi: StockService, public fb: FormBuilder,
    public toastr: ToastrService, private router : Router,
    private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateApproComponent>,

  ) { }


  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.crudApi.getAllStocks().subscribe(
      response =>{
        this.listData = response;
        this.dtTrigger.next();
      }
    );

    //this.getListScategories();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getListStocks() {
    this.crudApi.getAllStocks().subscribe(
      response =>{this.listData = response;}
    );

  }

  onCreateStock(){
    this.crudApi.choixmenu = "A";
   // this.router.navigateByUrl("scategorie");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateApproComponent, dialogConfig);
  }

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
          this.getListStocks();
      },
        error => console.log(error));
    }

  }
  editScategorie(item : Stock) {

    this.router.navigateByUrl('stock/'+item.id);

  }


}
