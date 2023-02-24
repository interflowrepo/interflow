import { User } from "./../../models/users/User";
import { NftCollectionData } from "app/daos/NftCollectionData";
import UserService from "../users/UserService";
import FclService from "./fclService/FclService";

class FlowService {
  async getNftCollectionFromAccount(
    userData: User
  ): Promise<NftCollectionData[]> {
    const dapperAddress = userData?.dapperAddress;
    const bloctoAddress = userData?.bloctoAddress;

    let nftCollectionDataArray: NftCollectionData[][] = [];
    try {
      nftCollectionDataArray = await FclService.getCollectionIds([
        bloctoAddress,
        dapperAddress,
      ]);
    } catch (error) {
      console.log("error", error);
    }

    const nftCollectionData = nftCollectionDataArray[0];
    let newNftLength = 0;
    let userNftCollectionNames = nftCollectionData.map((collection) => {
      const length = collection.tokenIDs.length;
      newNftLength += length;
      return collection.display.name;
    });

    try {
      let user = await UserService.getUser(userData?.id);
      if (
        userData?.nftLength != newNftLength ||
        userData.nftCollections != userNftCollectionNames
      )
        await user.update({
          nftLength: newNftLength,
          nftCollections: userNftCollectionNames,
        });
    } catch (error) {
      console.log("error", error);
    }

    return nftCollectionData;
  }

  async getNftsCollectionByAddresses(
    addresses: string[]
  ): Promise<NftCollectionData[]> {
    const nftCollectionData: NftCollectionData[][] =
      await FclService.getCollectionIds(addresses);
    return nftCollectionData[0];
  }

  async getAllNftsFromAccount(user): Promise<any> {
    const dapperAddress = user?.dapperAddress;
    const bloctoAddress = user?.bloctoAddress;

    const nftCollectionDataArray: any = await FclService.getNfts([
      bloctoAddress,
      dapperAddress,
    ]);
    const nftCollectionData = nftCollectionDataArray[0];

    return nftCollectionData;
  }
}

export default new FlowService();
