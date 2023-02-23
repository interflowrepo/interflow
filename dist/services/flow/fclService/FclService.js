"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var fcl = _interopRequireWildcard(require("@onflow/fcl"));
var _getCollectionsData_query = require("./scripts/getCollectionsData_query");
var _getNftsData_query = require("./scripts/getNftsData_query");
var _getStoredPaths_query = require("./scripts/getStoredPaths_query");
var _Utils = require("./utils/Utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class FclService {
  async getNfts(addresses) {
    const removedNullAddresses = addresses.filter(address => address != null && address != undefined && address != "");
    const paths = await this.getStorages(removedNullAddresses);
    console.log("paths", paths);
    const promises = paths.map(group => {
      return this.getStoredNfts(removedNullAddresses, group);
    });
    return await Promise.all(promises);
  }
  async getCollectionIds(addresses) {
    const removedNullAddresses = addresses.filter(address => address != null && address != undefined && address != "");
    const paths = await this.getStorages(removedNullAddresses);
    const promises = paths.map(group => {
      return this.getStoredItems(removedNullAddresses, group);
    });
    return await Promise.all(promises);
  }
  async getStoredNfts(addresses, paths) {
    const response = await fcl.query({
      cadence: _getNftsData_query.getNftsData_query,
      args: (arg, t) => [arg(addresses, t.Array(t.Address)), arg(paths, t.Array(t.String))]
    });
    return response;
  }
  async getStoredItems(addresses, paths) {
    const response = await fcl.query({
      cadence: _getCollectionsData_query.getCollectionsData_query,
      args: (arg, t) => [arg(addresses, t.Array(t.Address)), arg(paths, t.Array(t.String))]
    });
    return response;
  }
  async getStorages(addresses) {
    const response = await fcl.query({
      cadence: _getStoredPaths_query.getStoredPaths_query,
      args: (arg, t) => [arg(addresses, t.Array(t.Address))]
    });
    const groups = (0, _Utils.splitList)(response.map(p => p.identifier), 50);
    return groups;
  }
}
var _default = new FclService();
exports.default = _default;