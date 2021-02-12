import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-sales-invoices-report',
  templateUrl: './shop-sales-invoices-report.component.html',
  styleUrls: ['./shop-sales-invoices-report.component.sass']
})
export class ShopSalesInvoicesReportComponent implements OnInit {

  shopInvoices: any[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
