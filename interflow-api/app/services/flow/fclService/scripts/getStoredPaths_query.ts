import { outdatedPathsTestnet } from "./outdatedPathsTestnet";

export const getStoredPaths_query = `
pub fun main(addresses: [Address]): [StoragePath] {
    ${outdatedPathsTestnet.storage} 
    let cleandPaths: [StoragePath] = []
    for address in addresses {
        let account = getAuthAccount(address)
        for path in account.storagePaths {
        if (outdatedPaths.containsKey(path)) {
            continue
        }

        cleandPaths.append(path)
        }
    }
    return cleandPaths
  } 
`