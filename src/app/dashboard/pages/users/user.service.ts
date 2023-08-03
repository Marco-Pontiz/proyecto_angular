import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './models';
import { BehaviorSubject, Observable, Subject, delay, map, of, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';

const USER_DB: Observable<User[]> = of(
[
  {
    id: 1,
    name: 'Walter',
    surname: 'White',
    email: 'Heisenberg@mail.com',
    password: '123456789'
  },
  {
    id: 2,
    name: 'Leo',
    surname: 'Messi',
    email: "leomessi@gmail.com",
    password: '18/12/22'
  },
]).pipe(delay(1000));

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private sendNotification$ = new Subject<string>();
  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  constructor(private notifier: NotifierService) {

    this.sendNotification$.subscribe({
      next: (message) => alert(message)
    });
  }

  sendNotification(notification: string): void {
    this.sendNotification$.next(notification);
  }

  loadUsers(): void {
    USER_DB.subscribe({
      next: (usuariosFromDb) => this._users$.next(usuariosFromDb),
    });
  }

  getUsersByiD(id: number) {
    return this.users$.pipe(
      take(1),
      map(( users ) => users.find((u) => u.id === id)),
    )
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  createUser(user: CreateUserData): void {
    this.users$.pipe(take(1)).subscribe({     
        next: (arrayActual) => {
          this._users$.next([...arrayActual, {...user, id: arrayActual.length + 1},
        ]);
        this.notifier.showSuccess('Alumno creado!')
      }
    })
  }
  
  updateUserById(id: number, usuarioActualizado: UpdateUserData): void {
    this.users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next(
          arrayActual.map((u) => 
            u.id === id ? {...u, ...usuarioActualizado} : u
          )
        );
        this.notifier.showSuccess('Alumno Actualizado')
      },
    });
  }

    deleteUserById(id: number): void {
      this._users$.pipe(take(1)).subscribe({
        next: (arrayActual) => {
          this._users$.next(arrayActual.filter((u) => u.id !== id));
          this.notifier.showSuccess('Alumno eliminado');
        },
    });
  }
}