import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Product } from './models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products$ = new BehaviorSubject<Product[]>([]);

  constructor() { }

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
}
