import { Component, OnInit } from '@angular/core';
import { ProductSaleService } from 'src/app/services/product-sale.service';

@Component({
  selector: 'app-shop-sales-report',
  templateUrl: './shop-sales-report.component.html',
  styleUrls: ['./shop-sales-report.component.sass']
})
export class ShopSalesReportComponent implements OnInit {

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

  /** filter sales records based on a certain criteria */
  filterSalesControl(param: any): void {

  }

  /** print all sales */
  reprintReceipt(receiptId: number): void {

  }

}
