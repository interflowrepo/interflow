import { Request, Response, NextFunction } from "express";
import { User } from "@models/users/User";
import { sequelize } from "@database/sequelize";
import { UserCompleteData } from "app/daos/UserCompleteData";
import { UserSocialData } from "app/daos/UserSocialData";

class UserUtils {
  //method that generate a random nickname
  public async generateNickname(): Promise<string> {
    const nickname = Math.random().toString(36).substring(7);

    return nickname;
  }

  public async sortUsers(ids: string[]): Promise<string[]> {
    const shuffled = ids.sort(() => 0.5 - Math.random());
    return shuffled;
  }

  public async sortUsersWithData(
    users: UserCompleteData[],
    callerCollectionName: string[]
  ): Promise<UserCompleteData[]> {
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

  public async sortSocialUsers( users: UserSocialData[] ): Promise<UserSocialData[]> {
    const sortedUsers = users.sort((a, b) => {
      if (a.collectionInCommon.length > b.collectionInCommon.length) {
        return 2;
      } else if (a.nftLength > b.nftLength) {
        return 1;
      } else if (a.collectionInCommon.length < b.collectionInCommon.length) {
        return -1;
      } else if(a.nftLength < b.nftLength) {
        return -2;
      } else {
        return 0;
      }
    });

    return sortedUsers;
  }
}

export default new UserUtils();
