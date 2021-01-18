import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import { ProductsManagementService } from 'src/app/services/products-management.service';
import { StockDataService } from 'src/app/services/stock-data.service';

@Component({
  selector: 'app-product-transfer',
  templateUrl: './product-transfer.component.html',
  styleUrls: ['./product-transfer.component.sass']
})
export class ProductTransferComponent implements OnInit {
  transferForm = this.fb.group({
    productId: [''],
    destinationShopId: ['', Validators.required],
    quantity: ['', Validators.required]
  });

  availableShops: any[] = []

  constructor(
    private fb: FormBuilder,
    private productManagement: ProductsManagementService,
    private shopService: StockDataService,
    @Inject(MAT_DIALOG_DATA) public transferData: any
  ) { }

  ngOnInit(): void {
    this.getAvailableShops();
    this.transferForm.get('productId').setValue(this.transferData.product.id)
  }

  getAvailableShops(): void {
    this.shopService.getShops().subscribe((shops: any[]) => {
      this.availableShops = shops.filter(x => x.id != this.transferData.shopId )
    })
  }

  completeTransfer(): void { 
    console.log(this.transferForm.value)
    // this.productManagement.transferProducts(transferInfo).subscribe((response) => {
    //   console.log(response)
    // })
  }
}
