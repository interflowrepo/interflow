import UserUtils from "@controller/users/UserUtils";
import { Request, Response } from "express";
import { sequelize } from "@database/sequelize";
import { account } from "@models/Wallet/Account";
import WalletService from "app/services/wallets/WalletService";

class WalletController {
  public async getAllWallets(req: Request, res: Response): Promise<Response> {
    const wallets = await WalletService.getAllWallets();
    return res.status(200).json(wallets);
  }

  public async getAllAvailableWallets(req: Request, res: Response): Promise<Response> {
    const wallets = await WalletService.getAllAvailableAccounts();
    return res.status(200).json(wallets);
  }

  public async getAllAvailableWalletsLength(req: Request, res: Response): Promise<Response> {
    const wallets = (await WalletService.getAllAvailableAccounts()).length;
    return res.status(200).json(wallets);
  }

  public async getAllUsedWallets(req: Request, res: Response): Promise<Response> {
    const wallets = await WalletService.getAllUsedWallets();
    return res.status(200).json(wallets);
  }

  public async getAllJobs(req: Request, res: Response): Promise<Response> {
    try {
      const jobs = await WalletService.getAllJobs();
      return res.status(200).json(jobs);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "A internal error getting all jobs occurred" });
    }
  }

}

export default new WalletController();
