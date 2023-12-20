import { User } from './interfaces'

export class UserData { 
    private usersArray: User[] = [];

    public get users(): User[] {
        return this.usersArray;
    }
    public addUser(user: User) {
        this.usersArray.push(user);
    }
}