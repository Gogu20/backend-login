import { UserInput } from './interfaces'

export class UserValidation {

    private getFirstEmptyField(fields: UserInput): string | undefined {
        for (const key in fields) {
            const isEmpty = !fields[key].trim();
            if (isEmpty) {
                return key;
            }
        }
        return undefined;
    }
    
    private isInvalidEmail(email: string): boolean {
        const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i; 
        return !emailRegex.test(email);
    }

    private isInvalidPassword(password: string): boolean {
        const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return !passwordRegex.test(password);
    }

    public registerValidation(userInput: UserInput): string {
        const emptyField = this.getFirstEmptyField(userInput);
        if (emptyField) {
            return `${emptyField} field empty.`;
        }
        if (this.isInvalidEmail(userInput.email)) {
            return "Invalid email.";
        }
        if (this.isInvalidPassword(userInput.password)) {
            return "Password must contain at least 8 characters and at least one letter and one number.";
        }
        return "";
    }

    public loginValidation(userInput: UserInput): string {
        const emptyField = this.getFirstEmptyField(userInput);
        if (emptyField) {
            return `${emptyField} field empty.`;
        }
        return "";
    }
}