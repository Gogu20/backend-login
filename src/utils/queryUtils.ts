import { Repository } from "typeorm";
import { AppDataSource } from "../database/dbConfig";
import { User } from "../database/entities/User";
import { IUser } from "../sharedTypes";

export function getUserRepository(): Repository<User> {
    return AppDataSource.getRepository(User);;
}

export async function getUserByEmailDatabase(email: string): Promise<IUser | null> {
    const userRepository: Repository<User> = getUserRepository();
    return userRepository.findOne({
        where: { email }
    });
}

export async function getAllUsers(): Promise<IUser[] | null> {
    const userRepository: Repository<User> = getUserRepository();
    return userRepository.find();
}