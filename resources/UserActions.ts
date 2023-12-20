import { User } from './interfaces'
import { UserData } from './UserData';
const bcrypt = require('bcrypt');

export class UserActions extends UserData {
    private PASSWORD_HASH_SALT = 10;
    
    public get salt() {
        return this.PASSWORD_HASH_SALT;
    }

    private async hashPassword(password: string): Promise<string> {
        password = await bcrypt.hash(password, this.salt);
        return password;
    }

    public async register(user: User) {
        user.password = await this.hashPassword(user.password);
        this.addUser(user);
    }

    public async login (user: User, password: string) {
        return await bcrypt.compare(password, user.password)
    }
}