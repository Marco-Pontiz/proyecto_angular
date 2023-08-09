import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
    {
        path: 'dashboard',
        canActivate:[authGuard],
        component: DashboardComponent,
        loadChildren: () => import('./dashboard/dashboard.module').then((d) => d.DashboardModule)
    },
    {
        path: 'auth',
        component: AuthComponent,
        loadChildren: () => import('./auth/auth.module').then((a) => a.AuthModule) 
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