import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockManagementComponent } from './components/stock-management/stock-management.component';
import {ProductsComponent} from "./components/products/products.component";
import {ShopsAvailableComponent} from "./components/shops-available/shops-available.component";
import {VehiclesComponent} from "./components/vehicles/vehicles.component";
import {PersonnelComponent} from "./components/personnel/personnel.component";
import {VehicleRoutesComponent} from "./components/vehicle-routes/vehicle-routes.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthGuard} from "./services/auth.guard";
import {AuthComponent} from "./components/auth/auth.component";
import {SummariesComponent} from "./components/summaries/summaries.component";
import {FinanceComponent} from "./components/finance/finance.component";
import {StockTakeBarComponent} from "./components/stock-take-bar/stock-take-bar.component";

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: 'products', component: ProductsComponent },
      { path: '', redirectTo: 'summaries', pathMatch: 'full'},
      { path: 'summaries', component: SummariesComponent },
      { path: 'stock', component: StockManagementComponent },
      { path: 'stock-bar', component: StockTakeBarComponent },
      { path: 'shops', component: ShopsAvailableComponent },
      { path: 'vehicles', component: VehiclesComponent },
      { path: 'routes', component: VehicleRoutesComponent },
      { path: 'personnel', component: PersonnelComponent },
      { path: 'finance', component: FinanceComponent }
    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
