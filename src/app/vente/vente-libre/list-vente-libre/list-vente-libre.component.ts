import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Vente } from 'src/app/models/vente';
import { DialogService } from 'src/app/services/dialog.service';
import { VenteService } from 'src/app/services/vente.service';

@Component({
  selector: 'app-list-vente-libre',
  templateUrl: './list-vente-libre.component.html',
  styleUrls: ['./list-vente-libre.component.scss']
})
export class ListVenteLibreComponent implements OnInit {

  listData: Vente[];
  sumVenteByDay;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  roles: string[];

  isLoggedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  showAssocieBoard = false;
  showGerantBoard = false;
  showVendeurBoard = false;

  constructor(public crudApi: VenteService,
              public toastr: ToastrService,
              private dialogService: DialogService,
              private datePipe : DatePipe,
              private tokenService: TokenStorageService,
              public fb: FormBuilder,
              private router : Router,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showManagerBoard = this.roles.includes("ROLE_MANAGER");
      this.showAssocieBoard = this.roles.includes('ROLE_ASSOCIE');
      this.showGerantBoard = this.roles.includes('ROLE_GERANT');
      this.showVendeurBoard = this.roles.includes('ROLE_VENDEUR');
    };
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };
    this.crudApi.getTop100VentesOrderDesc().subscribe(
      response =>{
        this.listData = response;
        this.dtTrigger.next();
      }
    );
    this.getSumOfVenteByDay();
  }

  getSumOfVenteByDay(): void {
    this.crudApi.getSumVenteByDay().subscribe(data => {
      this.sumVenteByDay = data;
      console.log(this.sumVenteByDay);
    });
  }

  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getListVentes() {
    this.crudApi.getTop100VentesOrderDesc().subscribe(
      response =>{
        this.listData = response;
      }
    );
  }

  onCreateVente() {
    this.crudApi.choixmenu = "A";
    this.router.navigateByUrl("vendre");
  }

  deleteVente(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteVente(id).subscribe(data => {
          this.toastr.warning('Vente supprimé avec succès!');
          this.rerender();
          this.getListVentes();
          this.router.navigateByUrl('list-ventes')
        });
      }
    });
  }

  editerVente(item : Vente) {
    this.router.navigateByUrl('list-ventes/'+item.id);
  }

  detailVente(item: Vente) {
    this.router.navigateByUrl('detail-vente/' + item.id);
  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd, h:mm:ss');
  }

  seConnecter() {
    this.router.navigateByUrl('login');
    window.location.reload();
  }

}