import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Product, CreateProductData, UpdateProductData } from './models';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products$ = new BehaviorSubject<Product[]>([]);
  private _products$ = this.products$.asObservable();

  constructor(private notifier: NotifierService) { }

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  loadProducts(): void  {
    this.products$
      .next([
        {
        id: 1,
        name: 'Angular',
        description: 'Framework de desarrollo',
        price: 90,
        stock: 10,
      },
      {
        id: 2,
        name: 'Desarrollo Web Full Stack',
        description: 'Front-end y Back-end Developer',
        price: 100,
        stock: 10,
      },
      {
        id: 3,
        name: 'Ciberseguridad',
        description: 'Practicas de seguridad para malwares',
        price: 150,
        stock: 10,
      }
    ])
  }

  createProduct(product: CreateProductData): void {
    this._products$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.products$.next([...arrayActual, {...product, id: arrayActual.length + 1},
        ]);
        this.notifier.showSuccess('Curso Creado')
      }
    })
  }

  
  create(): void{
    this.products$.pipe(take(1)).subscribe({

      next: (arrayActual) => {
        arrayActual.push({
          id: arrayActual.length + 1,
          name: 'Random Name',
          description: 'Random description',
          price: 3,
          stock: 40,
        });

        this.products$.next([...arrayActual]);
      }
    })
  }
  

  deleteById(id: number): void {
    this.products$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.products$.next(
          arrayActual.filter((p) => p.id !== id)
        );
      }
    })
  }

  editById(id: number, updateData: UpdateProductData): void {
    this._products$.pipe(take(1)).subscribe(products => {
      const productIndex = products.findIndex(p => p.id === id);
      if (productIndex !== -1) {
        const updatedProduct: Product = {
          ...products[productIndex],
          ...updateData // Actualiza solo los campos que se hayan proporcionado
        };
  
        const updatedProducts = [...products];
        updatedProducts[productIndex] = updatedProduct;
        this.products$.next(updatedProducts);
        this.notifier.showSuccess('Curso Editado');
      }
    });
  }
}
