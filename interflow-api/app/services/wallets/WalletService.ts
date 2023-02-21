import { sequelize } from "@database/sequelize";
import { account } from "@models/Wallet/Account";
import { AccountType } from "app/types/AccountType";
import { Op } from "sequelize";
import AxiosService from "../axios/AxiosService";

const walletRepository = sequelize.getRepository(account);

class WalletService {
  // This method calls the Interflow Wallet API to create a new account
  async createWalletAccount() {
    const accountJob = await AxiosService.post("/accounts");
    return accountJob;
  }

  // This method find a available account and set the user id to it
  // If there is 3 or less available account, it will create 3 new accounts
  // and then set the user id to one of them
  // If there is no available account, it will call itself again
  async setWalletAccountToUser(userId: string): Promise<string> {
    let availableWalletsLength = (await this.getAllAvailableAccounts()).length;

    if (availableWalletsLength <= 300) {
      let x = 0;
      while (x < 3) {
        console.log("Creating wallet account" + x);
        await this.createWalletAccount();
        x++;
      }
    }

    try {
      const wallet = await walletRepository.findOne({
        where: {
          interflow_user_id: null,
        },
      });

      console.log('NULL WALLET FOUND: ',wallet);

      let x=0;
      if (!wallet) {
        console.log('NULL WALLET FOUND NOT FOUND!');
        console.log('SET TIME OUT 5 SEG!');
        setTimeout(() => {
            this.setWalletAccountToUser(userId);
        }, 5000);

        x++;
        if(x>5){
          return null
        }
      }

      wallet.interflow_user_id = userId;
      await wallet.save();

      return wallet.address;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error");
    }
  }

  async getAllJobs() {
    const jobs = await AxiosService.get("/jobs");
    return jobs;
  }

  async getAllWallets() {
    const wallets = await walletRepository.findAll();
    return wallets;
  }

  async getAllUsedWallets() {
    const wallets = await walletRepository.findAll({
      where: {
        interflow_user_id: {
          [Op.not]: null,
        },
      },
    });

    return wallets;
  }

  // This method returns the number of available accounts
  async getAllAvailableAccounts() {
    try {
      const walletsWithNullUserId = await walletRepository.findAll({
        where: {
          interflow_user_id: null,
        },
      });

      return walletsWithNullUserId;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error");
    }
  }
}

export default new WalletService();
