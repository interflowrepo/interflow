"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _WalletController = _interopRequireDefault(require("../../controller/wallets/WalletController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const walletRoutes = (0, _express.Router)();

// ------------ GET REQUESTS
walletRoutes.get("/wallets/getWallets", _WalletController.default.getAllWallets);
walletRoutes.get("/wallets/getAvailableWallets", _WalletController.default.getAllAvailableWallets);
walletRoutes.get("/wallets/getAvailableWalletsLength", _WalletController.default.getAllAvailableWalletsLength);
walletRoutes.get("/wallets/getUsedWallets", _WalletController.default.getAllUsedWallets);
walletRoutes.get("/wallets/getAllJobs", _WalletController.default.getAllJobs);

// ------------ POST REQUESTS
walletRoutes.post("/wallets/setWalletToUsersWithoutOne", _WalletController.default.setWalletToUsersWithoutOne);
walletRoutes.post("/wallets/createWallet", _WalletController.default.createWallet);
var _default = walletRoutes;
exports.default = _default;