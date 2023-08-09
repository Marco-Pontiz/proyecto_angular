import { Injectable} from '@angular/core'
import { LoginPayload } from './models';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { User } from '../dashboard/pages/users/models';
import { NotifierService } from '../core/services/notifier.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root'})

export class AuthService {
    private _authService$ = new BehaviorSubject<User | null>(null);
    public authUser$ = this._authService$.asObservable(); 

    constructor(private notifier: NotifierService, private router: Router) {}

    isAuthenticated(): Observable<boolean> {
        return this.authUser$.pipe(
            take(1),
            map((user) => !!user),
        );
    }

    login(payload: LoginPayload): void {
        const MOCK_USER: User = {
            id: 50,
            name: 'MockName',
            surname: 'MockSurname',
            email: 'fake@gmail.com',
            password: '123456789',
        }
    
    if(payload.email === MOCK_USER.email && payload.password === MOCK_USER.password){
            //Login es valido
        this._authService$.next(MOCK_USER);
        this.router.navigate(['/dashboard']);
    } else {
        this.notifier.showError('Datos invalidos');
        this._authService$.next(null);
    }

    }

}