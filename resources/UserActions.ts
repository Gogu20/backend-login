import { User } from './interfaces'
import { UserData } from './UserData';
const bcrypt = require('bcrypt');

export class UserActions extends UserData {
    private PASSWORD_HASH_SALT = 10;
    
    //just in case we need the salt value somewhere else in the future
    public get salt() {
        return this.PASSWORD_HASH_SALT;
    }

    public async hashPassword(password: string): Promise<string> {
        password = await bcrypt.hash(password, this.salt);
        return password;
    }

    public register(user: User) {
        this.users.push(user)
    }

    public async login (user: User, password: string) {
        return await bcrypt.compare(password, user.password)
    }
}