import { User } from "../models";

export class UserMockService {
    private users: User[] = [
        {
            id: 1,
            name: 'FAKE_NAME',
            surname: 'FAKE_SURNAME',
            email: 'FAKE_NAME@mail.com',
            password: '123456789'
        },
    ];

    getUsers(): User[] {
        return this.users;
    }
}