import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.Project1',
    projectId: '671e7ff8000a83f0991c',
    databaseId: '671e81e7003a682b9295',
    userCollectionId: '671e8214001ce60a59ce',
    videoCollectionId: '671e824100105e03ff6b',
    storageId: '671e83d40002de89517c',
};

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId,
} = config;

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);

        if (!newAccount) throw new Error('Failed to create account');

        const avatarUrl = avatars.getInitials(username);
        const newUser = await databases.createDocument(
            databaseId,
            userCollectionId,
            ID.unique(),
            {
                accountid: newAccount.$id,
                Email: email,
                username,
                avatar: avatarUrl,
            }
        );

        return newUser;
    } catch (error) {
        console.error('Error in createUser:', error);
        throw new Error(`Error creating user: ${error.message}`);
    }
};

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.error('Error in signIn:', error);
        throw new Error(`Error signing in: ${error.message}`);
    }
};

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) {
            throw new Error('No account found');
        }

        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('accountid', currentAccount.$id)]
        );

        if (!currentUser.documents.length) {
            throw new Error('User not found');
        }

        return currentUser.documents[0];
    } catch (error) {
        console.error('Error in getCurrentUser:', error.message);
        throw new Error(`Error fetching current user: ${error.message}`);
    }
};

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(databaseId, videoCollectionId);
        return posts.documents;
    } catch (error) {
        console.error('Error in getAllPosts:', error);
        throw new Error(`Error fetching all posts: ${error.message}`);
    }
};

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt')]
        );
        return posts.documents;
    } catch (error) {
        console.error('Error in getLatestPosts:', error);
        throw new Error(`Error fetching latest posts: ${error.message}`);
    }
};

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title', query)]
        );
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
};

export async function uploadFile(file, type) {
    if (!file) return;

    const asset={
      name:file.fileName,
      type:file.mimeType,
      size:file.fileSize,
      uri:file.uri,

    }

    try {
        const uploadedFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
    } catch (error) {
        console.error('Error in uploadFile:', error);
        throw new Error(`Error uploading file: ${error.message}`);
    }
}

export async function getFilePreview(fileId, type) {
    try {
        let fileUrl;

        if (type === 'video') {
            fileUrl = storage.getFileView(storageId, fileId);
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100);
        } else {
            throw new Error('Invalid file type');
        }

        if (!fileUrl) throw new Error('File preview URL not found');

        return fileUrl;
    } catch (error) {
        console.error('Error in getFilePreview:', error);
        throw new Error(`Error fetching file preview: ${error.message}`);
    }
}

export async function createVideo(form) {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video'),
        ]);

        const newPost = await databases.createDocument(
            databaseId,
            videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId,
            }
        );

        return newPost;
    } catch (error) {
        console.error('Error in createVideo:', error);
        throw new Error(`Error creating video post: ${error.message}`);
    }
}
