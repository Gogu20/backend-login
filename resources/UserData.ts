import { User } from './interfaces';

export class UserData {
    
    public usersArray: User[] = [];

    public get users(): User[] {
        return this.usersArray;
    }

    public addUser(user: User): void {
        this.usersArray.push(user);
    }

    public getUserByEmail(email: string): User | undefined {
        const currentUser: User | undefined = this.usersArray.find(usersArray => usersArray.email == email);
        return currentUser;
    }
}