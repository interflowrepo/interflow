import { NftCollectionData } from './../../daos/NftCollectionData';
import { UserCompleteData } from './../../daos/UserCompleteData';
import UserUtils from "@controller/users/UserUtils";
import { sequelize } from "@database/sequelize";
import { User } from "@models/users/User";
import { UserUpdate } from "app/daos/UserUpdate";
import WalletService from "../wallets/WalletService";
import FlowService from '../flow/FlowService';

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
        bloctoAddress: "",
        dapperAddress: "",
        nftLength: 0,
        bgImage: "https://interflow-app.s3.amazonaws.com/bgImage.png",
        pfpImage: "https://interflow-app.s3.amazonaws.com/pfpImage.png",
        followers: [],
        following: [],
      });

      let userId = user?.id;
      let interflowAddress;

      interflowAddress = await WalletService.setWalletAccountToUser(userId);
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
    const user = await userRepository.findByPk(id);
    return user;
  }

  async updateUser(id: string, userUpdates: UserUpdate): Promise<User | null> {
    let user = await userRepository.findByPk(id);

    let dapperAddress = userUpdates.dapperAddress;
    let bloctoAddress = userUpdates.bloctoAddress;
    if (!dapperAddress) {
      dapperAddress = user?.dapperAddress;
    } else if (!bloctoAddress) {
      bloctoAddress = user?.bloctoAddress;
    }

    userUpdates.nftLength = await this.getUserNftLength(
      bloctoAddress,
      dapperAddress
    );
    return user.update(userUpdates);
  }

  async updateNftLength(id: string): Promise<User | null> {
    let user = await userRepository.findByPk(id);

    let dapperAddress = user?.dapperAddress;
    let bloctoAddress = user?.bloctoAddress;

    let nftLength = await this.getUserNftLength(bloctoAddress, dapperAddress);
    return user.update({ nftLength: nftLength });
  }

  async getUserNftLength(
    bloctoAddress?: string,
    dapperAddress?: string
  ): Promise<number> {
    let bloctoNfts = bloctoAddress ? 33 : 0;
    let dapperNfts = dapperAddress ? 33 : 0;
    return bloctoNfts + dapperNfts;
  }

  async addFollower(id: string, followerId: string): Promise<User | null> {
    let user = await userRepository.findByPk(id);
    let follower = await userRepository.findByPk(followerId);

    if (!follower) {
      return null;
    }

    //Update Followers from User
    // User = user being followed
    let followers = [...user?.followers, followerId];
    let followersSet = new Set(followers);
    await user.update({ followers: followersSet });

    // Update Following from Follower
    // Follower = user following
    let followerFollowling = [...follower?.following, id];
    await follower.update({ followers: followerFollowling });

    return user;
  }

  async removeFollower(id: string, followingId: string): Promise<User | null> {
    let user = await userRepository.findByPk(id);
    let following = await userRepository.findByPk(followingId);

    // Update Following from User
    let updatedFollowing = user?.following.filter(
      (follower) => follower !== followingId
    );
    await user.update({ followers: updatedFollowing });

    // Update Followers from Following
    let updatedFollowers = following?.followers.filter(
      (follower) => follower !== id
    );
    await following.update({ followers: updatedFollowers });

    return user;
  }

  async deleteUser(id: string): Promise<string | null> {
    const user = await userRepository.findByPk(id);
    if (user) {
      await user.destroy();
    }
    return "User removed with success!";
  }

  async getUserCollectionData(id: string): Promise<UserCompleteData>{
    const user = await userRepository.findByPk(id);
    if (!user) {
      return null;
    }

    let dapperAddress = user?.dapperAddress;
    let bloctoAddress = user?.bloctoAddress;

    let nftLength = await this.getUserNftLength(bloctoAddress, dapperAddress);
    await user.update({ nftLength: nftLength });
    
    let nftCollectionData: NftCollectionData[] = await FlowService.getNftCollectionFromAccount(bloctoAddress, dapperAddress)

    let userCompleteData: UserCompleteData = {
      user,
      collections: nftCollectionData
    };

    return userCompleteData;
  }
}

export default new UserService();
