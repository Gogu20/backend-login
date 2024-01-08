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

    private isInvalidPassword(password: string): boolean {
        const expression: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return !expression.test(password);
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
        if (this.isInvalidPassword(password)) {
            return "Password must contain at least 8 characters and at least one letter and one number.";
        }
        const emailAlreadyExists: boolean = this.isExistingUser(email);
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