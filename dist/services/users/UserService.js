"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UserUtils = _interopRequireDefault(require("../../controller/users/UserUtils"));
var _sequelize = require("../../database/sequelize");
var _User = require("../../models/users/User");
var _WalletService = _interopRequireDefault(require("../wallets/WalletService"));
var _FlowService = _interopRequireDefault(require("../flow/FlowService"));
var _sequelize2 = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userRepository = _sequelize.sequelize.getRepository(_User.User);
class UserService {
  async login(authId, email) {
    try {
      //check if user already exists
      const userExists = await userRepository.findOne({
        where: {
          email: email
        }
      });
      if (userExists) {
        return {
          message: "User logged with success!",
          userExists
        };
      }
    } catch (err) {
      return {
        message: "There was a problem logging in."
      };
    }
    const nickname = await _UserUtils.default.generateNickname();
    try {
      const user = await userRepository.create({
        authId: authId,
        nickname: nickname,
        email: email,
        interflowAddress: "",
        bloctoAddress: null,
        dapperAddress: null,
        nftLength: 0,
        bgImage: "https://interflow-app.s3.amazonaws.com/bgImage.png",
        pfpImage: "https://interflow-app.s3.amazonaws.com/pfpImage.png",
        followers: [],
        following: [],
        nftCollections: []
      });
      let userId = user?.id;
      let interflowAddress;

      //FIX THIS! IT'S BREAKING IF THE WALLET IT'S NOT FOUND
      interflowAddress = await _WalletService.default.setWalletAccountToUser(user);
      if (!interflowAddress) {
        interflowAddress = "ADDRESS-ERROR";
      }
      await user.update({
        interflowAddress: interflowAddress
      });
      return {
        message: "User created with success!",
        user
      };
    } catch (err) {
      return {
        message: "There was a problem creating the user."
      };
    }
  }
  async findAllUsers() {
    const users = await userRepository.findAll();
    return users;
  }
  async findUser(id) {
    const user = await userRepository.findByPk(id, {
      include: [{
        association: "posts"
      }]
    });
    return user;
  }
  async updateUser(id, userUpdates) {
    let user = await userRepository.findByPk(id);
    let dapperAddress = userUpdates.dapperAddress;
    let bloctoAddress = userUpdates.bloctoAddress;
    !dapperAddress && (dapperAddress = user?.dapperAddress);
    !bloctoAddress && (bloctoAddress = user?.bloctoAddress);
    const nftCollections = await _FlowService.default.getNftsCollectionByAddresses([bloctoAddress, dapperAddress]);
    let newNftLength = 0;
    let userNftCollectionNames = nftCollections.map(collection => {
      const length = collection.tokenIDs.length;
      newNftLength += length;
      return collection.display.name;
    });
    userUpdates.nftCollections = userNftCollectionNames;
    userUpdates.nftLength = newNftLength;
    await user.update(userUpdates);
    return user;
  }
  async getUserNfts(id) {
    const nfts = await _FlowService.default.getAllNftsFromAccount(id);
    return nfts;
  }
  async followUser(id, userToFollowId) {
    let user = await userRepository.findByPk(id);
    let userToFollow = await userRepository.findByPk(userToFollowId);
    if (!userToFollow) {
      return null;
    }

    //Update Following from User
    // User = user calling the action to follow someone
    let currentFollowing = user?.following;
    if (currentFollowing.includes(userToFollowId)) {
      return null;
    }
    let followingIds = [...user?.following, userToFollowId];
    await user.update({
      following: followingIds
    });

    // Update Followers from userToFollow
    // userToFollow = user that will receive the new follower(user calling the action)
    let userToFollowFollowers = [...userToFollow?.followers, id];
    console.log("user to follow", userToFollowFollowers);
    await userToFollow.update({
      followers: userToFollowFollowers
    });
    return user;
  }
  async unfollowUser(id, userToUnfollowId) {
    let user = await userRepository.findByPk(id);
    let userToUnfollow = await userRepository.findByPk(userToUnfollowId);

    // Update Following from User
    let updatedFollowing = user?.following.filter(followingId => followingId !== userToUnfollowId);
    await user.update({
      following: updatedFollowing
    });

    // Update Followers from userToUnfollow
    let updatedFollowers = userToUnfollow?.followers.filter(follower => follower !== id);
    await userToUnfollow.update({
      followers: updatedFollowers
    });
    return user;
  }
  async deleteUser(id) {
    const user = await userRepository.findByPk(id);
    if (user) {
      await user.destroy();
    }
    return "User removed with success!";
  }
  async getUserCollectionData(id) {
    const user = await userRepository.findByPk(id, {
      include: [{
        association: "userPosts"
      }]
    });
    if (!user) {
      return null;
    }
    if ((user.dapperAddress === null || user.dapperAddress === "") && (user.bloctoAddress === null || user.bloctoAddress === "")) {
      let userCompleteData = {
        user,
        collections: []
      };
      return userCompleteData;
    } else {
      let nftCollectionData = await _FlowService.default.getNftCollectionFromAccount(id);
      console.log("nftCollectionData", nftCollectionData);
      let userCompleteData = {
        user,
        collections: nftCollectionData
      };
      return userCompleteData;
    }
  }
  async getUserSocialData(id, compareCollection) {
    const user = await userRepository.findByPk(id);
    if (!user) {
      return null;
    }
    let collectionInCommon = user.nftCollections.filter(collection => compareCollection.includes(collection));
    let userSocialData = {
      nickname: user.nickname,
      address: user.interflowAddress,
      pfpImage: user.pfpImage,
      bgImage: user.bgImage,
      nftLength: user.nftLength,
      collectionInCommon: collectionInCommon,
      nftCollections: user.nftCollections
    };
    return userSocialData;
  }
  async getFollowersData(id) {
    const user = await userRepository.findByPk(id);
    if (!user) {
      return null;
    }
    let followersData = [];
    let followers = user.followers;
    for (let followerId of followers) {
      let userfollowersData = await this.getUserSocialData(followerId, user.nftCollections);
      followersData.push(userfollowersData);
    }
    return _UserUtils.default.sortSocialUsers(followersData);
  }
  async getFollowingData(id) {
    const user = await userRepository.findByPk(id);
    if (!user) {
      return null;
    }
    let followingData = [];
    let following = user.following;
    for (let followingId of following) {
      let userfollowingData = await this.getUserSocialData(followingId, user.nftCollections);
      followingData.push(userfollowingData);
    }
    return _UserUtils.default.sortSocialUsers(followingData);
  }
  async getExploreData(id) {
    const exploreUsers = await userRepository.findAll({
      attributes: ["id"],
      where: {
        id: {
          [_sequelize2.Op.not]: id
        }
      }
    });
    let user = await userRepository.findByPk(id);
    let exploreIds = exploreUsers.map(user => user.id);
    let exploreUsersData = [];
    for (let exploreUser of exploreIds) {
      let userfollowingData = await this.getUserSocialData(exploreUser, user.nftCollections);
      exploreUsersData.push(userfollowingData);
    }
    return _UserUtils.default.sortSocialUsers(exploreUsersData);
  }
  async getRankingData() {
    const rankingUsers = await userRepository.findAll({
      order: [["nftLength", "DESC"]]
    });
    let rankingUsersData = [];
    for (let rankingUser of rankingUsers) {
      let userRankingData = {
        id: rankingUser.id,
        nickname: rankingUser.nickname,
        address: rankingUser.interflowAddress,
        pfpImage: rankingUser.pfpImage,
        bgImage: rankingUser.bgImage,
        nftLength: rankingUser.nftLength,
        nftCollections: rankingUser.nftCollections
      };
      rankingUsersData.push(userRankingData);
    }
    return rankingUsersData;
  }
}
var _default = new UserService();
exports.default = _default;