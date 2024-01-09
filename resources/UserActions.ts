import { User } from './interfaces'
import { UserData } from './UserData';
import { HashingUtilities } from './HashingUtilities';
import { TransporterConfig } from './TransporterConfig';
import { UserEmailConfirmation } from './UserEmailConfirmation';

export class UserActions {

    private hashingUtils = new HashingUtilities;
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