import config from '../../conf/config';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (err) {
      console.log('Appwrite service :: getCurrentUser :: error', err);
      throw err;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (err) {
      console.log('Appwrite service :: getCurrentUser :: error', err);
      throw err;
    }
  }
}

const authService = new AuthService();

export default AuthService;
