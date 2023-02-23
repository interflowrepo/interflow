import FlowService from "app/services/flow/FlowService";
import { Request, Response } from "express";

class FlowController {
  public async getNftsCollection(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const nfts = await FlowService.getNftCollectionFromAccount(id);
      return res.json(nfts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new FlowController();