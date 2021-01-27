import { Component, OnInit } from '@angular/core';
import { ProductSaleService } from 'src/app/services/product-sale.service';
import {RealTimeDataService} from "../../services/real-time-data.service";

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.sass']
})
export class FinanceComponent implements OnInit {

  constructor(
    private dataService: RealTimeDataService,
    private salesService: ProductSaleService
  ) { }

  cashSales = 0;
  mobileSales = 0;
  invoices = 0;

  ngOnInit(): void {
    this.dataService.getAccountBalance();
    this.getSales()
  }

  /** we create a list that holds the sales transaction of a particular payment method */
  transactionSales: any[] = [];

  /** a list of all sales recorded */
  allSales: any[]
  // getting all sales and assigning them to our list of all sales.
  getSales(): void {
    this.salesService.getAllSales().subscribe((response) => {
      this.allSales = response
      this.filterSales('CASH', this.allSales)
      this.cashSales = this.computeTotalSales(this.transactionSales)
    });
  }

  // filter sales based on the payment method.
  filterSales(method: string, saleRecords?: any[]): void {
    const sales = saleRecords.filter(sale => sale.paymentMethod.toLowerCase() === method.toLowerCase())
    sales.forEach((sale) => {
      sale.date = new Date(sale.date).toLocaleDateString('en-GB')
    })
    this.transactionSales = sales;
  }

  computeTotalSales(sales: any[]): number {
    const amounts = []
    sales.forEach((sale) => amounts.push(sale.saleAmount))
    
    return amounts.reduce((a, b) => a + b)
  }


}
