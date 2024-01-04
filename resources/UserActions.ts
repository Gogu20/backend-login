import { User } from './interfaces'
import { UserData } from './UserData';
const bcrypt = require('bcrypt');

export class UserActions extends UserData {
    
    public async register(user: User) {
        user.password = await this.hashPassword(user.password);
        this.addUser(user);
    }

    public async login (user: User, password: string) {
        return await bcrypt.compare(password, user.password)
    }
}