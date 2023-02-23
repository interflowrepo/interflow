"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _WalletService = _interopRequireDefault(require("app/services/wallets/WalletService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class WalletController {
  async getAllWallets(req, res) {
    try {
      const wallets = await _WalletService.default.getAllWallets();
      return res.status(200).json(wallets);
    } catch (error) {
      return res.status(500).json({
        message: "A internal error getting all wallets occurred"
      });
    }
  }
  async getAllAvailableWallets(req, res) {
    try {
      const wallets = await _WalletService.default.getAllAvailableAccounts();
      return res.status(200).json(wallets);
    } catch (error) {
      return res.status(500).json({
        message: "A internal error getting all available wallets occurred"
      });
    }
  }
  async getAllAvailableWalletsLength(req, res) {
    try {
      const wallets = (await _WalletService.default.getAllAvailableAccounts()).length;
      return res.status(200).json(wallets);
    } catch (error) {
      return res.status(500).json({
        message: "A internal error getting all Available Length wallets occurred"
      });
    }
  }
  async getAllUsedWallets(req, res) {
    try {
      const wallets = await _WalletService.default.getAllUsedWallets();
      return res.status(200).json(wallets);
    } catch (error) {
      return res.status(500).json({
        message: "A internal error getting all used wallets occurred"
      });
    }
  }
  async getAllJobs(req, res) {
    try {
      const jobs = await _WalletService.default.getAllJobs();
      return res.status(200).json(jobs);
    } catch (error) {
      return res.status(500).json({
        message: "A internal error getting all jobs occurred"
      });
    }
  }
  async setWalletToUsersWithoutOne(req, res) {
    try {
      await _WalletService.default.setWalletToUsersWithoutOne();
      return res.status(200).json({
        message: "Wallets setted to users without one"
      });
    } catch (error) {
      return res.status(500).json({
        message: "A internal error setting wallets to users without one occurred"
      });
    }
  }
  async createWallet(req, res) {
    try {
      const wallet = await _WalletService.default.createWalletAccount();
      return res.status(200).json(wallet);
    } catch (error) {
      return res.status(500).json({
        message: "A internal error creating a wallet occurred"
      });
    }
  }
}
var _default = new WalletController();
exports.default = _default;