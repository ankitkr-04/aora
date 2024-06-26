import { FormProps } from '@/app/(tabs)/create';
import { appwriteConfig } from '@/config';
import { Account, Avatars, Client, Databases, ID, ImageGravity, Query, Storage } from 'react-native-appwrite';


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
const storage = new Storage(client);

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
            videosCollectionId,
            [Query.orderDesc('$createdAt')]
        )
        if (!posts) return [];
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
        if (!posts) return [];
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
        if (!posts) return [];
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
        if (!posts) return [];
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

export const getLikedPost = async (userId: string) => {
    try {
        console.log(userId);

        const posts = await db.listDocuments(
            databaseId,
            videosCollectionId,
            // [Query.equal('likedBy', [userId])]

        )

        const likedPosts = posts.documents.filter(post => post.likedBy && post.likedBy.some((like: any) => like.$id === userId));
        if (likedPosts.length === 0) return [];
        return likedPosts;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message || 'An error occurred while fetching liked posts');
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

export const getFilePreview = async (fileId: string, type: string) => {
    let fileUrl;
    try {
        if (type === 'video') {
            fileUrl = storage.getFileView(storageId, fileId);
        }
        else if (type === 'image') {
            fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, ImageGravity.Top, 82);
        } else {
            throw new Error('Invalid file type');
        }
        if (!fileUrl) throw new Error('No File Available')
        return fileUrl;
    } catch (error: any) {
        throw new Error('Error', error.message || 'An error occurred while fetching file preview');
    }

}

export const uploadFile = async (file: any, type: any) => {
    if (!file) return '';

    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri,
    }

    console.log(asset);

    try {
        const uploadedFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset,
        );
        const fileUrl = await getFilePreview(uploadedFile.$id, type);

        // console.log(fileUrl);
        return fileUrl;

    } catch (error: any) {
        throw new Error('Error', error.message || 'An error occurred while uploading file');
    }
}

export const createVideo = async (form: any) => {
    try {
        // console.log(form.title, form.prompt, form.userId);

        const [videoUrl, thumbnailUrl] = await Promise.all([
            uploadFile(form.video, 'video'),
            uploadFile(form.thumbnail, 'image')

        ]);

        // console.log(videoUrl, thumbnailUrl);

        const newPost = await db.createDocument(
            databaseId,
            videosCollectionId,
            ID.unique(),
            {
                title: form.title,
                video: videoUrl,
                thumbnail: thumbnailUrl,
                prompt: form.prompt,
                users: form.userId,

            }
        )
        if (!newPost) throw new Error();
        return newPost;
    } catch (error: any) {
        throw new Error('Failed Creating Post', error.message || 'An error occurred while creating post');
    }
}


export const likePost = async (postId: string, user: any) => {
    try {
        const post = await db.getDocument(databaseId, videosCollectionId, postId);
      

        const likedBy = post.likedBy || [];
        const isUserLiked = likedBy.some((likedUser: any) => likedUser.$id === user.$id);

        if (isUserLiked) return post;

        const updatedLikedBy = [...likedBy, user];

        const res = await db.updateDocument(databaseId, videosCollectionId, postId, {
            likedBy: updatedLikedBy
        });

        return res;
    } catch (error: any) {
        console.error(error);
        throw new Error(`Failed Liking Post: ${error.message || 'An error occurred while liking the post'}`);
    }
};

export const unlikePost = async (postId: string, user: any) => {
    try {
        const post = await db.getDocument(databaseId, videosCollectionId, postId);
        const likedBy = post.likedBy || [];
        const updatedLikedBy = likedBy.filter((likedUser: any) => likedUser.$id !== user.$id);

        const res = await db.updateDocument(databaseId, videosCollectionId, postId, {
            likedBy: updatedLikedBy
        });

        return res;
    } catch (error: any) {
        console.error(error);
        throw new Error(`Failed Unliking Post: ${error.message || 'An error occurred while unliking the post'}`);
    }
};
