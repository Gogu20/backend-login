import { User } from './interfaces'
import { UserData } from "./UserData";

export class UserValidation extends UserData{
    private isEmptyField(email: string, password: string): boolean{
        if (email == "" || password == "") {
            return true;
        }
        return false;
    }
    
    private isInvalidEmail(email: string): boolean {
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i; 
        if (!expression.test(email)) {
            return true;
        }
        return false;
    }

    private getUserByEmail(email: string) {
        const currentUser = this.users.find(users => users.email == email);
        return currentUser;
    }

    public registerValidation(email: string, password: string) {
        let currentUser: User | undefined = this.getUserByEmail(email);
        if (this.isEmptyField(email, password)) {
            return { error: "Empty field.", currentUser: currentUser };
        }
        if (this.isInvalidEmail(email)) {
            return { error: "Invalid email.", currentUser: currentUser };
        }
        const emailAlreadyExists = currentUser !== undefined;
        if (emailAlreadyExists) {
            return { error: "Email already in use.", currentUser: currentUser };
        }
        return { error: "", currentUser: currentUser };
    }

    public loginValidation(email: string, password: string) {
        let currentUser: User | undefined = this.getUserByEmail(email);
        if (this.isEmptyField(email, password)) {
            return { error: "Empty field.", currentUser: currentUser };
        }
        const userDoesNotExist = currentUser === undefined;
        if (userDoesNotExist) {
            return { error: "User does not exist.", currentUser: currentUser };

        }
        return { error: "", currentUser: currentUser };
    }
}