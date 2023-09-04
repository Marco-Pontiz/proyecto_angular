import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { CommonModule } from "@angular/common";
import { adminGuard } from "../core/guards/admin.guard";

const routes: Routes = [
    {
        path:'home',
        component: HomeComponent,
    },
    {
        path:'users',
        canActivate: [adminGuard],
        loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule)
    },
    {
        path:'products',
        loadChildren: () => import('./pages/products/product.module').then((m) => m.ProductsModule)
    },
    {
        path:'categories',
        loadChildren: () => import('./pages/categories/categories.module').then((m) => m.CategoriesModule),
    },
    {
        path:'sales',
        loadChildren: () => import('./pages/sales/sales.module').then((m) => m.SalesModule),
    },
    {
        path:'buyers',
        loadChildren: () => import('./pages/buyers/buyers.module').then((m) => m.BuyersModule),
    },
    {
        path:'counter',
        loadChildren: () => import('./pages/counter/counter.module').then((m) => m.CounterModule),
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