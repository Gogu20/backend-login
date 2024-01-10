import { capitalizeFirstLetter, processArrayIntoString } from './generalUtils';
import { IUserValidation, UserInput, ValidationResult } from './sharedTypes'

export class UserValidation implements IUserValidation {

    private getEmptyFields(fields: UserInput): (keyof UserInput)[] {
        const emptyFields: (keyof UserInput)[] = [];
        for (const key in fields) {
            const isEmpty = !fields[key as keyof UserInput].trim();
            if (isEmpty) {
                emptyFields.push(key as keyof UserInput);
            }
        }
        return emptyFields;
    }
    
    private thereAreEmptyFields(userInput: UserInput): boolean {
        const emptyFields: string[] = this.getEmptyFields(userInput);
        const thereAreEmptyFields: boolean = emptyFields.length > 0;
        if (thereAreEmptyFields) {
            return true;
        }
        return false;
    }

    private allFieldsAreEmpty(userInput: UserInput): boolean {
        const emptyFields: string[] = this.getEmptyFields(userInput);
        const allFieldsAreEmpty: boolean = emptyFields.length === 2;
        if (allFieldsAreEmpty) {
            return true;
        }
        return false;
    }

    private isInvalidEmail(email: string): boolean {
        const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i; 
        return !emailRegex.test(email);
    }

    private isInvalidPassword(password: string): boolean {
        const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return !passwordRegex.test(password);
    }

    public registerValidation(userInput: UserInput): ValidationResult {
        const errors: string[] = []

        const emptyFields: string[] = this.getEmptyFields(userInput);
        
        if (this.thereAreEmptyFields(userInput)) {
            const emptyFieldsString: string = capitalizeFirstLetter(processArrayIntoString(emptyFields))
            errors.push(`${emptyFieldsString} field/s cannot be empty.`);
        }
        
        if(this.allFieldsAreEmpty(userInput)) {
            return {
                success: false,
                errors: errors
            };
        }

        const emailFieldNotEmpty: boolean = !emptyFields.includes("email");
        if (emailFieldNotEmpty && this.isInvalidEmail(userInput.email)) {
            errors.push ("Invalid email.");
        }

        const passwordFieldNotEmpty: boolean = !emptyFields.includes("password");
        if (passwordFieldNotEmpty && this.isInvalidPassword(userInput.password)) {
            errors.push("Password must contain at least 8 characters and at least one letter and one number.");
        }
        if (errors.length > 0) {
            return {
                success: false,
                errors: errors
            };
        }
        return { success: true };
    }

    public loginValidation(userInput: UserInput): ValidationResult {
        const errors: string[] = []
        
        if (this.thereAreEmptyFields(userInput)) {
            const emptyFields: string = capitalizeFirstLetter(processArrayIntoString(this.getEmptyFields(userInput)));
            errors.push(`${emptyFields} field/s cannot be empty.`);
        }

        if (errors.length > 0) {
            return {
                success: false,
                errors: errors
            };
        }
        return { success: true };
    }
}