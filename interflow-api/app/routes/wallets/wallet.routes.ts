import { Router } from "express";

import WalletController from "@controller/wallets/WalletController";

const walletRoutes = Router();

// ------------ GET REQUESTS
walletRoutes.get("/getWallets", WalletController.getAllWallets);
walletRoutes.get("/getAvailableWallets", WalletController.getAllAvailableWallets);
walletRoutes.get("/getAvailableWalletsLength", WalletController.getAllAvailableWalletsLength);
walletRoutes.get("/getUsedWallets", WalletController.getAllUsedWallets);
walletRoutes.get("/getAllJobs", WalletController.getAllJobs);

// ------------ POST REQUESTS


export default walletRoutes;
