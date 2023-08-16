import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../pages/users/models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Input()
  public drawer?: MatDrawer;
  public authUser$: Observable<User | null>;

  constructor(
    private authService: AuthService,
    private store: Store
    ) {
    this.authUser$ = this.store.select(selectAuthUser);
  }
}
