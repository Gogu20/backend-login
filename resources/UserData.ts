import { User } from './interfaces'

export class UserData { 
    public currentUser: User = { email: "", password: "" };    
    public users: User[] = [];
    
    //Getters
    public get email() {
        return this.currentUser.email;
    }
    public get password() {
        return this.currentUser.password;
    }

    //Setters
    public set email(email: string) {
        this.currentUser.email = email;
    }
    public set password(password) {
        this.currentUser.password = password;
    }
}
