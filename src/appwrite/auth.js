import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";


export class AuthService{
    client = new Client()
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            this.account = new Account(this.client)
    }

    async CreateAccount({email, name, password}){
        try {
            const userAccount  = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                return this.login({email,password})
            }
            else{
                return userAccount
            }
            
        } catch (error) {
            throw error
            
        }
    }

    async login({email,password}){
        try {
            const userLogin = await this.account.createEmailPasswordSession(email,password)
            if(userLogin){
                return userLogin
            }
            else{
                return userLogin
            }

        } catch (error) {
            throw error
        }
    }

    async checkLoginState(){
        try {
            const loggedinUser = await this.account.get()
            if(loggedinUser){
                return loggedinUser
            }
        }
        catch(error){
            throw error
        }
    }

    async logout(){
        try {
            return this.account.deleteSessions();
        } catch (error) {
            throw error
            
        }
    }
}

const authService = new AuthService()

export default authService