import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from './models';
import { ProductService } from './product.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, take } from 'rxjs';
import { FormCursosComponent } from './form-cursos/form-cursos.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
  ]
})
export class ProductsComponent implements OnInit, OnDestroy {
  public dataSource: Product[] = [];

  public data$: Observable<Product[]>;

  
  public displayedColumns = ['id', 'name', 'description', 'price', 'stock', 'actions'];

  constructor(private productService: ProductService, private matDialog: MatDialog) {
    this.data$ = this.productService.getProducts();
  }

  onCreateCurso(): void {
    this.matDialog.open(FormCursosComponent)
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    // Cargo los productos
    this.productService.loadProducts();

    //Luego los obtengo
    /*
    this.productService.getProducts().subscribe({
      next: (data) => console.log('data: ', data),
    });*/
  }

  onCreate(): void {
    this.productService.create();
  }

  onDelete(id: number): void {
    this.productService.deleteById(id);
  }
}
