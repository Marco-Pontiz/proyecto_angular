import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { UserDetailComponent } from "./pages/users/pages/user-detail/user-detail.component";
import { UsersComponent } from "./pages/users/users.component";
import { ProductsComponent } from "./pages/products/products.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path:'home',
                component: HomeComponent,
            },
            {
                path:'users',
                children: [
                    {
                        path:'',
                        component: UsersComponent
                    },
                    {
                        path:':id',
                        component: UserDetailComponent
                    }
                ]
            },
            {
                path:'products',
                component: ProductsComponent
            },
            {
                path: '**',
                redirectTo: 'users'
            }
        ])
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule {

}