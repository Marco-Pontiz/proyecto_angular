import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './models';
import { BehaviorSubject, Observable, Subject, map, mergeMap, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { generateRandomString } from 'src/app/shared/utils/helpers';
import { environment } from 'src/environments/environment';

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
    this._isLoading$.next(true);
    this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
      headers: new HttpHeaders({
        'token': '12345678910'
      }),
    }).subscribe({
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

    const token = generateRandomString(20);

    this.httpClient.post<User>(environment.baseApiUrl + '/users', {...payload, token})
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
    this.httpClient.put(environment.baseApiUrl + '/users/' + id, usuarioActualizado).subscribe({
      next: () => this.loadUsers(),
    })
  }

    deleteUserById(id: number): void {

    this.httpClient.delete(environment.baseApiUrl + '/users/' + id)
      .pipe(
      ).subscribe({
        next: (arrayActualizado) => this.loadUsers(),
        error: (err) => this.notifier.showError('Ocurrió un error'),
        complete: () => {}
      })
    }
  }