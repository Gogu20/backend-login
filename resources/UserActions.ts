import { User } from './sharedTypes'
import { UserData } from './UserData';
import { HashingUtils } from './HashingUtils';
import { TransporterConfig } from './TransporterConfig';
import { UserEmailConfirmation } from './UserEmailConfirmation';

export class UserActions {

    private hashingUtils = new HashingUtils;
    private transporterConfig = new TransporterConfig;
    private userConfirmation = new UserEmailConfirmation(this.transporterConfig.transporter);

    private userData: UserData;

    constructor(userData: UserData) {
        this.userData = userData;
    }

    public async register(user: User): Promise<void> {
        user.password = await this.hashingUtils.generateHash(user.password);
        this.userData.addUser(user);
        this.userConfirmation.sendRegistrationEmail(user.email);
    }

    public async login (user: User, password: string): Promise<boolean> {
        return await this.hashingUtils.compareDataWithHash(password, user.password)
    }
}