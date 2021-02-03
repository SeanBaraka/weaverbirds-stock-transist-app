import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.sass']
})
export class DashboardAdminComponent implements OnInit {

  items: any[] = ['Point Of Sale', 'Purchases', 'Orders', 'Quotations','Invoices', 'Stock', 'Users', 'Product Categories']
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**responsible for page navigations from the main dashboard */
  navigateToDestination(index: any) {
    switch (index) {
      case 0:
        this.router.navigate(['/'])
        break;
    
      default:
        break;
    }
  }
}
