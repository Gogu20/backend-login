import { UserActions } from "./UserActions";

export class UserValidation extends UserActions{
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

    public registerValidation(email: string, password: string) {
        let error: string = "";
        if (this.isEmptyField(email, password)) {
            error = "Empty field.";
            return error;
        }
        if (this.isInvalidEmail(email)) {
            error = "Invalid email.";
            return error;
        }
        const emailAlreadyExists = this.findUserByEmail(email) != undefined;
        if (emailAlreadyExists) {
            error = "Email already in use.";
            return error;
        }
        return error;
    }

    public loginValidation(email: string, password: string) {
        let error: string = "";
        if (this.isEmptyField(email, password)) {
            error = "Empty field.";
            return error;
        }
        const emailAlreadyExists = this.findUserByEmail(email) == undefined;
        if (emailAlreadyExists) {
            error = "User does not exist.";
            return error;
        }
        return error;
    }
}