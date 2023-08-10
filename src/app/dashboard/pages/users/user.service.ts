import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './models';
import { BehaviorSubject, Observable, Subject, delay, map, mergeMap, of, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private sendNotification$ = new Subject<string>();
  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();
  private _isLoading$ = new BehaviorSubject(false);
  
  public isLoading$ = this._isLoading$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient) {

    this.sendNotification$.subscribe({
      next: (message) => alert(message)
    });
  }

  sendNotification(notification: string): void {
    this.sendNotification$.next(notification);
  }

  loadUsers(): void {
/*  USER_DB.subscribe({
      next: (usuariosFromDb) => this._users$.next(usuariosFromDb),
    }); */

    this._isLoading$.next(true);
    this.httpClient.get<User[]>('http://localhost:3000/users').subscribe({
      next: (response) => {
        this._users$.next(response);
      },
      error: () => {
        this.notifier.showError('Error al cargar los alumnos');
      },
      complete: () => {
        this._isLoading$.next(false);
      },
    })

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

  createUser(payload: CreateUserData): void {
/*
    this.users$.pipe(take(1)).subscribe({     
        next: (arrayActual) => {
          this._users$.next([...arrayActual, {...user, id: arrayActual.length + 1},
        ]);
        this.notifier.showSuccess('Alumno creado!')
      }
    })
    */
  
/*  this.users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next([...arrayActual, userCreated])
      }
    }) */

    
    this.httpClient.post<User>('http://localhost:3000/users', payload)
      .pipe(
        mergeMap((userCreate) => this.users$.pipe(
          take(1), 
          map(
            (arrayActual) => [...arrayActual, userCreate])
          )
        )
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._users$.next(arrayActualizado);
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
/*    this._users$.pipe(take(1)).subscribe({
        next: (arrayActual) => {
          this._users$.next(arrayActual.filter((u) => u.id !== id));
          this.notifier.showSuccess('Alumno eliminado');
        },
    }); */

    this.httpClient.delete('http://localhost:3000/users/' + id)
      .pipe(
        mergeMap(
          (responseUserDelete) => this.users$.pipe(
            take(1), 
            map((arrayActual) => arrayActual.filter((u) => u.id !== id)))
        ) 
      ).subscribe({
        next: (arrayActualizado) => this._users$.next(arrayActualizado),
      })

    //this.users$.pipe(take(1))

    }
  }