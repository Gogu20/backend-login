import { users } from './users';
const bcrypt = require('bcrypt');

const PASSWORD_HASH_SALT = 10;

export async function register(email: string, password: string) {
    try {
        users.push({
            email: email,
            password: await bcrypt.hash(password, PASSWORD_HASH_SALT)
        });
    } catch(err) {
        console.log(err);
    }
}