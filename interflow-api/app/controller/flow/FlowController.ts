import FlowService from "app/services/flow/FlowService";
import UserService from "app/services/users/UserService";
import { Request, Response } from "express";

class FlowController {
  public async getNftsCollection(req: Request, res: Response) {
    const { id } = req.params;

    try {
      let user = await UserService.findUser(id);
      let dapperAddress = user?.dapperAddress;
      let bloctoAddress = user?.bloctoAddress;

      const nfts = await FlowService.getNftCollectionFromAccount(
        dapperAddress,
        bloctoAddress
      );

      return res.json(nfts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new FlowController();