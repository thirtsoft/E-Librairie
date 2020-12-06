import { Component, OnInit, Inject } from '@angular/core';
import { Versement } from 'src/app/models/versement';
import { Employe } from 'src/app/models/employe';
import { VersementService } from 'src/app/services/versement.service';
import { EmployeService } from 'src/app/services/employe.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-view-versement',
  templateUrl: './view-versement.component.html',
  styleUrls: ['./view-versement.component.scss']
})
export class ViewVersementComponent implements OnInit {

  formDataVersement = new Versement();
  listEmployes: Employe[];

  constructor(public crudApi: VersementService, public empService: EmployeService ,
    public toastr: ToastrService, private datePipe : DatePipe,
    private router : Router, public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<ViewVersementComponent>,
  ) { }

  ngOnInit() {
    this.getEmployes();
    if (!isNullOrUndefined(this.data.verId)) {
      this.formDataVersement = Object.assign({},this.crudApi.listData[this.data.verId])
    }
  }

  getEmployes() {
    this.empService.getAllEmployes().subscribe((response) => {
      this.listEmployes = response as Employe[];});
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  onSubmit() {}

}
