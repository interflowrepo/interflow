"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class UserUtils {
  //method that generate a random nickname
  async generateNickname() {
    const nickname = Math.random().toString(36).substring(7);
    return nickname;
  }
  async sortUsers(ids) {
    const shuffled = ids.sort(() => 0.5 - Math.random());
    return shuffled;
  }
  async sortUsersWithData(users, callerCollectionName) {
    const sortedUsers = users.sort((a, b) => {
      if (a.user.nftCollections.some(r => callerCollectionName.includes(r))) {
        return 2;
      } else if (a.user.followers.length > b.user.followers.length) {
        return -1;
      } else if (a.user.followers.length < b.user.followers.length) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortedUsers;
  }
  async sortSocialUsers(users) {
    const sortedUsers = users.sort((a, b) => {
      if (a.collectionInCommon.length > b.collectionInCommon.length) {
        return 2;
      } else if (a.nftLength > b.nftLength) {
        return 1;
      } else if (a.collectionInCommon.length < b.collectionInCommon.length) {
        return -1;
      } else if (a.nftLength < b.nftLength) {
        return -2;
      } else {
        return 0;
      }
    });
    return sortedUsers;
  }
}
var _default = new UserUtils();
exports.default = _default;