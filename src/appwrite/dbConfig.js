
import config from "../config/config";
import {Client,ID,Databases,Storage,Query} from "appwirte";

//This method or components specially for post ..all post activity can handle from
//this components.
export class dbService{
 
    client =new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error",error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
      try {
        return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
            title,
            content,
            featuredImage,
            status
        })
      } catch (error) {
        console.log("Appwrite service :: updatePost :: error",error);
      }
      
    }

    async deletePost(slug){
    try {
         await this.databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        )
        return true;

    } catch (error) {
      console.log("Appwrite  service :: deletePost :: error",error);        
      return false;
    }    
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("Appwrite service :: getPost :: error ",error);
            return false
        }
    }

    async getAllPost(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getAllPost :: error",error);
            return false;
        }
    }
   
    async uploadFile(file){
        try {
            return await this.databases.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error  ",error)
        }
    }

    async deleteFile(fileId){
        try {
            await this.databases.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error",error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}

const dbservice=new dbService();
export default dbservice;