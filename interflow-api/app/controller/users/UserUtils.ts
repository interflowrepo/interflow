import { Request, Response, NextFunction } from "express";
import { User } from "@models/users/User";
import { sequelize } from "@database/sequelize";

const userRepository = sequelize.getRepository(User);

class UserUtils {
  //method that generate a random nickname
  public async generateNickname(): Promise<string> {
    const nickname = Math.random().toString(36).substring(7);

    return nickname;
  }
  
}

export default new UserUtils();
