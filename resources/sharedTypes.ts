export interface User {
    id: number;
    email: string;
    password: string;
}
export type UserInput = Omit<User, 'id'>;

export interface IUserData {
    users: User[];
    addUser(user: User): void;
    getUserByEmail(email: string): User | undefined;
}

export interface IUserActions {
    register(user: User): Promise<void>;
    login(user: User, password: string): Promise<boolean>;
}

export interface IUserValidation {
    registerValidation(userInput: UserInput): ValidationResult;
    loginValidation(userInput: UserInput): ValidationResult;
}

export interface ValidationResult {
    success: boolean;
    errors?: string[];
}