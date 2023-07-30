import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { UsersComponent } from './dashboard/pages/users/users.component';
import { UserDetailComponent } from './dashboard/pages/users/pages/user-detail/user-detail.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [{
            // dashboard/home
            path: 'home',
            component: HomeComponent,
        },
        {
            path:'users',
            children: [
                {
                    // /dashboard/users
                    path: '',
                    component: UsersComponent
                },
                {
                    // /dashboard/users/:id
                    path: ':id',
                    component: UserDetailComponent
                }
            ]
        },

        {
            path: '**',
            redirectTo: 'users',
        }
    ]
    },
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: '**',
                redirectTo: 'login'
            }
        ]
    },
    {
        // ** Se utiliza para decir "Cualquier path que no sea ninguno de los declarados anteriormente"
        path: '**',
        redirectTo: '/dashboard',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}