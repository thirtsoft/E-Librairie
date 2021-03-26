import { Component, OnInit, Inject } from '@angular/core';
import { Avoir } from 'src/app/models/avoir';
import { Fournisseur } from 'src/app/models/fournisseur';
import { AvoirService } from 'src/app/services/avoir.service';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { DatePipe } from '@angular/common';
import { LigneAvoirService } from 'src/app/services/ligne-avoir.service';
import { CreateLigneAvoirComponent } from '../create-ligne-avoir/create-ligne-avoir.component';

@Component({
  selector: 'app-create-avoir',
  templateUrl: './create-avoir.component.html',
  styleUrls: ['./create-avoir.component.scss']
})
export class CreateAvoirComponent implements OnInit {

  avoir = new Avoir();
  formDataAvoir = new Avoir();

  date;
  FourList: Fournisseur[];
  isValid:boolean = true;
  articleService: any;
  compteur : any={};
  client: any={};
  annee  = 0;

  total = 0;

  submitted = false;

  referencAvoir;

  constructor(public crudApi: AvoirService, private dialog:MatDialog,
    public fb: FormBuilder, public fourService: FournisseurService,
    public lavoirService: LigneAvoirService, private datePipe : DatePipe,
    private toastr :ToastrService, private router :Router,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  get f() { return this.crudApi.formData.controls; }
  ngOnInit() {
    this.getListFournisseurs();
    if (this.crudApi.choixmenu == "A") {
      this.infoForm();
      this.crudApi.list = [];
    } else {
    }

    this.crudApi.getReferenceAvoir();

  }

  infoForm() {
    this.crudApi.formData = this.fb.group({
      id: null,
    //  reference: Math.floor(100000 + Math.random() * 900000).toString(),
      reference: this.crudApi.refAvoir,
      total: [0, Validators.required],
      libelle: ['', Validators.required],
      soldeAvoir: [0, Validators.required],
      nbreJours: [0, Validators.required],
      totalAvoir: [0, Validators.required],
      status: ['', Validators.required],
      fournisseur: [new Fournisseur(), Validators.required],
      lavoirs: [[], Validators.required],
    });
  }
  compareFournisseur(four1: Fournisseur, four2: Fournisseur) : boolean {
    return four1 && four2 ? four1.id === four2.id : four1 === four2;
  }

  getListFournisseurs() {
    this.fourService.getAllFournisseurs().subscribe((response) => {
      this.FourList = response as Fournisseur[];});
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  AddData(lavoirIndex, OrderId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data={lavoirIndex, OrderId};
    this.matDialog.open(CreateLigneAvoirComponent, dialogConfig).afterClosed().subscribe(res =>{
      this.calculMontantTotal();
    });
  }

  calculMontantTotal() {
    this.f['totalAvoir'].setValue(this.crudApi.list.reduce((prev, curr) => {
      return prev + curr.total;
    }, 0));
  }
  validateForm() {
    this.isValid = true;
    if (this.crudApi.formData.value.id_client==0)
      this.isValid = false
    else if (this.crudApi.list.length==0)
      this.isValid = false;
    return this.isValid;
  }

  onSubmit() {
    this.f['lavoirs'].setValue(this.crudApi.list);
    console.log(this.crudApi.formData.value);
    this.crudApi.createAvoir(this.crudApi.formData.value).subscribe(
      data => {
        console.log(this.crudApi.formData.value);
        this.toastr.success('Avoir Ajoutée avec succès');
        console.log(this.crudApi.formData.value);
        this.router.navigate(['/home/avoirs']);
      });
  }

  onDeleteOrderItem(id: number, i: number) {
    if (id != null) {
      this.lavoirService.deleteLigneAvoir(id).subscribe(data => {
        this.toastr.warning('Détails Avoir supprimé avec succès!');
      });
    }
    this.crudApi.list.splice(i, 1);
    this.calculMontantTotal();
  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

}


/*
  public avoir = new Avoir();
  formDataAvoir = new Avoir();
  listFournisseurs: Fournisseur[];

  submitted = false;

  constructor(public crudApi: AvoirService, public fourService: FournisseurService ,
    public fb: FormBuilder, public toastr: ToastrService, private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data, public dialogRef:MatDialogRef<CreateAvoirComponent>,

  ) { }

  ngOnInit() {
    this.getFournisseurs();
    if (!isNullOrUndefined(this.data.avoirId)) {
      this.formDataAvoir = Object.assign({},this.crudApi.listData[this.data.avoirId])
    }

  }

  getFournisseurs() {
    this.fourService.getAllFournisseurs().subscribe((response) => {
      this.listFournisseurs = response as Fournisseur[];});
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if(isNullOrUndefined(this.data.avoirId)) {
      this.crudApi.createAvoir(this.formDataAvoir).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Avoir Ajouté avec Succès");
        this.crudApi.getAllAvoirs().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/avoirs']);
      });

    }else {
      this.crudApi.updateAvoir(this.formDataAvoir.id, this.formDataAvoir).
      subscribe( data => {
        this.dialogRef.close();
        this.crudApi.filter('Register click');
        this.toastr.success("Avoir Modifiée avec Succès");
        this.crudApi.getAllAvoirs().subscribe(
          response =>{this.crudApi.listData = response;},
        );
        this.router.navigate(['/avoirs']);
      });
    }

  }

/*
  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.saveAvoir(this.avoir);
    }else {
      this.updateAvoir();
    }
  }

  saveAvoir(avoir: Avoir) {
    this.crudApi.createAvoir(avoir).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.filter('Register click');
      this.toastr.success("Avoir Ajouté avec Succès");
      this.crudApi.getAllAvoirs().subscribe(
        response =>{
          this.crudApi.listData = response;
        }

      );
      this.router.navigate(['/avoirs']);
    });
  }

  updateAvoir(){
    this.crudApi.updateAvoir(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Avoir Modifier avec Succès");
      this.crudApi.getAllAvoirs().subscribe(
        response =>{this.crudApi.listData = response;}
      );
      this.router.navigate(['/avoirs']);
    });

  }

}*/
