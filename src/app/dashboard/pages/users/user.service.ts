import { Injectable } from '@angular/core';
import { User } from './models';
import { BehaviorSubject, Observable, Subject, delay, of } from 'rxjs';

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
  private subjectUsers$ = new Subject<User[]>();
  private sendNotification$ = new Subject<string>();
  //private sendNotificationObservable$ = this.sendNotification$.asObservable();
  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  constructor() {
    //this.sendNotification$.next()
    //this.sendNotificationObservable$.subscribe({})

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

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  createUser(user: User): void {
    USER_DB.subscribe({
      next: (arrayActual) => {
        this._users$.next([...arrayActual, user]);
      }
    })
  }
  
/*
  deleteUserById(user: User): void {
    this.users = [
      ...this.users,
      user,
    ]
  }
  
  updateUserById(user: User): void {
    this.users = [
      ...this.users,
      user,
    ]
  }
  
  */

}
