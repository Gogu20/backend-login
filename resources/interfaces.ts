export interface User {
    id: number;
    email: string;
    password: string;
}

export interface UserInput {
    [key: string]: string;
}