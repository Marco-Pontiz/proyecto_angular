import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormCursosModule } from './form-cursos/form-cursos.module';


@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    FormCursosModule
  ]
})
export class ProductsModule { }
