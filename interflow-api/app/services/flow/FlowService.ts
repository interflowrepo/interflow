import { NftCollectionData } from "app/daos/NftCollectionData";
import UserService from "../users/UserService";
import FclService from "./fclService/FclService";

class FlowService {
    async getNftCollectionFromAccount(userId): Promise<NftCollectionData[]>{
        const user = await UserService.findUser(userId);
        const dapperAddress = user?.dapperAddress;
        const bloctoAddress = user?.bloctoAddress;

        const nftCollectionDataArray: NftCollectionData[][] = await FclService.getCollectionIds([bloctoAddress, dapperAddress])
        const nftCollectionData = nftCollectionDataArray[0]
        let newNftLength = 0
        let userNftCollectionNames = nftCollectionData.map((collection) => {
            const length = collection.tokenIDs.length
            newNftLength += length
            return collection.display.name
        })

        user?.nftLength != newNftLength && await user.update({ nftLength: newNftLength, nftCollections: userNftCollectionNames});
        return nftCollectionData
    }

    async getNftsCollectionByAddresses(addresses: string[]): Promise<NftCollectionData[]>{        
        const nftCollectionData: NftCollectionData[][] = await FclService.getCollectionIds(addresses)
        return nftCollectionData[0]
    }

    async getAllNftsFromAccount(userId): Promise<any>{
        const user = await UserService.findUser(userId);
        
        const dapperAddress = user?.dapperAddress;
        const bloctoAddress = user?.bloctoAddress;

        if((dapperAddress == null || dapperAddress == "") && (bloctoAddress == null || bloctoAddress == "")) return {message: 'No nfts found on this account'};

        const nftCollectionDataArray: any = await FclService.getNfts([bloctoAddress, dapperAddress])
        const nftCollectionData = nftCollectionDataArray[0]

        return nftCollectionData
    }

}

export default new FlowService();