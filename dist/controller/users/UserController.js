"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UserService = _interopRequireDefault(require("../../services/users/UserService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UserController {
  async login(req, res) {
    try {
      let user = await _UserService.default.login(req.body.authId, req.body.email);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({
        message: "There was a problem logging in."
      });
    }
  }
  async getAllUsers(req, res) {
    try {
      let users = await _UserService.default.findAllUsers();
      return res.status(200).json(users);
    } catch (err) {
      return res.status(400).json({
        message: "There was a problem getting All Users."
      });
    }
  }
  async findOne(req, res) {
    try {
      let user = await _UserService.default.findUser(req.params.id);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid ID"
      });
    }
  }
  async update(req, res) {
    const dapperAddress = req.body.dapperAddress;
    const bloctoAddress = req.body.bloctoAddress;
    const newNickname = req.body.nickname;
    const newBgImage = req.body.bgImage;
    const newPfpImage = req.body.pfpImage;
    try {
      let user = await _UserService.default.updateUser(req.params.id, {
        nickname: newNickname,
        bloctoAddress: bloctoAddress,
        dapperAddress: dapperAddress,
        bgImage: newBgImage,
        pfpImage: newPfpImage
      });
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid ID"
      });
    }
  }
  async getUserCollectionData(req, res) {
    try {
      let user = await _UserService.default.getUserCollectionData(req.params.id);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid ID"
      });
    }
  }
  async getUserNFTs(req, res) {
    try {
      let user = await _UserService.default.getUserNfts(req.params.id);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid ID"
      });
    }
  }
  async followUser(req, res) {
    try {
      let user = await _UserService.default.followUser(req.params.id, req.body.userToFollowId);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid ID to user or follower"
      });
    }
  }
  async getFollowersData(req, res) {
    try {
      let user = await _UserService.default.getFollowersData(req.params.id);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid ID"
      });
    }
  }
  async unfollowUser(req, res) {
    try {
      let user = await _UserService.default.unfollowUser(req.params.id, req.body.userToUnfollowId);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid ID to user or follower"
      });
    }
  }
  async getFollowingData(req, res) {
    try {
      let user = await _UserService.default.getFollowingData(req.params.id);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid ID"
      });
    }
  }
  async getExploreData(req, res) {
    try {
      let user = await _UserService.default.getExploreData(req.params.id);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid ID"
      });
    }
  }
  async delete(req, res) {
    try {
      let response = await _UserService.default.deleteUser(req.params.id);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid ID"
      });
    }
  }
  async getRanking(req, res) {
    try {
      let user = await _UserService.default.getRankingData();
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid ID"
      });
    }
  }
}
var _default = new UserController();
exports.default = _default;