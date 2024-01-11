import { IUserActions, IUserData, User } from './sharedTypes'
import { HashingUtils } from './HashingUtils';
import { TransporterConfig } from './TransporterConfig';
import { UserEmailConfirmation } from './UserEmailConfirmation';

export class UserActions implements IUserActions{

    private userDataProvider: IUserData;
    constructor(userDataProvider: IUserData){
        this.userDataProvider = userDataProvider;
    }

    private hashingUtils = new HashingUtils;
    private transporterConfig = new TransporterConfig;
    private userConfirmation = new UserEmailConfirmation(this.transporterConfig.transporter);   

    public async register(user: User): Promise<void> {
        user.password = await this.hashingUtils.generateHash(user.password);
        this.userDataProvider.addUser(user);
        this.userConfirmation.sendRegistrationEmail(user.email);
    }

    public async login (user: User, password: string): Promise<boolean> {
        return await this.hashingUtils.compareDataWithHash(password, user.password)
    }
}