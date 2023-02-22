import { Request, Response } from "express";
import WalletService from "app/services/wallets/WalletService";

class WalletController {
  public async getAllWallets(req: Request, res: Response): Promise<Response> {
    try {
      const wallets = await WalletService.getAllWallets();
      return res.status(200).json(wallets);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "A internal error getting all wallets occurred" });
    }
  }

  public async getAllAvailableWallets(req: Request, res: Response): Promise<Response> {
    try {
      const wallets = await WalletService.getAllAvailableAccounts();
      return res.status(200).json(wallets);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "A internal error getting all available wallets occurred" });
    }
  }

  public async getAllAvailableWalletsLength(req: Request, res: Response): Promise<Response> {
    try {
      const wallets = (await WalletService.getAllAvailableAccounts()).length;
      return res.status(200).json(wallets);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "A internal error getting all Available Length wallets occurred" });
    }
  }

  public async getAllUsedWallets(req: Request, res: Response): Promise<Response> {
    try {
      const wallets = await WalletService.getAllUsedWallets();
      return res.status(200).json(wallets);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "A internal error getting all used wallets occurred" });
    }
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