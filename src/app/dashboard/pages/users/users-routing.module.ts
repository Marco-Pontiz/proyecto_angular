import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'users',
        component: UsersComponent
    },
    {
        path:'users/:id',
        component: UserDetailComponent
    }
    ])
  ],
  exports: [RouterModule],
})
export class UsersRoutingModule { }
