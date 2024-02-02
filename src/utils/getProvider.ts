import toBoolean from "to-boolean";
import { DatabaseUserProvider } from "../user/dataProviders/DatabaseUserProvider";
import { LocalUserProvider } from "../user/dataProviders/LocalUserProvider";


export function getUserDataProvider(): DatabaseUserProvider | LocalUserProvider {
    const useDatabase = toBoolean(process.env.USE_DATABASE as string);
    if (useDatabase) {
        return new DatabaseUserProvider;
    }
    return new LocalUserProvider;
}