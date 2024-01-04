import { User } from './interfaces';
const bcrypt = require('bcrypt');

export class UserData {
    
    public usersArray: User[] = [];
    private PASSWORD_HASH_SALT = 10;

    public get users(): User[] {
        return this.usersArray;
    }

    public get salt() {
        return this.PASSWORD_HASH_SALT;
    }

    public addUser(user: User): void {
        this.usersArray.push(user);
    }

    public async hashPassword(password: string): Promise<string> {
        password = await bcrypt.hash(password, this.salt);
        return password;
    }

    public getUserByEmail(email: string) {
        const currentUser = this.usersArray.find(usersArray => usersArray.email == email);
        return currentUser;
    }
}