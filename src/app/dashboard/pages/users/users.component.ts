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

    this.users = this.userService.getUsers().pipe(
        // Primero esto
      tap((valorOriginal) => console.log('VALOR ANTES DEL MAP', valorOriginal)),
        // Luego esto
      map((valorOriginal) => 
        valorOriginal.map((usuario) => ({
          ...usuario,
          name:usuario.name.toUpperCase(),
          surname: usuario.surname.toUpperCase()
        }))
      ),
      // Por ultimo esto
      tap((valorMapeado) => console.log('VALOR DESPUÉS DEL MAP', valorMapeado)),
    );

    /* Operador MAP, FILTER
    of(1,2,3,4,5)
      .pipe(
        map((v) => v * 2),
          //2, 4
        filter((valorMapeado) => valorMapeado < 6)
      )
      .subscribe({
        next: (v) => {
          console.log(v);
        }
      }) */

      const obs1$ = of(['Stefano', 'Juan', 'Luca']).pipe(delay(1000));
      const obs2$ = of([1, 2, 3, 4, 5]).pipe(delay(1500), map((r) => r.map((n) => n * 2)));

      this.loading = true;
/*
      obs1$.subscribe({
          //Despues de 1000ms 
        next: (v) => (this.nombres = v),
        complete: () => (this.loading = false),
      });

      obs2$.subscribe({
          //Despues de 1500ms
        next: (v) => (this.numeros = v),
        complete: () => (this.loading = false),
      }); */

      forkJoin([
        obs1$,
        obs2$
      ]).subscribe({
        next: ([nombres, numeros]) => {
          //console.log(result);
          this.nombres = nombres;
          this.numeros = numeros;
        },
        complete: () => (this.loading = false),
      });

      // Primero cargo los usuarios 
      this.userService.loadUsers();
      // Luego los obtengo
/*      this.userService.getUsers().subscribe({
          //then
        next: (users) => {
          // console.log(v);
          this.users = users;
          //this.userService.sendNotification('Se añadieron más alumnos');
        }
      }); */
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

/*  
      semaforo
      .pipe(
          //Escucha emisiones hasta que this.destroyed
          //takeUntil(this.destroyed),
          map((color) => color.toUpperCase())
        )
        .subscribe({
          // Cuando el observable emite
          // then
        next: (color) => {console.log(color)},
          // Cuando el observable emite el error
          // Catch
        error: () => {},
          // Cuando el observable se completa
          // Finally
        complete: () => {
          console.log('Se completo!');
        },
      }) */
  
  /*
    meDevuelveElDinero
      //Cuando la promesa se cumple
    .then((value) => console.log(value))
      //Cuando falla..
    .catch((error) => alert(error))
      //Cuando finaliza todo el proceso, se haya hecho o no
    .finally(() => {});
  */

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
      //this.semaforoSubscription?.unsubscribe();
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

          this.notifier.showSuccess('Se cargaron los alumnos de forma correcta')

          this.userService.createUser({
            id: new Date().getTime(),
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
