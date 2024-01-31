import dotenv from 'dotenv'; dotenv.config();
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/User';

export const AppDataSource = new DataSource ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User],
    synchronize: true
})

export const userRepository: Repository<User> = AppDataSource.getRepository(User);

