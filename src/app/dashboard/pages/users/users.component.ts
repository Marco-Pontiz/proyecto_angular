import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';
import { UserService } from './user.service';
import { Observable, Subject} from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnDestroy {

  public users: Observable<User[]>;
  public today = new Date();
  public destroyed = new Subject<boolean>();
  public loading = false;

  constructor(
    private matDialog: MatDialog, 
    private userService: UserService,
    private notifier: NotifierService,
    @Inject('IS_DEV') private isDev: boolean,
  ) {
    this.userService.loadUsers();
    this.users = this.userService.getUsers();
}
  
  
  ngOnDestroy(): void {
      this.destroyed.next(true);
  }

  onCreateUser(): void {
    this.matDialog
    .open(UserFormDialogComponent)
    .afterClosed()
    .subscribe({
      next: (v) => {
        if (v) {
          this.userService.createUser({
            name: v.name,
            surname: v.surname,
            email: v.email,
            password: v.password
          })
        }
      },
    });
  }

  onDeleteUser(userToDelete: User): void {
    if(confirm(`Estás seguro en querer eliminar a ${userToDelete.name}?`)){
      this.userService.deleteUserById(userToDelete.id);
    }
  }

  onEditUser(userToEdit: User): void {
    this.matDialog
    .open(UserFormDialogComponent, {
      data: userToEdit
    })
    .afterClosed()
    .subscribe({
      next: (userUpdated) => {
        if (userUpdated) {
        this.userService.updateUserById(userToEdit.id, userUpdated);
        }
      },
    });
  }
}
