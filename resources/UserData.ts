import { User } from './interfaces';
const bcrypt = require('bcrypt');

export class UserData {
    
    public usersArray: User[] = [];
    private PASSWORD_HASH_SALT: number = 10;

    public get users(): User[] {
        return this.usersArray;
    }

    public get salt(): number {
        return this.PASSWORD_HASH_SALT;
    }

    public addUser(user: User): void {
        this.usersArray.push(user);
    }

    public async hashPassword(password: string): Promise<string> {
        password = await bcrypt.hash(password, this.salt);
        return password;
    }

    public getUserByEmail(email: string): User {
        const currentUser: User | undefined = this.usersArray.find(usersArray => usersArray.email == email);
        if (currentUser == undefined) {
            return {email: "", password: ""};
        }
        const user: User = currentUser
        return user;
    }
}