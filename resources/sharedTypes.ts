export interface User {
    id: number;
    email: string;
    password: string;
}
export type UserInput = Omit<User, 'id'>;

export interface ValidationResult {
    success: boolean;
    errors?: string[];
}