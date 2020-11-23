import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {StockDataService} from "../../services/stock-data.service";
import {MatDialog} from "@angular/material/dialog";
import {OpenShopComponent} from "../open-shop/open-shop.component";
import {CloseShopComponent} from "../close-shop/close-shop.component";
import {Product} from "../../interfaces/product";

@Component({
  selector: 'app-stock-management',
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.sass']
})
export class StockManagementComponent implements OnInit {
  shopOpen = false;
  shopClosed = false;
  shopId: any;
  shopName: any;
  openingStock: any;
  amount: any;
  stockProducts: Array<Product> = [];

  constructor(private fb: FormBuilder, private stockData: StockDataService, private dialog: MatDialog) { }

  shopSearch = this.fb.group({
    shopName: ['', Validators.required]
  });

  ngOnInit(): void {

  }

  getShop(): void {
    this.stockData.getShopData(this.shopSearch.value).subscribe((data: any) => {
      this.shopId = data.shop.id;
      this.shopName = data.shop.name;
      this.shopOpen = data.shop.openStatus;
      this.shopClosed = !this.shopOpen;
      this.openingStock = data.shop.openingStock;
      this.amount = data.shop.amount;
      this.getShopStock();
    });
  }

  getShopStock(): void {
    const shortDate = new Date(Date.now()).toISOString().split('T')[0];
    this.stockData.getDaysStock(this.shopId, shortDate).subscribe((res: any[]) => {
      this.stockProducts = res;
    });
  }

  openShopModal(): void {
    this.dialog.open(OpenShopComponent, {
      width: '680px',
      height: '90vh',
      disableClose: true,
      data: {shopId: this.shopId}
    }).afterClosed().subscribe((data) => {
      if (data) {
        this.getShopStock();
        this.shopOpen = !this.shopOpen;
        this.shopClosed = !this.shopClosed;
      }
    });
  }

  closeShopModal(): void {
    this.dialog.open(CloseShopComponent, {
      width: '680px',
      height: '90vh',
      disableClose: true,
      data: {shopId: this.shopId, stockProducts: this.stockProducts, shopName: this.shopName}
    }).afterClosed().subscribe((data) => {
      if (data) {
        this.getShopStock();
        this.shopOpen = !this.shopOpen;
        this.shopClosed = !this.shopClosed;
      }
    });
  }

  getStockTotal(): number {
    const totalStock = [];
    this.stockProducts.forEach((item) => {
      totalStock.push(item.openingUnits);
    });

    return totalStock.reduce((a, b) => a + b , 0);
  }

  getStockTotalAmount(): number {

    const totalAmount = []
    this.stockProducts.forEach((item) => {
      totalAmount.push(item.openingUnits * item.unitPrice);
    });

    return totalAmount.reduce((a, b) => a + b , 0);
  }
}
