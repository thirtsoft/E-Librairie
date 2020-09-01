import { Component, OnInit, OnDestroy } from '@angular/core';
import { CmdClient } from 'src/app/models/cmd-client';
import { Subject } from 'rxjs';
import { CmdClientService } from 'src/app/services/cmd-client.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-cmd-client',
  templateUrl: './list-cmd-client.component.html',
  styleUrls: ['./list-cmd-client.component.scss']
})
export class ListCmdClientComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  public commandeClients: CmdClient[];

  constructor(public cmdClientService: CmdClientService, public router: Router,
    public fb: FormBuilder, public toastr: ToastrService,
    private datePipe : DatePipe
    ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.cmdClientService.getListCmdClients().subscribe((data)  => {
      this.commandeClients = data;
      this.dtTrigger.next();
    });

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getListCmdClients() {
    this.cmdClientService.getListCmdClients().subscribe(
      response =>{this.commandeClients = response;}
    );

  }

  onCreateCommandeClient() {
    this.cmdClientService.choixmenu = "A";
    this.router.navigateByUrl("commandeclient");
  }

  onDeleteCommandeClient(id: number) {
    if (window.confirm('Etes-vous sure de vouloir supprimer cette Commande ?')) {
    this.cmdClientService.deleteCmdClient(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning('Commande supprimé avec succès!');
          this.getListCmdClients();
      },
        error => console.log(error));
    }

  }
  onEditCommandeClient(item : CmdClient) {

    this.router.navigateByUrl('commandeclient/'+item.id);

  }


}
