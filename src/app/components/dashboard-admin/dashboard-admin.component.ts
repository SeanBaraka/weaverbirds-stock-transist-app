import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockDataService } from 'src/app/services/stock-data.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',  
  styleUrls: ['./dashboard-admin.component.sass']
})  
export class DashboardAdminComponent implements OnInit {

  items: any[] = []
  shops: any[] = []
  vehicles: any[];

  constructor(private router: Router, 
  private shopsService: StockDataService,
  private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getAvailableShops()
    this.getVehicles()
  }

  /**responsible for page navigations from the main dashboard */
  navigateToDestination(shop: any) {
    switch (shop.category.name) {
      case 'Bar':
        this.router.navigate(['dashboard/stock'], {
          state: {
            shop,
            simpleShop: true,
            openStatus: shop.openStatus
          }
        });
        break;  
    
      default:
        this.router.navigate(['admin','shop'], {
          state: {
            shop
          }
        })
        break;
    }
  }

  getAvailableShops(): void {
    this.shopsService.getShops().subscribe((response: any[]) => {
      this.shops = response
    })
  }

  getVehicles(): void {
    this.vehicleService.getVehicles().subscribe((response) => {
      this.vehicles = response
    })
  }
}
