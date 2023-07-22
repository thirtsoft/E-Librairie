import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LigneVente } from 'src/app/models/ligne-vente';
import { LigneVenteService } from 'src/app/services/ligne-vente.service';


@Component({
  selector: 'app-list-ligne-vente-libre',
  templateUrl: './list-ligne-vente-libre.component.html',
  styleUrls: ['./list-ligne-vente-libre.component.scss']
})
export class ListLigneVenteLibreComponent implements OnInit {

  constructor(private router: Router
  ) { }

  ngOnInit(): void {
  }

 
  onCreateLigneVente() {
    this.router.navigateByUrl("vendre");
  }

}
