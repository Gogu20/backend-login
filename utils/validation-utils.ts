import { findUserByEmail } from "./findUserByEmail";

function isEmptyField(email: string, password: string): boolean{
    if (email == "" || password == "") {
        return true;
    }
    return false;
}

function isInvalidEmail(email: string): boolean {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i; 
    if (!expression.test(email)) {
        return true;
    }
    return false;
}

function registerValidation(email: string, password: string) {
    let error: string = "";
    if (isEmptyField(email, password)) {
        error = "Empty field.";
        return error;
    }
    if (isInvalidEmail(email)) {
        error = "Invalid email.";
        return error;
    }
    const emailAlreadyExists = findUserByEmail(email) != null;
    if (emailAlreadyExists) {
        error = "Email already in use.";
        return error;
    }
    return error;
}

function loginValidation(email: string, password: string) {
    let error: string = "";
    if (isEmptyField(email, password)) {
        error = "Empty field.";
        return error;
    }
    const userDoesNotExist = findUserByEmail(email) == null;
    if (userDoesNotExist) {
        error = "User with that email does not exist.";
        return error;
    }
    return error;
}

export {
    isEmptyField, 
    isInvalidEmail, 
    registerValidation, 
    loginValidation
};