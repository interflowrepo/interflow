"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UserService = _interopRequireDefault(require("../users/UserService"));
var _FclService = _interopRequireDefault(require("./fclService/FclService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class FlowService {
  async getNftCollectionFromAccount(userId) {
    const user = await _UserService.default.findUser(userId);
    const dapperAddress = user?.dapperAddress;
    const bloctoAddress = user?.bloctoAddress;
    const nftCollectionDataArray = await _FclService.default.getCollectionIds([bloctoAddress, dapperAddress]);
    const nftCollectionData = nftCollectionDataArray[0];
    let newNftLength = 0;
    let userNftCollectionNames = nftCollectionData.map(collection => {
      const length = collection.tokenIDs.length;
      newNftLength += length;
      return collection.display.name;
    });
    user?.nftLength != newNftLength && (await user.update({
      nftLength: newNftLength,
      nftCollections: userNftCollectionNames
    }));
    return nftCollectionData;
  }
  async getNftsCollectionByAddresses(addresses) {
    const nftCollectionData = await _FclService.default.getCollectionIds(addresses);
    return nftCollectionData[0];
  }
  async getAllNftsFromAccount(userId) {
    const user = await _UserService.default.findUser(userId);
    const dapperAddress = user?.dapperAddress;
    const bloctoAddress = user?.bloctoAddress;
    if ((dapperAddress == null || dapperAddress == "") && (bloctoAddress == null || bloctoAddress == "")) return {
      message: 'NO NFTS IN USER STORAGE'
    };
    const nftCollectionDataArray = await _FclService.default.getNfts([bloctoAddress, dapperAddress]);
    const nftCollectionData = nftCollectionDataArray[0];
    return nftCollectionData;
  }
}
var _default = new FlowService();
exports.default = _default;