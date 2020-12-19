import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmPaymentComponent} from "../confirm-payment/confirm-payment.component";

@Component({
  selector: 'app-products-sale',
  templateUrl: './products-sale.component.html',
  styleUrls: ['./products-sale.component.sass']
})
export class ProductsSaleComponent implements OnInit {
  searchProduct = this.fb.group({
    serialNumber: ['', Validators.required]
  });
  completeSale = this.fb.group({
    amount: ['', Validators.required]
  });

  paymentMethod = {
    cash: false,
    mobile: false
  };

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.paymentMethod.cash = true;
    this.paymentMethod.mobile = false
  }

  productSearch(): void {
    console.log('searching for a product');
  }

  finalizeSale(): void {
    console.log('finalizing sale');
  }

  confirmMobilePayment(): void {
    this.dialog.open(ConfirmPaymentComponent, {
      width: '540px',
      height: '240px'
    });
  }

  mobilePayment(): void {
    this.paymentMethod.mobile = true;
    this.paymentMethod.cash = !this.paymentMethod.mobile;
  }

  cashPayment(): void {
    this.paymentMethod.cash = true;
    this.paymentMethod.mobile = !this.paymentMethod.cash;
  }
}
