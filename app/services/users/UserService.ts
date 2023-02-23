import { NftCollectionData } from "../../daos/NftCollectionData";
import { UserCompleteData } from "../../daos/UserCompleteData";
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

      let userId = user?.id;
      let interflowAddress;

      //FIX THIS! IT'S BREAKING IF THE WALLET IT'S NOT FOUND
      interflowAddress = await WalletService.setWalletAccountToUser(user);
      if (!interflowAddress) {
        interflowAddress = "ADDRESS-ERROR";
      }

      await user.update({
        interflowAddress: interflowAddress,
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

  async findUser(id: string): Promise<User | null> {
    const user = await userRepository.findByPk(id, {
      include: [
        {
          association: "posts",
        },
      ],
    });
    return user;
  }

  async updateUser(id: string, userUpdates: UserUpdate): Promise<User | null> {
    let user = await userRepository.findByPk(id);

    let dapperAddress = userUpdates.dapperAddress;
    let bloctoAddress = userUpdates.bloctoAddress;
    !dapperAddress && (dapperAddress = user?.dapperAddress);
    !bloctoAddress && (bloctoAddress = user?.bloctoAddress);

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

  async getUserNfts(id: string): Promise<any> {
    const nfts = await FlowService.getAllNftsFromAccount(id);
    return nfts;
  }

  async followUser(id: string, userToFollowId: string): Promise<User | null> {
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
    await user.update({ following: followingIds });

    // Update Followers from userToFollow
    // userToFollow = user that will receive the new follower(user calling the action)
    let userToFollowFollowers = [...userToFollow?.followers, id];
    console.log("user to follow", userToFollowFollowers);
    await userToFollow.update({ followers: userToFollowFollowers });

    return user;
  }

  async unfollowUser(
    id: string,
    userToUnfollowId: string
  ): Promise<User | null> {
    let user = await userRepository.findByPk(id);
    let userToUnfollow = await userRepository.findByPk(userToUnfollowId);

    // Update Following from User
    let updatedFollowing = user?.following.filter(
      (followingId) => followingId !== userToUnfollowId
    );

    await user.update({ following: updatedFollowing });

    // Update Followers from userToUnfollow
    let updatedFollowers = userToUnfollow?.followers.filter(
      (follower) => follower !== id
    );
    await userToUnfollow.update({ followers: updatedFollowers });

    return user;
  }

  async deleteUser(id: string): Promise<string | null> {
    const user = await userRepository.findByPk(id);
    if (user) {
      await user.destroy();
    }
    return "User removed with success!";
  }

  async getUserCollectionData(id: string): Promise<UserCompleteData> {
    const user = await userRepository.findByPk(id, {
      include: [
        {
          association: "userPosts",
        },
      ],
    });
    if (!user) {
      return null;
    }


    if((user.dapperAddress === null || user.dapperAddress === "" ) && (user.bloctoAddress === null || user.bloctoAddress === "" )){
      let userCompleteData: UserCompleteData = {
        user,
        collections: [],
      };
      return userCompleteData;
    } else {
      let nftCollectionData: NftCollectionData[] =
        await FlowService.getNftCollectionFromAccount(id);
        console.log("nftCollectionData", nftCollectionData)
        let userCompleteData: UserCompleteData = {
          user,
          collections: nftCollectionData,
        };
    
        return userCompleteData;
    }


  }

  async getUserSocialData(
    id: string,
    compareCollection: string[]
  ): Promise<UserSocialData> {
    const user = await userRepository.findByPk(id);
    if (!user) {
      return null;
    }

    let collectionInCommon = user.nftCollections.filter((collection) =>
      compareCollection.includes(collection)
    );

    let userSocialData: UserSocialData = {
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
    const user = await userRepository.findByPk(id);
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
    const user = await userRepository.findByPk(id);
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

    let exploreIds = exploreUsers.map((user) => user.id);

    let exploreUsersData: UserSocialData[] = [];
    for (let exploreUser of exploreIds) {
      let userfollowingData = await this.getUserSocialData(
        exploreUser,
        user.nftCollections
      );
      exploreUsersData.push(userfollowingData);
    }
    return UserUtils.sortSocialUsers(exploreUsersData);
  }

  async getRankingData(): Promise<UserRakingData[]> {
    const rankingUsers = await userRepository.findAll({
      order: [["nftLength", "DESC"]],
    });

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
