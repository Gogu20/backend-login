export interface IUser {
    email: string;
    password: string;
}
export type UserInput = Omit<IUser, 'id'>;

export interface IUserData {
    users: IUser[];
    addUser(user: IUser): void;
    getUserByEmail(email: string): IUser | undefined;
}

export interface IUserActions {
    register(user: IUser): Promise<void>;
    login(user: IUser, password: string): Promise<boolean>;
}

export interface IUserValidation {
    registerValidation(userInput: UserInput): ValidationResult;
    loginValidation(userInput: UserInput): ValidationResult;
}

export interface ValidationResult {
    success: boolean;
    errors?: string[];
}