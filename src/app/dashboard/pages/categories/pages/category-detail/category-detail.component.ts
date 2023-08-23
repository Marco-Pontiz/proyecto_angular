import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../products/product.service';
import { Product } from '../../../products/models';
import { Store } from '@ngrx/store';
import { CategoriesActions } from '../../store/categories.actions';
import { Observable } from 'rxjs';
import { selectCategoryDetailName } from '../../store/categories.selectors';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styles: [
  ]
})
export class CategoryDetailComponent implements OnInit{

  displayedColumns = ['id', 'name', 'price'];
  products: Product[] = [];
  categoryName$: Observable<string | undefined>;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private productService: ProductService,
    private store: Store,) {
  console.log(this.activatedRoute.snapshot.params);
  this.categoryName$ = this.store.select(selectCategoryDetailName);
  }
  ngOnInit(): void {
    this.store.dispatch(CategoriesActions.loadCategoriesDetail({ categoryId: this.activatedRoute.snapshot.params['id'] }))
    this.productService.getProductsByCategoryId(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (products) => (this.products = products),
    })
  }
}
