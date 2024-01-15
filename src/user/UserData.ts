import { IUserData, User } from '../sharedTypes';

export class UserData implements IUserData{
    
    public usersArray: User[] = [];

    public get users(): User[] {
        return this.usersArray;
    }

    public async addUser(user: User): Promise<void> {
        this.usersArray.push(user);
    }

    public getUserByEmail(email: string): User | undefined {
        const currentUser: User | undefined = this.usersArray.find(usersArray => usersArray.email == email);
        return currentUser;
    }
}