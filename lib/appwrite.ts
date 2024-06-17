import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.ankittechie.aora',
    projectId: '666d5fe40024f50e9fc9',
    databaseId: '666d6217002739596eaf',
    userCollectionId: '666d6255003370492cc3',
    videosCollectionId: '666d627400349d07fe07',
    storageId: '666d63fb0005760b804f',
}

const { endpoint, projectId, platform, databaseId, userCollectionId, videosCollectionId, storageId } = appwriteConfig;

const client = new Client();
client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setPlatform(platform)
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
            databaseId,
            userCollectionId,
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
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message || 'An error occurred while signing in')
    }
}

export const getCurrentUser = async () => {
    try {
        const currAccount = await account.get();
        if (!currAccount) throw new Error();
        const currUser = await db.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('accountId', currAccount.$id)]
        )

        if (!currUser) throw Error();
        return currUser.documents[0];
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

export const getAllPost = async () => {
    try {
        const posts = await db.listDocuments(
            databaseId,
            videosCollectionId
        )
        if (!posts) throw new Error();
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await db.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.orderDesc('$createdAt'), Query.limit(7)]
        )
        if (!posts) throw new Error();
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

export const searchPost = async (query: string) => {
    try {
        const posts = await db.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.search('title', query)]
        )
        if (!posts) throw new Error("No Videos Found");
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

export const getUserPosts = async (userId: string) => {
    try {
        const posts = await db.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.equal('users', userId)]
        )
        if (!posts) throw new Error("No Videos Found");
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}