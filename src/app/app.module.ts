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
import { AuthComponent } from './components/auth/auth.component';
import { UserLoggedInComponent } from './components/user-logged-in/user-logged-in.component';
import { SummariesComponent } from './components/summaries/summaries.component';
import { AddStockProductComponent } from './components/add-stock-product/add-stock-product.component';
import { ProductTransferComponent } from './components/product-transfer/product-transfer.component';
import { DataDeleteComponent } from './components/data-delete/data-delete.component';

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
    DashboardComponent,
    AuthComponent,
    UserLoggedInComponent,
    SummariesComponent,
    AddStockProductComponent,
    ProductTransferComponent,
    DataDeleteComponent
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
