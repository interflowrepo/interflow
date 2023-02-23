import { Router } from "express";

import WalletController from "@controller/wallets/WalletController";

const walletRoutes = Router();

// ------------ GET REQUESTS
walletRoutes.get("/wallets/getWallets", WalletController.getAllWallets);
walletRoutes.get("/wallets/getAvailableWallets", WalletController.getAllAvailableWallets);
walletRoutes.get("/wallets/getAvailableWalletsLength", WalletController.getAllAvailableWalletsLength);
walletRoutes.get("/wallets/getUsedWallets", WalletController.getAllUsedWallets);
walletRoutes.get("/wallets/getAllJobs", WalletController.getAllJobs);

// ------------ POST REQUESTS
walletRoutes.post("/wallets/setWalletToUsersWithoutOne", WalletController.setWalletToUsersWithoutOne);
walletRoutes.post("/wallets/createWallet", WalletController.createWallet);


export default walletRoutes;
