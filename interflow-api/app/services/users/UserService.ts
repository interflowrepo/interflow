import UserUtils from "@controller/users/UserUtils";
import { sequelize } from "@database/sequelize";
import { User } from "@models/users/User";
import WalletService from "../wallets/WalletService";

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
          userExists
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
      if(!interflowAddress){
        interflowAddress = "ADDRESS-ERROR"
      }

      await user.update({
        interflowAddress: interflowAddress,
      });

      return {
        message: "User created with success!",
        user
      };
    } catch (err: any) {
      return { message: "There was a problem creating the user." };
    }
  }

  async getUserNftLength(
    bloctoAddress?: string,
    dapperAddress?: string
  ): Promise<Number> {
    let bloctoNfts = bloctoAddress ? 33 : 0;
    let dapperNfts = dapperAddress ? 33 : 0;
    return bloctoNfts + dapperNfts;
  }
}

export default new UserService();
