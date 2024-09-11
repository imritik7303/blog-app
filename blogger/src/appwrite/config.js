import conf from "../conf/conf";
import { Client , ID , Databases , Storage , Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;


    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = Databases(this.client);
        this.bucket = Storage(this.client);
    }

    async createPost({title , slug , content , featuredimage ,status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("appwrite service :: createPost :: error",error); 
        }
    }

    async updatePost(slug , {title , content , featuredimage , status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                }
            )
        } catch (error) {
            console.log("appwrite service :: updatePost :: error",error); 
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("appwrite service :: deletePost :: error",error); 
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("appwrite service :: getPost :: error",error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                queries,
                
            )
        } catch (error) {
            console.log("appwrite service :: updatePosts :: error",error);
            return false;
        }
        
    }

    //file upload services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appwrite service :: uploadFile :: error",error);
            return false;
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("appwrite service :: deleteFile :: error",error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service =  new Service;
export default service;