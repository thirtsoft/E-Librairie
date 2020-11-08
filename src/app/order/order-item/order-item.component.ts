import { Component, OnInit, Inject } from '@angular/core';
import { OrderItem } from 'src/app/models/ligne-cmd-client';
import { Item } from 'src/app/models/article';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ArticleService } from 'src/app/services/article.service';
import { OrderService } from 'src/app/services/order.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  formData: OrderItem;
  itemList: Item[];
  isValid: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemComponent>,
    private itemService: ArticleService,
    private orderSevice: OrderService) { }

  ngOnInit() {
    this.itemService.getAllArticles().subscribe(res => this.itemList = res as Item[]);
    if (this.data.orderItemIndex == null)
      this.formData = {
        OrderItemID: null,
        OrderID: this.data.OrderID,
        ItemID: 0,
        ItemName: '',
        prix: 0,
        Quantity: 0,
        Total: 0,
      }
    else
      this.formData = Object.assign({}, this.orderSevice.orderItems[this.data.orderItemIndex]);
  }

  updatePrice(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.formData.prix = 0;
      this.formData.ItemName = '';
    }
    else {
      this.formData.prix = this.itemList[ctrl.selectedIndex - 1].prixVente;
      this.formData.ItemName = this.itemList[ctrl.selectedIndex - 1].designation;
    }
    this.updateTotal();
  }

  updateTotal() {
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.prix).toFixed(2));
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null)
        this.orderSevice.orderItems.push(form.value);
      else
        this.orderSevice.orderItems[this.data.orderItemIndex] = form.value;
      this.dialogRef.close();
    }
  }

  validateForm(formData: OrderItem) {
    this.isValid = true;
    if (formData.ItemID == 0)
      this.isValid = false;
    else if (formData.Quantity == 0)
      this.isValid = false;
    return this.isValid;
  }


}
