import { NftCollectionData } from "./../../daos/NftCollectionData";
import { UserCompleteData } from "./../../daos/UserCompleteData";
import UserUtils from "@controller/users/UserUtils";
import { sequelize } from "@database/sequelize";
import { User } from "@models/users/User";
import { UserUpdate } from "app/daos/UserUpdate";
import WalletService from "../wallets/WalletService";
import FlowService from "../flow/FlowService";
import { Op } from "sequelize";
import { UserSocialData } from "app/daos/UserSocialData";
import { UserRakingData } from "app/daos/UserRankingData";

const userRepository = sequelize.getRepository(User);

class UserService {
  async login(authId: string, email: string): Promise<any> {
    try {
      //check if user already exists
      const userExists = await userRepository.findOne({
        where: {
          email: email,
        },
      });

      if (userExists) {
        return {
          message: "User logged with success!",
          userExists,
        };
      }
    } catch (err: any) {
      console.log('ERROR ---', err)
      return { message: "There was a problem logging in." };
    }

    const nickname = await UserUtils.generateNickname();

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
        nftCollections: [],
      });

      return {
        message: "User created with success!",
        user,
      };
    } catch (err: any) {
      return { message: "There was a problem creating the user." };
    }
  }

  async findAllUsers(): Promise<User[]> {
    const users = await userRepository.findAll();
    return users;
  }

  async findUserDataValue(id: string): Promise<User | null> {
    const user = await userRepository.findByPk(id, {
      include: [
        {
          association: "userPosts",
        },
      ],
    });
    return user.dataValues;
  }

  async getUser(id: string): Promise<User | null> {
    const user = await userRepository.findByPk(id);
    return user;
  }

  async updateUser(id: string, userUpdates: UserUpdate): Promise<User | null> {
    let user = await this.getUser(id);

    let dapperAddress = userUpdates.dapperAddress;
    let bloctoAddress = userUpdates.bloctoAddress;
    !dapperAddress && (dapperAddress = user?.dataValues.dapperAddress);
    !bloctoAddress && (bloctoAddress = user?.dataValues.bloctoAddress);

    const nftCollections = await FlowService.getNftsCollectionByAddresses([
      bloctoAddress,
      dapperAddress,
    ]);

    let newNftLength = 0;
    let userNftCollectionNames = nftCollections.map((collection) => {
      const length = collection.tokenIDs.length;
      newNftLength += length;
      return collection.display.name;
    });

    userUpdates.nftCollections = userNftCollectionNames;
    userUpdates.nftLength = newNftLength;

    await user.update(userUpdates);

    return user;
  }

  async followUnfollowUser(
    id: string,
    userToFollowId: string
  ): Promise<User | null> {
    let user = await this.getUser(id);
    let userToFollow = await this.getUser(userToFollowId);

    if (!userToFollow || !user) {
      return null;
    }

    // Check if user is already following the userToFollow
    // If so, unfollow the userToFollow
    if (user?.dataValues.following.includes(userToFollowId)) {
      let updatedFollowing = user?.dataValues.following.filter(
        (followingId) => followingId !== userToFollowId
      );
      await user.update({ following: updatedFollowing });

      // Update Followers from userToUnfollow
      let updatedFollowers = userToFollow?.dataValues.followers.filter(
        (follower) => follower !== id
      );
      await userToFollow.update({ followers: updatedFollowers });

      return user;
    }

    //Update Following from User
    // User = user calling the action to follow someone
    let currentFollowing = user?.dataValues.following;
    if (currentFollowing.includes(userToFollowId)) {
      return null;
    }
    let followingIds = [...user?.dataValues.following, userToFollowId];
    await user.update({ following: followingIds });

    // Update Followers from userToFollow
    // userToFollow = user that will receive the new follower(user calling the action)
    let userToFollowFollowers = [...userToFollow?.dataValues.followers, id];
    console.log("user to follow", userToFollowFollowers);
    await userToFollow.update({ followers: userToFollowFollowers });

    return user;
  }

  async deleteUser(id: string): Promise<string | null> {
    const user = await this.getUser(id);
    if (user) {
      await user.destroy();
    }
    return "User removed with success!";
  }

  async getUserNfts(id: string): Promise<any> {
    const user = await this.findUserDataValue(id);
    console.log("user", user);
    if (
      (user.dapperAddress === null || user.dapperAddress === "") &&
      (user.bloctoAddress === null || user.bloctoAddress === "")
    )
      return { message: "User has no NFTs" };

    const nfts = await FlowService.getAllNftsFromAccount(user);
    return nfts;
  }

  //TODO: CHANGE TO GET USER AND GET USER DATA USING user.DataValues
  async getUserCollectionData(id: string): Promise<UserCompleteData> {
    const userData = await this.findUserDataValue(id);
    if (!userData) {
      return null;
    }

    if (
      (userData.dapperAddress === null || userData.dapperAddress === "") &&
      (userData.bloctoAddress === null || userData.bloctoAddress === "")
    ) {
      let userCompleteData: UserCompleteData = {
        user: userData,
        collections: [],
      };
      return userCompleteData;
    } else {
      let nftCollectionData: NftCollectionData[] =
        await FlowService.getNftCollectionFromAccount(userData);
      let userCompleteData: UserCompleteData = {
        user: userData,
        collections: nftCollectionData,
      };

      console.log("userCompleteData", userCompleteData);

      return userCompleteData;
    }
  }

  async getUserSocialData(
    id: string,
    compareCollection: string[]
  ): Promise<UserSocialData> {
    const user = await this.findUserDataValue(id);
    if (!user) {
      return null;
    }

    let collectionInCommon = user.nftCollections.filter((collection) =>
      compareCollection.includes(collection)
    );

    let userSocialData: UserSocialData = {
      id: user.id,
      nickname: user.nickname,
      address: user.interflowAddress,
      pfpImage: user.pfpImage,
      bgImage: user.bgImage,
      nftLength: user.nftLength,
      collectionInCommon: collectionInCommon,
      nftCollections: user.nftCollections,
    };

    return userSocialData;
  }

  async getFollowersData(id: string): Promise<UserSocialData[]> {
    const user = await this.findUserDataValue(id);
    if (!user) {
      return null;
    }

    let followersData: UserSocialData[] = [];
    let followers = user.followers;

    for (let followerId of followers) {
      let userfollowersData = await this.getUserSocialData(
        followerId,
        user.nftCollections
      );
      followersData.push(userfollowersData);
    }
    return UserUtils.sortSocialUsers(followersData);
  }

  async getFollowingData(id: string): Promise<UserSocialData[]> {
    const user = await this.findUserDataValue(id);
    if (!user) {
      return null;
    }

    let followingData: UserSocialData[] = [];
    let following = user.following;

    for (let followingId of following) {
      let userfollowingData = await this.getUserSocialData(
        followingId,
        user.nftCollections
      );
      followingData.push(userfollowingData);
    }
    return UserUtils.sortSocialUsers(followingData);
  }

  async getExploreData(id: string): Promise<UserSocialData[]> {
    const exploreUsers = await userRepository.findAll({
      attributes: ["id"],
      where: {
        id: {
          [Op.not]: id,
        },
      },
    });

    let user = await userRepository.findByPk(id);

    let exploreIds = exploreUsers.map((user) => user.dataValues.id);
    let exploreUsersData: UserSocialData[] = [];

    try {
      for (let exploreUser of exploreIds) {
        let userfollowingData = await this.getUserSocialData(
          exploreUser,
          user.dataValues.nftCollections
        );
        exploreUsersData.push(userfollowingData);
      }
      return UserUtils.sortSocialUsers(exploreUsersData);
    } catch (error) {
      console.log("error", error);
      return null;
    }
  }

  async getRankingData(): Promise<UserRakingData[]> {
    const sortedUsers = await userRepository.findAll({
      order: [["nftLength", "DESC"]],
    });

    let rankingUsers = sortedUsers.map((user) => user.dataValues);

    let rankingUsersData: UserRakingData[] = [];
    for (let rankingUser of rankingUsers) {
      let userRankingData: UserRakingData = {
        id: rankingUser.id,
        nickname: rankingUser.nickname,
        address: rankingUser.interflowAddress,
        pfpImage: rankingUser.pfpImage,
        bgImage: rankingUser.bgImage,
        nftLength: rankingUser.nftLength,
        nftCollections: rankingUser.nftCollections,
      };
      rankingUsersData.push(userRankingData);
    }

    return rankingUsersData;
  }
}

export default new UserService();
