import { User } from "../sharedTypes";


export class TypeUtils {
    
    public isUser(value: unknown): value is User {
        if (typeof value !== 'object' || !value) {
            return false;
        }

        const obj = value as User;
        return 'email' in obj && 'password' in obj;
    }
}