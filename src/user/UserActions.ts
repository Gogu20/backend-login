import dotenv from 'dotenv'; 
dotenv.config();

import toBoolean from 'to-boolean';
import { IUserActions, IUserData, IUser } from '../sharedTypes'
import { HashingUtils } from '../utils/HashingUtils';
import { TransporterConfig } from '../config/TransporterConfig';
import { UserEmailConfirmation } from './UserEmailConfirmation';
import { userRepository } from '../database/dbConfig';

export class UserActions implements IUserActions{
    private useDatabase: boolean = toBoolean(process.env.USE_DATABASE || 'true');

    private userDataProvider: IUserData;
    constructor(userDataProvider: IUserData){
        this.userDataProvider = userDataProvider;
    }
    
    private hashingUtils = new HashingUtils;
    private transporterInstance = new TransporterConfig;
    private userConfirmation = new UserEmailConfirmation(this.transporterInstance.transporter);   

    public async register(userInput: IUser): Promise<void> {
        const hashedPassword = await this.hashingUtils.generateHash(userInput.password);
        const user: IUser = { email: userInput.email, password: hashedPassword };
        
        if (this.useDatabase) {
            const userData = userRepository.create(user);
            await userData.save()
                .then(() => {
                    console.log("User saved to database.");
                })
                .catch((error) => {
                    console.log("Unable to save user.");
                    console.error(error);
                })
        } else {
            await this.userDataProvider.addUserToArray(user)
                .then(() => {
                    console.log("User saved to local storage");
                })
                .catch((error) => {
                    console.log("Unable to save user.");
                    console.error(error);
                })
        }
        this.userConfirmation.sendRegistrationEmail(user.email);
    }

    public async login (user: IUser, password: string): Promise<boolean> {
        return await this.hashingUtils.compareDataWithHash(password, user.password)
    }
}