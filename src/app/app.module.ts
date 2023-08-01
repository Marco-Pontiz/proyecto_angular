import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import eslocale from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.component';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './dashboard/pages/products/products.module';

registerLocaleData(eslocale);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule, //dashboard module
    AuthModule, //auth module
    ProductsModule,
    
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-AR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
