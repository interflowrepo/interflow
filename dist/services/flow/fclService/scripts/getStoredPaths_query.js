"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStoredPaths_query = void 0;
var _outdatedPathsTestnet = require("./outdatedPathsTestnet");
const getStoredPaths_query = `
pub fun main(addresses: [Address]): [StoragePath] {
    ${_outdatedPathsTestnet.outdatedPathsTestnet.storage} 
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
`;
exports.getStoredPaths_query = getStoredPaths_query;