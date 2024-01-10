import { User } from "./sharedTypes";

export function isUser(value: unknown): value is User {
    if (typeof value !== 'object' || !value) {
        return false;
    }

    const obj = value as User;
    return 'email' in obj && 'password' in obj;
}

export function isString(value: unknown): value is string {
    return typeof value === 'string';
}