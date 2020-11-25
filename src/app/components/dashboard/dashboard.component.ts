import { Component, OnInit } from '@angular/core';
import {StockDataService} from "../../services/stock-data.service";
import {VehicleService} from "../../services/vehicle.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  shops: any[] = [];
  vehiclesInRoute: any[] = [];
  dateToday = new Date(Date.now()).toDateString();

  constructor(
    private stockService: StockDataService,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.getShops();
    this.getVehiclesInRoute();
  }

  getShops(): void {
    this.stockService.getShops().subscribe((data) => {
      this.shops = data;
    });
  }

  getVehiclesInRoute(): void {
    this.vehicleService.vehiclesInTransist().subscribe((data: any[]) => {
      data.forEach((item) => {
        item.date = new Date(item.date).toLocaleDateString();
      });
      this.vehiclesInRoute = data;
    });
  }

}
