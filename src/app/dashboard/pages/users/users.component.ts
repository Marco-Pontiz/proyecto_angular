import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';
import { UserService } from './user.service';
import { Observable, Subject, Subscription, map, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';

 // const ELEMENT_DATA: User[] = ;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnDestroy {

  public users: User[] = [];
  public today = new Date();
  public semaforoSubscription?: Subscription;
  public allSubs: Subscription[] = [];
  public destroyed = new Subject<boolean>();

  constructor(

    private matDialog: MatDialog, 
    private userService: UserService,

    @Inject('IS_DEV') private isDev: boolean,
  ) { 
    this.users = this.userService.getUsers();
    console.log(this.isDev);

        // Repaso Asincronia
        //------------------
        
    const meDevuelveElDinero = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
        //reject('Dinero no devuelto');
      }, 3000);
    });
    


    const semaforo = new Observable<string>((subscriber) => {
      let color = 'rojo'
      setInterval(() => {
        color === 'rojo' ? subscriber.next('azul') : subscriber.next('rojo');
      if(color === 'rojo') {
          subscriber.next('azul');
          color = 'azul';
        } else {
          subscriber.next('rojo');
          color = 'rojo'
      //  subscriber.complete()
        } 
      },  1000);
    });

    // -----------------------------
    // PIPE viene del ingles tuberia 
    //  ---------------------------- 
      semaforo.pipe(
        takeUntil(this.destroyed),
        map((color) => color.toUpperCase())
        ).subscribe({
          // Cuando el observable emite
        next: (color) => {console.log(color)},
          // Cuando el observable emite el error
        error: () => {},
          // Cuando el observable se completa
        complete: () => {
          console.log('Se completo!');
        },
      }) 

    meDevuelveElDinero
      //Cuando la promesa se cumple
//  .then((value) => console.log(value))
      //Cuando falla..
    .catch((error) => alert(error))
      //Cuando finaliza todo el proceso, se haya hecho o no
    .finally(() => {});

      /*
      console.log('First')
      fetch('https://reqres.in/api/users?page=2')
        .then((respuestaDelServidor) => respuestaDelServidor.json())
        .then((data) => console.log('Middle'))
      console.log('Last')
      */
  }
  
  
  ngOnDestroy(): void {
    console.log('Se Destruyo!');
      // this.semaforoSubscription?.unsubscribe();
      // this.allSubs.forEach((s) => s.unsubscribe());

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
              /*this.users.push()
          this.users = [
            ...this.users,{
            id: this.users.length + 1,
            name: v.name,
            surname: v.surname,
            email: v.email,
            password: v.password
            },
          ]; */

          this.userService.createUser({
            id: this.users.length + 1,
            name: v.name,
            surname: v.surname,
            email: v.email,
            password: v.password
          })
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
