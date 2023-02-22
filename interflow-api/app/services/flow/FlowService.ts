import { NftCollectionData } from "app/daos/NftCollectionData";
import FclService from "./fclService/FclService";

class FlowService {
    async getNftCollectionFromAccount(bloctoAddress, dapperAddress): Promise<NftCollectionData[]>{
        let nftCollectionData: NftCollectionData[] = await FclService.getCollectionIds([bloctoAddress, dapperAddress])
        return nftCollectionData
    }

}

export default new FlowService();