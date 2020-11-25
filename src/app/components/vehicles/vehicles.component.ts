import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {VehicleService} from "../../services/vehicle.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddDriverStockComponent} from "../add-driver-stock/add-driver-stock.component";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.sass']
})
export class VehiclesComponent implements OnInit {

  constructor(private fb: FormBuilder, private vehicleService: VehicleService, private dialog: MatDialog) { }

  vehicleForm = this.fb.group({
    plateNumber: ['', Validators.required],
    modelType: ['', Validators.required],
  });

  vehicles: any[] = [];
  inRouteVehicles: any[] = [];

  ngOnInit(): void {
    this.getVehicles();
    this.getVehiclesInRoutes();
  }

  getVehicles(): void {
    this.vehicleService.getVehicles().subscribe((response) => {
      this.vehicles = response;
    });
  }

  getVehiclesInRoutes(): void {
    this.vehicleService.vehiclesInTransist().subscribe((data) => {
      this.inRouteVehicles = data;
    });
  }

  addVehicle(): void {
    this.vehicleService.addVehicle(this.vehicleForm.value).subscribe((response) => {
      if (response) {
        this.getVehicles();
        this.vehicleForm.reset();
      }
    });
  }

  assignRouteDriver(plateNumber: string): void {
    this.dialog.open(AddDriverStockComponent, {
      width: '600px',
      height: '90vh',
      data: {plateNumber}
    }).afterClosed().subscribe((responseData) => {
      if (responseData) {
        this.ngOnInit();
      }
    });
  }
}
