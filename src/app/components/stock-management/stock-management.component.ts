import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {StockDataService} from "../../services/stock-data.service";
import {MatDialog} from "@angular/material/dialog";
import {OpenShopComponent} from "../open-shop/open-shop.component";
import {CloseShopComponent} from "../close-shop/close-shop.component";
import {Product} from "../../interfaces/product";
import {AddStockProductComponent} from "../add-stock-product/add-stock-product.component";
import {ProductTransferComponent} from "../product-transfer/product-transfer.component";
import {DataDeleteComponent} from "../data-delete/data-delete.component";

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
  stockProducts: any[] = [];

  constructor(private fb: FormBuilder, private stockData: StockDataService, private dialog: MatDialog) { }

  shopSearch = this.fb.group({
    shopName: ['', Validators.required]
  });
  shops: any[] = [];

  // selected shop from the dashboard summaries
  selectedShop: any;
  loading = false;

  ngOnInit(): void {
    this.selectedShop = history.state.shop;
    this.getShop(this.selectedShop.name);
    this.getShops();
  }

  getShop(shopName?: string): void {
    if (shopName != null && shopName !== '') {
      const shopInfo = {
        shopName
      };
      this.stockData.getShopData(shopInfo).subscribe((shopData: any) => {
        this.shopId = shopData.shop.id;
        this.shopName = shopData.shop.name;
        this.shopOpen = shopData.shop.openStatus;
        this.shopClosed = !this.shopOpen;
        this.openingStock = shopData.shop.openingStock;
        this.amount = shopData.shop.amount;
        this.getShopStock();
      });
    } else {
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
  }

  getShopStock(): void {
    this.loading = true;
    // const shortDate = new Date(Date.now()).toISOString().split('T')[0];
    this.stockData.getShopStock(this.selectedShop.id).subscribe((products) => {
      if (products) {
        this.loading = false;
        this.stockProducts = products;
      }
    });
  }

  openShopModal(): void {
    this.dialog.open(OpenShopComponent, {
      width: '680px',
      height: '90vh',
      disableClose: true,
      data: {shopId: this.shopId}
    }).afterClosed().subscribe((data) => {
      if (data !== 'true') {
        this.getShop(this.shopSearch.get('shopName').value);
        // this.getShopStock();
        // this.shopOpen = !this.shopOpen; // remain true
        // this.shopClosed = false;
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
      if (data !== 'true') {
        this.getShopStock();
        this.shopOpen = !this.shopOpen;
        this.shopClosed = !this.shopClosed;
      }
    });
  }

  getStockTotal(): number {
    const totalStock = [];
    this.stockProducts.forEach((item) => {
      totalStock.push((item.openingUnits + item.addedUnits));
    });

    return totalStock.reduce((a, b) => a + b , 0);
  }

  getStockTotalAmount(): number {
    const totalAmount = [];
    this.stockProducts.forEach((item) => {
      totalAmount.push((item.openingUnits + item.addedUnits) * item.unitPrice);
    });

    return totalAmount.reduce((a, b) => a + b , 0);
  }

  getShops(): void {
    this.stockData.getShops().subscribe((data) => {
      this.shops = data;
    });
  }

  launchAddModal(): void {
    this.dialog.open(AddStockProductComponent, {
      width: '680px',
      height: '300px',
      data: {
        shopId: this.selectedShop.id
      }
    }).afterClosed().subscribe((data) => {
      if (data === 'true') {
        this.getShopStock();
      }
    });
  }

  transferProduct(product): void {
    this.dialog.open(ProductTransferComponent, {
      width: '680px',
      height: '250px',
      data: {
        shopId: this.selectedShop.id,
        product
      }
    }).afterClosed().subscribe((data) => {
      if (data === 'true') {
        this.getShopStock();
      }
    });
  }

  deleteProduct(id: number): void {
    this.dialog.open(DataDeleteComponent, {
      width: '680px',
      height: '250px',
      data: {
        productId: id
      }
    }).afterClosed().subscribe((data) => {
      if (data === 'true') {
        this.getShopStock();
      }
    });
  }
}
