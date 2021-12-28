import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Employe } from 'src/app/models/employe';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CreateEmployeComponent } from '../create-employe/create-employe.component';
import { DataTableDirective } from 'angular-datatables';
import { DialogService } from 'src/app/services/dialog.service';
import { map } from 'rxjs/operators';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss']
})
export class ListEmployeComponent implements OnDestroy, OnInit {

  emp: Employe;
  listData : Employe[];
  empID: number;

  editForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: EmployeService,
              public fb: FormBuilder,
              private route: ActivatedRoute,
              private router : Router,
              private dialogService: DialogService,
              public toastr: ToastrService,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<CreateEmployeComponent>,
  ) {
      this.crudApi.listen().subscribe((m:any) => {
        console.log(m);
        this.rerender();
        this.getListEmployes();
      })
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };
    this.crudApi.getAllEmployesOrderDesc().subscribe(
      response =>{
        this.listData = response;
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

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.crudApi.formData = {
      id: null,
      prenom: '',
      nom: '',
      cni: '',
      adresse: '',
      email: '',
      telephone: '',
      telephone2: ''
    };

  }

  getListEmployes() {
    this.crudApi.getAllEmployesOrderDesc().subscribe(
      response =>{
        this.listData = response;
      }
    );
  }

  onCreateEmploye(){
    this.crudApi.choixmenu = "A";
    //this.router.navigateByUrl("employes/new");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateEmployeComponent, dialogConfig);
  }

  editEmploye(item : Employe) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(CreateEmployeComponent, dialogConfig);
  }
  deleteEmploye(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteEmploye(id).subscribe(data => {
          this.toastr.warning('Employe supprimé avec succès!');
          this.rerender();
          this.getListEmployes();
        });
      }
    });
  }

  OpenPdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).open();
  }

  PrintPdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).print();
  }

  DownloadPdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).download();
  }

  getDocument() {
    return {
      content: [
        {
          text: 'AL AMINE',
          fontSize: 50,
          alignment: 'center',
          color: '#0000ff',
          decoration: 'underline',
          style: 'name',
        },
        {
          text: 'Prestation de Service & Commerce GeneralRC SN ZGR 2016 C233 / NINEA 00058166762P6',
          fontSize: 12,
          bold: true,
          color: '#0000ff'
        },
        {
          text: 'N°Compte CNCAS SN 048 03001 000108318801 J/40N° Compte BNDE SN 169 03001 001000519301/30',
          fontSize: 10.5,
          bold: true,
          color: '#0000ff'
        },
        {
          text: 'Tél: 77109 18 18 / Email: papeteriealamine@gmail.com',
          fontSize: 12,
          bold: true,
          alignment: 'center',
          color: '#0000ff'
        },
        {

        },


        {
          columns: [


          ]
        },

        {
          text: ' LISTE DES EMPLOYEES',
          alignment: 'center',
          fontSize: 20,
          color: '#0000ff',
          bold: true,
          margin: [0, 15, 0, 15]
        },

        {

        },

        this.getPDFListEmployees(this.crudApi.listData),
        {

        },

        {
          text: 'Signature',
          style: 'sign',
          alignment: 'right',
          decoration: 'underline',
        },


      ],

      styles: {
        header: {
          fontSize: 14,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        name: {
          fontSize: 14,
          bold: true
        },
        total: {
          fontSize: 12,
          bold: true,
          italics: true
        },
        ligne: {
          fontSize: 12,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
          fontSize: 14,
          alignment: 'center'
        },

      }
    };

  }
  getPDFListEmployees(item: Employe[]) {
    return {
      table: {
        widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto','auto'],
        body: [
          [

            {
              text: 'CNI',
              style: 'tableHeader'
            },
            {
              text: 'Prenom',
              style: 'tableHeader'
            },
            {
              text: 'Nom',
              style: 'tableHeader'
            },
            {
              text: 'Adresse',
              style: 'tableHeader'
            },
            {
              text: 'Telephone 1',
              style: 'tableHeader'
            },
            {
              text: 'Telephone 2',
              style: 'tableHeader'
            },
            {
              text: 'Email',
              style: 'tableHeader'
            },

          ],
          ...item.map(x => {
            return ([x.cni, x.prenom, x.nom, x.adresse,
              x.telephone, x.telephone2, x.email])
          }),

        ]
      }
    }

  }


}
