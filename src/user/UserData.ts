import { IUserData, IUser } from '../sharedTypes';

export class UserData implements IUserData{

    public usersArray: IUser[] = [];

    public get users(): IUser[] {
        return this.usersArray;
    }

    public async addUserToArray(user: IUser): Promise<void> {
        this.usersArray.push(user);
    }

    public getUserByEmailLocal(email: string): IUser | undefined {
        const currentUser: IUser | undefined = this.usersArray.find(usersArray => usersArray.email == email);
        return currentUser;
    }
}