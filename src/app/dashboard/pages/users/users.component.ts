import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';

const ELEMENT_DATA: User[] = [
  {
    id: 1,
    name: 'Walter',
    surname: 'White',
    email: 'Heisenberg@mail.com',
    password: '123456789'
  }
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  public users: User[] = ELEMENT_DATA;
  public today = new Date();

  constructor(
    private matDialog: MatDialog
  ) {}

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
          //this.users.push()
          this.users = [
            ...this.users,{
            id: this.users.length + 1,
            name: v.name,
            surname: v.surname,
            email: v.email,
            password: v.password
            },
          ];
          console.log('Recibimos el valor: ', v);
        } else {
          console.log('Se cancelo el proceso');
        }
      },
    });
  }
  onDeleteUser(userToDelete: User): void {
    if(confirm(`Estás seguro en querer eliminar a ${userToDelete.name}?`)){
      this.users = this.users.filter((u) => u.id !== userToDelete.id);
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
          this.users = this.users.map((user) => {
            return user.id === userToEdit.id 
            ? { ...user, ...userUpdate} //Verdadero
            : user //Falso; 
          })
        }
      },
    });
  }
}
