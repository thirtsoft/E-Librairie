import { Component, OnInit, Inject } from '@angular/core';
import { Client } from 'src/app/models/client';
import { CmdClientService } from 'src/app/services/cmd-client.service';
import { FormBuilder } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { CreateLcmdClientComponent } from '../create-lcmd-client/create-lcmd-client.component';

@Component({
  selector: 'app-create-cmd-client',
  templateUrl: './create-cmd-client.component.html',
  styleUrls: ['./create-cmd-client.component.scss']
})
export class CreateCmdClientComponent implements OnInit {

  ClientList: Client[];

  isValid:boolean = true;
  articleService: any;
  Date;
  compteur : any={};
  client   : any= {};
  annee  = 0;
  constructor(public service:CmdClientService,private dialog:MatDialog,
    public fb: FormBuilder, public clientService :ClientService,
    private toastr :ToastrService, private router :Router,
    private currentRoute: ActivatedRoute,private datePipe : DatePipe,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<CreateLcmdClientComponent>,
    ) { }

    get f() { return this.service.formData.controls }

  ngOnInit() {
    if (this.service.choixmenu == "A"){
      this.InfoForm();
      this.service.listData = [];
      this.Date = this.transformDate(new Date(Date.now()));
      this.annee = (this.Date).toString().substring(0,4);
     // this.f['annee'].setValue(this.annee);
    } else {

    }

    this.clientService.getAllClients().subscribe(
      response =>{this.ClientList = response;}
    );

  }

  InfoForm() {
    this.service.formData = this.fb.group({
      id :null,
      numCommande : 0,
      totalCommande : 0,
      status : '',
      dateCommande : '',
      lcomms :[],
      client: [],

    });

  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  OnSelectClient(event) {

  }

  AddData(lcommandeIndex,Id){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
   // dialogConfig.data={lcommandeIndex,Id};
    this.dialog.open(CreateLcmdClientComponent, dialogConfig).afterClosed()
    .subscribe(b10=>{
     // this.calcul();
    });
  }

  onDelete() {

  }

}
