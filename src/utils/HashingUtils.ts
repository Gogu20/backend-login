import bcrypt from 'bcrypt';
import dotenv from 'dotenv'; dotenv.config();


export class HashingUtils {

    private saltRounds: number = this.getSaltFromEnv();
    
    private getSaltFromEnv(): number {
        const saltFromEnv: string | undefined = process.env.HASH_SALT;
        if (saltFromEnv) {
            return parseInt(saltFromEnv);
        }
        console.error("Invalid or missing value for hash salt. Using default value.");
        return 10;
    }

    public async generateHash(data: string): Promise<string> {
        data = await bcrypt.hash(data, this.saltRounds);
        return data;
    }

    public async compareDataWithHash(unhashedData: string, hashedData: string): Promise<boolean> {
        return bcrypt.compare(unhashedData, hashedData);
    }
}