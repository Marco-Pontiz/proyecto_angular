import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
    {
        path:'home',
        component: HomeComponent,
    },
    {
        path:'users',
        loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule)
    },
    {
        path:'products',
        loadChildren: () => import('./pages/products/products.module').then((m) => m.ProductsModule)
    },
    {
        path:'categories',
        loadChildren: () => import('./pages/categories/categories.module').then((m) => m.CategoriesModule),
    },
    {
        path: '**',
        redirectTo: '/users'
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule {

}