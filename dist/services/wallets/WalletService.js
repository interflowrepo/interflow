"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _User = require("../../models/users/User");
var _sequelize = require("../../database/sequelize");
var _Account = require("../../models/Wallet/Account");
var _sequelize2 = require("sequelize");
var _AxiosService = _interopRequireDefault(require("../axios/AxiosService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const walletRepository = _sequelize.sequelize.getRepository(_Account.account);
const userRespository = _sequelize.sequelize.getRepository(_User.User);
class WalletService {
  // This method calls the Interflow Wallet API to create a new account
  async createWalletAccount() {
    const accountJob = await _AxiosService.default.post("/accounts");
    return accountJob;
  }

  // This method find a available account and set the user id to it
  // If there is 3 or less available account, it will create 3 new accounts
  // and then set the user id to one of them
  // If there is no available account, it will call itself again
  async setWalletAccountToUser(user) {
    let availableWalletsLength = (await this.getAllAvailableAccounts()).length;

    //OUR IDEA IT'S TO ALWAYS HAVE AT LEAST 10 ACCOUNTS AVAILABLE
    //IF THERE IS LESS THAN 10 ACCOUNTS AVAILABLE, IT WILL CREATE 10 NEW ACCOUNTS
    if (availableWalletsLength <= 10) {
      let x = 0;
      while (x < 10) {
        console.log("Creating wallet account" + x);
        await this.createWalletAccount();
        x++;
      }
    }
    let wallet = null;
    try {
      wallet = await walletRepository.findOne({
        where: {
          interflow_user_id: null
        }
      });
      let x = 0;
      if (!wallet) {
        checkWalletExist();
        function checkWalletExist() {
          setTimeout(async function () {
            x++;
            const wallet = await walletRepository.findOne({
              where: {
                interflow_user_id: null
              }
            });
            if (wallet) {
              console.log("WALLET FOUND!");
              await wallet.update({
                interflow_user_id: user.id
              });
              await user.update({
                interflowAddress: wallet.address
              });
              console.log(`WALLET ADDED TO USER! ${user.id}`);
              return `WALLET ADDED TO USER! ${user.id}`;
            } else {
              if (x < 5) {
                console.log("NULL WALLET FOUND NOT FOUND!");
                checkWalletExist();
              } else {
                console.log("FINISHED PROCESS ------------- WALLET NOT FOUND!");
                //We can add a function that call a notification system
                //To let admin know that there is no wallet available
                return "ADDRESS-ERROR";
              }
            }
          }, 5000);
        }
      } else {
        await wallet.update({
          interflow_user_id: user.id
        });
        await user.update({
          interflowAddress: wallet.address
        });
        return wallet.address;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async setWalletToUsersWithoutOne() {
    const usersWithoutWallet = await userRespository.findAll({
      where: {
        interflowAddress: "ADDRESS-ERROR"
      }
    });
    const wallets = await walletRepository.findAll({
      where: {
        interflow_user_id: null
      }
    });

    //create a for of getting the index of the array
    //and then use the index to get the wallet
    for (let i = 0; i < usersWithoutWallet.length; i++) {
      if (wallets[i]) {
        await wallets[i].update({
          interflow_user_id: usersWithoutWallet[i].id
        });
        await usersWithoutWallet[i].update({
          interflowAddress: wallets[i].address
        });
        console.log(`WALLET ${wallets[i].address} ADDED TO USER! ${usersWithoutWallet[i].id}}`);
      } else {
        console.log("NO WALLET FOUND!");
      }
    }
  }
  async getAllJobs() {
    const jobs = await _AxiosService.default.get("/jobs");
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
          [_sequelize2.Op.not]: null
        }
      }
    });
    return wallets;
  }

  // This method returns the number of available accounts
  async getAllAvailableAccounts() {
    try {
      const walletsWithNullUserId = await walletRepository.findAll({
        where: {
          interflow_user_id: null
        }
      });
      return walletsWithNullUserId;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
var _default = new WalletService();
exports.default = _default;