import { Component, OnInit } from '@angular/core';
import { ProductSaleService } from 'src/app/services/product-sale.service';

@Component({
  selector: 'app-shop-sales-report-all',
  templateUrl: './shop-sales-report-all.component.html',
  styleUrls: ['./shop-sales-report-all.component.sass']
})
export class ShopSalesReportAllComponent implements OnInit {

  // all sales 
  sales: any;
  shop: any;

  constructor(private salesService: ProductSaleService) { }

  ngOnInit(): void {
    this.getSales()
    this.shop = history.state.shop
  }

  /** get all sales records for this particular shop */
  getSales(): void {
    this.salesService.getAllSales().subscribe((response: any[]) => {
      response.forEach((sale) => {
        sale.date = new Date(sale.date).toLocaleDateString('en-GB')
      })
      this.sales = response;
    })
  }

  /** print all sales */
  reprintReceipt(receiptId: number): void {

  }

}
