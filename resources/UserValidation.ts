import { User } from './interfaces'
import { UserData } from "./UserData";

export class UserValidation {

    private userData: UserData;

    constructor(userData: UserData) {
        this.userData = userData;
    }

    private isEmptyField(email: string, password: string): boolean {
        return email == "" || password == "";
    }
    
    private isInvalidEmail(email: string): boolean {
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i; 
        return !expression.test(email);
    }

    private isExistingUser(email: string): boolean {
        const currentUser: User = this.userData.getUserByEmail(email);
        return currentUser.email !== "" && currentUser.password !== "";
    }

    public registerValidation(email: string, password: string): string {
        if (this.isEmptyField(email, password)) {
            return "Empty field.";
        }
        if (this.isInvalidEmail(email)) {
            return "Invalid email.";
        }
        const emailAlreadyExists: boolean = this.isExistingUser(email) as boolean; //is this what you mean by response types?
        if (emailAlreadyExists) {
            return "Email already in use.";
        }
        return "";
    }

    public loginValidation(email: string, password: string): string {
        if (this.isEmptyField(email, password)) {
            return "Empty field.";
        }
        const userDoesNotExist: boolean = !this.isExistingUser(email);
        if (userDoesNotExist) {
            return "User does not exist.";
        }
        return "";
    }
}