import * as fcl from "@onflow/fcl";
import { getCollectionsData_query } from "./scripts/getCollectionsData_query";
import { getNftsData_query } from "./scripts/getNftsData_query";
import { getStoredPaths_query } from "./scripts/getStoredPaths_query";
import { splitList } from "./utils/Utils";

class FclService {
  async getNfts(addresses: string[]) {
    const removedNullAddresses = addresses.filter(address => address != null && address != undefined && address != "")
    const paths = await this.getStorages(removedNullAddresses);

    console.log("paths", paths)

    const promises = paths.map((group) => {
      return this.getStoredNfts(removedNullAddresses, group);
    });
    return await Promise.all(promises);
  }
  async getCollectionIds(addresses: string[]) {
    const removedNullAddresses = addresses.filter(address => address != null && address != undefined && address != "")
    const paths = await this.getStorages(removedNullAddresses);

    const promises = paths.map((group) => {
      return this.getStoredItems(removedNullAddresses, group);
    });
    return await Promise.all(promises);
  }
  async getStoredNfts(addresses: string[], paths) {
    const response = await fcl.query({
      cadence: getNftsData_query,
      args: (arg, t) => [
        arg(addresses, t.Array(t.Address)),
        arg(paths, t.Array(t.String)),
      ],
    });
    return response;
  }
  async getStoredItems(addresses: string[], paths) {
    const response = await fcl.query({
      cadence: getCollectionsData_query,
      args: (arg, t) => [
        arg(addresses, t.Array(t.Address)),
        arg(paths, t.Array(t.String)),
      ],
    });
    return response;
  }
  async getStorages(addresses: string[]){
    const response = await fcl.query({
      cadence: getStoredPaths_query,
      args: (arg, t) => [
        arg(addresses, t.Array(t.Address)),
      ],
    });

    const groups = splitList(
      response.map((p) => p.identifier),
      50
    );

    return groups;
  }
}

export default new FclService();
