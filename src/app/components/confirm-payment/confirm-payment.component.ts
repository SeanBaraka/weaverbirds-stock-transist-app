import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.sass']
})
export class ConfirmPaymentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  transaction: any

  ngOnInit(): void {
    this.transaction = this.data
    console.log(this.transaction);
    
    
  }

}
