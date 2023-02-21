import { Request, Response } from "express";
import { User } from "@models/users/User";
import { sequelize } from "@database/sequelize";
import UserService from "app/services/users/UserService";

const userRepository = sequelize.getRepository(User);

class UserController {
  public async login(req: Request, res: Response): Promise<Response> {
    console.log("req body", req.body);

    try {
      let user = await UserService.login(req.body.authId, req.body.email);
      return res.status(200).json(user);
    } catch (err: any) {
      return res
        .status(400)
        .json({ message: "There was a problem logging in." });
    }
  }

  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    const users = await userRepository.findAll({
      raw: true,
    });

    return res.status(200).json(users);
  }

  public async findOne(req: Request, res: Response): Promise<Response> {
    let user: User | null;

    try {
      user = await userRepository.findByPk(req.params.id, {
        raw: true,
      });
    } catch (err: any) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    return res.status(200).json({
      id: user?.id,
      authId: user?.authId,
      nickname: user?.nickname,
      email: user?.email,
      interflowAddress: user?.interflowAddress,
      bloctoAddress: user?.bloctoAddress,
      dapperAddress: user?.dapperAddress,
      nftLength: user?.nftLength,
      bgImage: user?.bgImage,
      pfpImage: user?.pfpImage,
      followers: user?.followers,
      following: user?.following,
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    let user: User | null;

    console.log("was here!");

    try {
      user = await userRepository.findByPk(req.params.id);
    } catch (err: any) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    let dapperAddress = req.body.dapperAddress;
    let bloctoAddress = req.body.bloctoAddress;
    const newNftLength = await UserService.getUserNftLength(
      bloctoAddress,
      dapperAddress
    );

    try {
      if (user) {
        await user.update({
          nickname: req.body.nickname,
          bloctoAddress: req.body.bloctoAddress,
          dapperAddress: req.body.dapperAddress,
          nftLength: newNftLength,
          bgImage: req.body.bgImage,
          pfpImage: req.body.pfpImage,
        });
      }

      return res.status(200).json({
        message: "User updated with success!",
        id: user?.id,
        authId: user?.authId,
        nickname: user?.nickname,
        email: user?.email,
        interflowAddress: user?.interflowAddress,
        bloctoAddress: user?.bloctoAddress,
        dapperAddress: user?.dapperAddress,
        nftLength: user?.nftLength,
        bgImage: user?.bgImage,
        pfpImage: user?.pfpImage,
        followers: user?.followers,
        following: user?.following,
      });
    } catch (err: any) {
      return res
        .status(400)
        .json({ message: "There was a problem updating the user." });
    }
  }

  public async updateLength(req: Request, res: Response): Promise<Response> {
    let user: User | null;

    try {
      user = await userRepository.findByPk(req.params.id);
    } catch (err: any) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    let dapperAddress = req.body.dapperAddress;
    let bloctoAddress = req.body.bloctoAddress;
    if (req.body.dapperAddress == null) {
      dapperAddress = user?.dapperAddress;
    } else if (req.body.bloctoAddress == null) {
      bloctoAddress = user?.bloctoAddress;
    }

    const newNftLength = await UserService.getUserNftLength(
      bloctoAddress,
      dapperAddress
    );

    if (user) {
      await user.update({
        bloctoAddress: bloctoAddress,
        dapperAddress: dapperAddress,
        nftLength: newNftLength,
      });
    }

    return res.status(200).json({
      message: "User NFTs Length updated with success!",
      newNftLength: newNftLength,
    });
  }

  public async addFollower(req: Request, res: Response): Promise<Response> {
    let user: User | null;

    try {
      user = await userRepository.findByPk(req.params.id);
    } catch (err: any) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    if (user) {
      await user.update({
        followers: [...user.followers, req.body.followerId],
      });
    }

    return res
      .status(200)
      .json({ message: "New follower added with success!" });
  }

  public async addFollowing(req: Request, res: Response): Promise<Response> {
    let user: User | null;

    try {
      user = await userRepository.findByPk(req.params.id);
    } catch (err: any) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    if (user) {
      await user.update({
        following: [...user.following, req.body.followingId],
      });
    }

    return res
      .status(200)
      .json({ message: "New following added with success!" });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    let user: User | null;

    try {
      user = await userRepository.findByPk(req.params.id);
    } catch (err: any) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    if (user) {
      await user.destroy();
    }

    return res.json({ message: "User deleted with success!" });
  }
}

export default new UserController();
