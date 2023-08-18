import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';

const routes: Routes = [
  {
    path:'',
    component: CategoriesComponent
  },
  {
    path:':id',
    component: CategoryDetailComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {

}
