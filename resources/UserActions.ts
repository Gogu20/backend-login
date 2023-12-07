import { UserData } from './UserData';
const bcrypt = require('bcrypt');

export class UserActions extends UserData {
    private _PASSWORD_HASH_SALT = 10;
    
    //just in case we need the salt value somewhere else in the future
    public get salt() {
        return this._PASSWORD_HASH_SALT;
    }

    public findUserByEmail(email: string) {
        const currentUser = this.users.find(users => users.email == email);
        return currentUser;
    }

    public async hashPassword(password: string) {
        try {
            password = await bcrypt.hash(password, this.salt);
            return password;
        } catch (err) {
            console.log(err);
        }
    }

    public register(email: string, password: any) {
        this.email = email;
        this.password = password;
        this.users.push({email: this.email, password: this.password})
    }

    public async login (email: string, password: string) {
        try {
            if (await bcrypt.compare(password, this.findUserByEmail(email)?.password)) {
                return true;
            }
            return false;
        } catch (err) {
            console.log(err)
        }
    }
}