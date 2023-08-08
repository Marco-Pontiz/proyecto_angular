import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  {
    path:'categories',
    component: CategoriesComponent
  }
];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {

}
