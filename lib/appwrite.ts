import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.ankittechie.aora',
    projectId: '666d5fe40024f50e9fc9',
    databaseId: '666d6217002739596eaf',
    userCollectionId: '666d6255003370492cc3',
    videosCollectionId: '666d627400349d07fe07',
    storageId: '666d63fb0005760b804f',

}

const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)
    ;

const account = new Account(client);
const avatar = new Avatars(client);
const db = new Databases(client);

// Register User
export const createUser = async (email: string, password: string, username: string) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw new Error();
        const avatarUrl = avatar.getInitials(username);
        await signIn(email, password);

        const newUser = await db.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl,
            }
        )

        return newUser;


    } catch (error) {
        console.log(error);
        throw new Error();

    }
}

export const signIn = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        if (!session) throw new Error();
        return session;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}