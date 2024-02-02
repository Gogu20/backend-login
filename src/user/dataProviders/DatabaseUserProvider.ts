import { Repository } from 'typeorm';
import { UserDataProvider, IUser } from '../../sharedTypes';
import { AppDataSource } from '../../config/databaseConfig';
import { User } from '../../entities/User';

export class DatabaseUserProvider implements UserDataProvider{
    
    private getUserRepository(): Repository<User> {
        return AppDataSource.getRepository(User);
    }
    
    public async addUser(user: IUser): Promise<void> {
        const userRepository: Repository<User> = this.getUserRepository();
        const userData: User = userRepository.create(user);
        await userData.save();
    }

    public async getUsers(): Promise<IUser[]> {
        const userRepository: Repository<User> = this.getUserRepository();
        return userRepository.find();
    }

    public async getUserByEmail(email: string): Promise<IUser | null> {
        const userRepository: Repository<User> = this.getUserRepository();
        return userRepository.findOne({
            where: { email }
        });
    }
}