import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { StockManagementComponent } from './components/stock-management/stock-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { ProductsComponent } from './components/products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import { OpenShopComponent } from './components/open-shop/open-shop.component';
import { CloseShopComponent } from './components/close-shop/close-shop.component';
import { ShopsAvailableComponent } from './components/shops-available/shops-available.component';
import { VehicleRoutesComponent } from './components/vehicle-routes/vehicle-routes.component';
import { PersonnelComponent } from './components/personnel/personnel.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { AddDriverStockComponent } from './components/add-driver-stock/add-driver-stock.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    SidemenuComponent,
    StockManagementComponent,
    ProductsComponent,
    OpenShopComponent,
    CloseShopComponent,
    ShopsAvailableComponent,
    VehicleRoutesComponent,
    PersonnelComponent,
    VehiclesComponent,
    AddDriverStockComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
