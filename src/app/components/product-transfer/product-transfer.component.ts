import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-product-transfer',
  templateUrl: './product-transfer.component.html',
  styleUrls: ['./product-transfer.component.sass']
})
export class ProductTransferComponent implements OnInit {
  transferForm = this.fb.group({
    productId: [''],
    shopName: ['', Validators.required],
    qty: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public transferData: any
  ) { }

  ngOnInit(): void {
  }

  completeTransfer(): void {

  }
}
