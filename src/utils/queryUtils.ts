import { userRepository } from "../database/dbConfig";
import { IUser } from "../sharedTypes";

export async function getUserByEmailDatabase(email: string): Promise<IUser | null> {
    return userRepository.findOne({
        where: { email }
    });
}

export async function getAllUsers(): Promise<IUser[] | null> {
    return userRepository.find();
}