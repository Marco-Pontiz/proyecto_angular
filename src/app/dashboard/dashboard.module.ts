import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HomeModule } from './pages/home/home.module';
import { UsersModule } from './pages/users/users.module';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { ProductsModule } from './pages/products/product.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SalesModule } from './pages/sales/sales.module';
import { BuyersModule } from './pages/buyers/buyers.module';


@NgModule({
  declarations: [
    DashboardComponent,
    NavMenuComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    HomeModule,
    SalesModule,
    BuyersModule,
    ProductsModule, //Productos
    UsersModule,
    RouterModule,
    DashboardRoutingModule, //Modulos de rutas
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {}
