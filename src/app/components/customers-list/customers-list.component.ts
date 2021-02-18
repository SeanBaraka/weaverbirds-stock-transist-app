import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../services/customer.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.sass']
})
export class CustomersListComponent implements OnInit {
  customers: any[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomerList()
  }

  getCustomerList(): void {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response
    })
  }

  filterSalesControl(value: any) {

  }
}
