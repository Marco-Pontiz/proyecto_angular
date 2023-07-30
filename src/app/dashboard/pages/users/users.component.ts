import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';
import { UserService } from './user.service';
import { Observable, Subject, Subscription, delay, filter, forkJoin, map, of, takeUntil, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'src/app/core/services/notifier.service';

 // const ELEMENT_DATA: User[] = ;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnDestroy {

  public users: Observable<User[]>;
  public today = new Date();
  public semaforoSubscription?: Subscription;
  public allSubs: Subscription[] = [];
  public destroyed = new Subject<boolean>();
  public loading = false;
  public nombres: string[] = [];
  public numeros : number[] = [];

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
        // Abro el Modal
    .open(UserFormDialogComponent)
        // Y después de que cierre
    .afterClosed()
        // Hago esto... 
    .subscribe({
      next: (v) => {
        if (v) {
          this.userService.createUser({
            id: new Date().getTime(),
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
      // this.users = this.users.filter((u) => u.id !== userToDelete.id);
    }
  }

  onEditUser(userToEdit: User): void {
    this.matDialog
    .open(UserFormDialogComponent, {
      data: userToEdit
    })
    .afterClosed()
    .subscribe({
      next: (userUpdate) => {
        console.log(userUpdate)
        if (userUpdate) {
/*          this.users = this.users.map((user) => {
            return user.id === userToEdit.id 
            ? { ...user, ...userUpdate} //Verdadero
            : user //Falso; 
          }); */
        }
      },
    });
  }

}
