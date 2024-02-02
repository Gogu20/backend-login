import dotenv from 'dotenv'; 
dotenv.config();

import { HashingUtils } from '../utils/HashingUtils';
import { TransporterConfig } from '../config/TransporterConfig';
import { UserEmailConfirmation } from './UserEmailConfirmation';
import { IUserActions, UserDataProvider, IUser } from '../sharedTypes'

export class UserActions implements IUserActions{

    private userDataProvider: UserDataProvider;
    constructor(userDataProvider: UserDataProvider){
        this.userDataProvider = userDataProvider;
    }
    
    private hashingUtils = new HashingUtils;
    private transporterInstance = new TransporterConfig;
    private userConfirmation = new UserEmailConfirmation(this.transporterInstance.transporter);   

    public async register(userInput: IUser): Promise<void> {
        const hashedPassword: string = await this.hashingUtils.generateHash(userInput.password);
        const user: IUser = { email: userInput.email, password: hashedPassword };

        await this.userDataProvider.addUser(user)
            .then(() => {
                console.log("User saved to local storage");
            })
            .catch((error: Error) => {
                console.log("Unable to save user.");
                console.error(error);
            })

        this.userConfirmation.sendRegistrationEmail(user.email);
    }

    public async login (user: IUser, password: string): Promise<boolean> {
        return await this.hashingUtils.compareDataWithHash(password, user.password);
    }
}