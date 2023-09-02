import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product, UpdateProductData } from './models';
import { ProductService } from './product.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormCursosComponent } from './form-cursos/form-cursos.component';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

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

  public isAdmin$: Observable<boolean>;

  constructor(private productService: ProductService, private matDialog: MatDialog, private store: Store) {
    this.data$ = this.productService.getProducts();
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

  onCreateProduct(): void {
    this.matDialog
    .open(FormCursosComponent)
    .afterClosed()
    .subscribe({
      next: (v) => {
        if (v) {
          this.productService.createProduct({
            name: v.name,
            description: v.description,
            price: v.price,
            stock: v.stock,
            categoryId: v.categoryId
          })
          console.log('Curso creado')
        } else {
          console.log('Falla al cargar el curso')
        }
      }
    })
  }

  ngOnDestroy(): void {

  }
  ngOnInit(): void {
    this.productService.loadProducts();
  }

  onCreate(): void {
    this.productService.create();
  }

  onDelete(id: number): void {
    this.productService.deleteById(id);
  }

  onEdit(id: number): void {
    const updateData: UpdateProductData = {
      
    };

    this.productService.editById(id, updateData);
  } 
}
