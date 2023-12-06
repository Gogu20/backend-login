import { findUserByEmail } from "./findUserByEmail";
const bcrypt = require('bcrypt');

export async function login (email: string, password: string) {
    try {
        if (await bcrypt.compare(password, findUserByEmail(email)?.password)) {
            return true;
        }
        return false;
    } catch (err) {
        console.log(err)
    }
}