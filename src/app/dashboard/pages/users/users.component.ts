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
          //this.users.push({
            //id: this.users.length + 1,
            //name: v.name,
            //surname: v.surname,
            //email: v.email,
            //password: v.password
          //})
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
}
