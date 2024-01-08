import { User } from './interfaces'
import { UserData } from './UserData';
const bcrypt = require('bcrypt');

export class UserActions {
    
    private userData: UserData;

    constructor(userData: UserData) {
        this.userData = userData;
    }

    public async register(user: User) {
        user.password = await this.userData.hashPassword(user.password);
        this.userData.addUser(user);
    }

    public async login (user: User, password: string) {
        return await bcrypt.compare(password, user.password)
    }
}