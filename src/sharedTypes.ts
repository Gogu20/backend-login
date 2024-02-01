
export interface IUser {
    email: string,
    password: string
}

export interface IUserData {
    users: IUser[];
    addUserToArray(user: IUser): Promise<void>;
}

export interface IUserActions {
    register(user: IUser): Promise<void>;
    login(user: IUser, password: string): Promise<boolean>;
}

export interface IUserValidation {
    registerValidation(userInput: IUser): ValidationResult;
    loginValidation(userInput: IUser): ValidationResult;
}

export interface ValidationResult {
    success: boolean;
    errors?: string[];
}