import { User } from './interfaces'
import { UserData } from "./UserData";

export class UserValidation {

    private userData: UserData;

    constructor(userData: UserData) {
        this.userData = userData;
    }

    private isEmptyField(email: string, password: string): boolean {
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

    public registerValidation(email: string, password: string) {
        if (this.isEmptyField(email, password)) {
            return "Empty field.";
        }
        if (this.isInvalidEmail(email)) {
            return "Invalid email."
        }
        const emailAlreadyExists = this.userData.getUserByEmail(email) != undefined;
        if (emailAlreadyExists) {
            return "Email already in use.";
        }
        return "";
    }

    public loginValidation(email: string, password: string) {
        const currentUser: User | undefined = this.userData.getUserByEmail(email);
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