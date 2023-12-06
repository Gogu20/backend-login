import { users } from '../utils/users'

export function findUserByEmail(email: string) {
    const user = users.find(user => user.email == email);
    return user;
}