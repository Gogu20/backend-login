import { UserDataProvider, IUser } from '../../sharedTypes';

export class LocalUserProvider implements UserDataProvider{

    public users: IUser[] = [];

    public async addUser(user: IUser): Promise<void> {
        this.users.push(user)
    }

    public async getUsers(): Promise<IUser[]> {
        return this.users;
    }

    public async getUserByEmail(email: string): Promise<IUser | null> {
        const currentUser: IUser | undefined = this.users.find(users => users.email == email);
        return currentUser as IUser | null;
    }
}