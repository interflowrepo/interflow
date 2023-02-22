import * as fcl from "@onflow/fcl";
import { getCollectionsData_query } from "./scripts/getCollectionsData_query";
import { getStoredPaths_query } from "./scripts/getStoredPaths_query";
import { splitList } from "./utils/Utils";

class FclService {
  async getCollectionIds(addresses: string[]) {
    const paths = await this.getStorages(addresses);

    const promises = paths.map((group) => {
      return this.getStoredItems(addresses, group);
    });
    return await Promise.all(promises);
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
