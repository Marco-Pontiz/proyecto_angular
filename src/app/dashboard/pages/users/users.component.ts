import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
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
          console.log('Recibimos el valor: ', v);
        } else {
          console.log('Se cancelo el proceso');
        }
      },
    });
  }
}
