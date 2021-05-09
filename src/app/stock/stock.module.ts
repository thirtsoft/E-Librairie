import { CreateStockComponent } from './create-stock/create-stock.component';
import { ListStockComponent } from './list-stock/list-stock.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockRoutingModule } from './stock-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListStockComponent,
    CreateStockComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StockModule { }
