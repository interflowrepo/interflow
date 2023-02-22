import { Request, Response } from "express";
import UserService from "app/services/users/UserService";

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
    try {
      let users = await UserService.findAllUsers();
      return res.status(200).json(users);
    } catch (err: any) {
      return res
        .status(400)
        .json({ message: "There was a problem getting All Users." });
    }
  }

  public async findOne(req: Request, res: Response): Promise<Response> {
    try {
      let user = await UserService.findUser(req.params.id);
      return res.status(200).json(user);
    } catch (err: any) {
      return res.status(400).json({ message: "Invalid ID" });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dapperAddress = req.body.dapperAddress;
    const bloctoAddress = req.body.bloctoAddress;
    const newNickname = req.body.nickname;
    const newBgImage = req.body.bgImage;
    const newPfpImage = req.body.pfpImage;

    try {
      let user = await UserService.updateUser(req.params.id, {
        nickname: newNickname,
        bloctoAddress: bloctoAddress,
        dapperAddress: dapperAddress,
        bgImage: newBgImage,
        pfpImage: newPfpImage,
      });
      return res.status(200).json(user);
    } catch (err: any) {
      return res.status(400).json({ message: "Invalid ID" });
    }
  }

  public async updateLength(req: Request, res: Response): Promise<Response> {
    try {
      let user = await UserService.updateNftLength(req.params.id);
      return res.status(200).json(user);
    } catch (err: any) {
      return res.status(400).json({ message: "Invalid ID" });
    }
  }

  public async addFollower(req: Request, res: Response): Promise<Response> {
    try {
      let user = await UserService.addFollower(
        req.params.id,
        req.body.followerId
      );
      return res.status(200).json(user);
    } catch (err: any) {
      return res
        .status(400)
        .json({ message: "Invalid ID to user or follower" });
    }
  }

  public async removeFollower(req: Request, res: Response): Promise<Response> {
    try {
      let user = await UserService.removeFollower(
        req.params.id,
        req.body.followerId
      );
      return res.status(200).json(user);
    } catch (err: any) {
      return res
        .status(400)
        .json({ message: "Invalid ID to user or follower" });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      let response = await UserService.deleteUser(req.params.id);
      return res.status(200).json(response);
    } catch (err: any) {
      return res.status(400).json({ message: "Invalid ID" });
    }
  }
}

export default new UserController();
