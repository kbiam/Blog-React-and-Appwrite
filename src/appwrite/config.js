import conf from "../conf/conf";
import { Client, Databases, ID, Account, Storage, Query } from "appwrite";


export class Service{
    client = new Client()
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            this.databases = new Databases(this.client)
            this.bucket = new Storage(this.client)
    }
    async createPost({title, featured_image, content, slug, userId, status}){
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId, slug,{
                title,
                featured_image,
                content,
                userId,
                status
            })
            
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug,{title, featured_image, content, status}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug,{
                title,
                featured_image,
                content,
                status
            })
        } catch (error) {
            throw error
        }

    }
    async deletePost(slug){
        try {
             await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
             return true
        } catch (error) {
            console.log(error) 
            return false
            
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        } catch (error) {
            throw error
            
        }
    }
    async getAllPosts(){
        try {
            const result = await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId,[Query.equal("status",["Active"])])
            return result
        } catch (error) {
            throw error
        }
    }

    //file Upload

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
        }
    }

    async deleteFile(fileID){
        try {
             await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
            return true
        } catch (error) {
            return false
            
        }
    }
     filePreview(fileID){
        try {
            return this.bucket.getFilePreview(conf.appwriteBucketId,fileID)
            
        } catch (error) {
            throw error
        }
    }

}


const service = new Service()
export default service