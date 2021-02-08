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
  items = [
    {title:'POS', image: 'credit-card-machine.svg'},
    {title: 'Invoices', image: 'invoice.svg'}, 
    {title: 'Purchases', image: 'supply.svg'}, 
    {title: 'Quotations', image: 'payment.svg'}, 
    {title:'Stock', image: 'stock-image.svg'}, 
    {title:'Reports', image: 'report.svg'}, 
    {title: 'Cash Summary', image: 'money.png'},
    {title:'Expenses & Gifts', image: 'market.svg'}
  ]

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

  navigateToDestination(item: any): void {
    switch (item.title) {
      case 'POS':
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

      // Opens the POS dialog box, while open, the window should 
      // be focused on the invoice section of the sale.
      case 'Invoices':
        this.dialog.open(ProductsSaleComponent, {
          width: '90%',
          height: '540px',
          data: {shopId: this.shop.id, stockProducts: this.stockProducts, shopName: this.shop.name, invoice: true }
        }).afterClosed().subscribe((data) => {
          if (data) {
            // this.getShopStock();
          }
        });
        break;

      case 'Stock':
        this.router.navigate(['dashboard','stock'], {
          state: {
            shop: this.shop,
            simpleShop: true,
            openStatus: this.shop.openStatus
          }
        })
        break;

      case 'Reports': 
        this.router.navigate(['dashboard', 'reports'], {
          state: {
            shop: this.shop
          }
        })
        break;
    
      case 'Cash Summary':
        this.router.navigate(['dashboard', 'reports'], {
          state: {
            shop: this.shop
          }
        })
        break;
        
      default:
        break;
    }
  }

  navigateBack(): void {
    this.router.navigate(['admin'])
  }

}
