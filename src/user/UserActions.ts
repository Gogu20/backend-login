import { User } from '../database/entities/User'
import { IUserActions, IUserData, IUser, UserInput } from '../sharedTypes'
import { HashingUtils } from '../utils/HashingUtils';
import { TransporterConfig } from '../config/TransporterConfig';
import { UserEmailConfirmation } from './UserEmailConfirmation';

export class UserActions implements IUserActions{

    private hashingUtils = new HashingUtils;
    private transporterInstance = new TransporterConfig;
    private userConfirmation = new UserEmailConfirmation(this.transporterInstance.transporter);   

    public async register(user: UserInput): Promise<void> {
        user.password = await this.hashingUtils.generateHash(user.password);
        const userData = User.create({
            email: user.email,
            password: user.password
        });
        await userData.save()
            .then(() => {
                console.log("User created successfully: ");
            })
            .catch((error) => {
                console.log("Unable to create user.");
                console.error(error);
            })
        this.userConfirmation.sendRegistrationEmail(user.email);
    }

    public async login (user: IUser, password: string): Promise<boolean> {
        return await this.hashingUtils.compareDataWithHash(password, user.password)
    }
}