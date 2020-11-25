import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockManagementComponent } from './components/stock-management/stock-management.component';
import {ProductsComponent} from "./components/products/products.component";
import {ShopsAvailableComponent} from "./components/shops-available/shops-available.component";
import {VehiclesComponent} from "./components/vehicles/vehicles.component";
import {PersonnelComponent} from "./components/personnel/personnel.component";
import {VehicleRoutesComponent} from "./components/vehicle-routes/vehicle-routes.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'stock', component: StockManagementComponent },
  { path: 'shops', component: ShopsAvailableComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'routes', component: VehicleRoutesComponent },
  { path: 'personnel', component: PersonnelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
