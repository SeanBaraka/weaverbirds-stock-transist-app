import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StockDataService } from 'src/app/services/stock-data.service';
import { ProductsSaleComponent } from '../products-sale/products-sale.component';

@Component({
  selector: 'app-shop-dashboard',
  templateUrl: './shop-dashboard.component.html',
  styleUrls: ['./shop-dashboard.component.sass']
})
export class ShopDashboardComponent implements OnInit {

  stockProducts: any = []
  shop: any;
  items = ['POS','Invoices', 'Suppliers', 'Quotations', 'Stock', 'Reports', 'Purchases', 'Cash Summary']
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private stockData: StockDataService) { }

  ngOnInit(): void {
    this.shop = history.state.shop
    this.getShopProducts();
  }

  getShopProducts(): void {
    this.stockData.getShopStock(this.shop.id).subscribe((products) => {
      if (products) {
        this.stockProducts = products;
      }
    });
  }

  navigateToDestination(index: number): void {
    switch (index) {
      case 0:
        this.dialog.open(ProductsSaleComponent, {
          width: '90%',
          height: '540px',
          data: {shopId: this.shop.id, stockProducts: this.stockProducts, shopName: this.shop.name}
        }).afterClosed().subscribe((data) => {
          if (data) {
            // this.getShopStock();
          }
        });
        break;
      case 4:
        this.router.navigate(['dashboard','stock'], {
          state: {
            shop: this.shop,
            simpleShop: true,
            openStatus: this.shop.openStatus
          }
        })

      case 5: 
        this.router.navigate(['dashboard', 'reports'], {
          state: {
            shop: this.shop
          }
        })
    
      default:
        break;
    }
  }

}
