import { Injectable } from '@angular/core';
import { User } from './models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
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
    }
  ];
  constructor() { }
  getUsers(): User[] {
    return this.users;
  }
}
