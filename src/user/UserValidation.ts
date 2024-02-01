import { IUser, IUserValidation, ValidationResult } from '../sharedTypes'
import { capitalizeFirstLetter, processArrayIntoString} from '../utils/formattingUtils'

export class UserValidation implements IUserValidation {

    private getEmptyFields(fields: IUser): (keyof IUser)[] {
        const emptyFields: (keyof IUser)[] = [];
        for (const key in fields) {
            const isEmpty: boolean = !fields[key as keyof IUser].trim();
            if (isEmpty) {
                emptyFields.push(key as keyof IUser);
            }
        }
        return emptyFields;
    }
    
    private thereAreEmptyFields(userInput: IUser): boolean {
        const emptyFields: string[] = this.getEmptyFields(userInput);
        const thereAreEmptyFields: boolean = emptyFields.length > 0;
        if (thereAreEmptyFields) {
            return true;
        }
        return false;
    }

    private allFieldsAreEmpty(userInput: IUser): boolean {
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

    public registerValidation(userInput: IUser): ValidationResult {
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
            errors.push("Invalid email.");
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

    public loginValidation(userInput: IUser): ValidationResult {
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