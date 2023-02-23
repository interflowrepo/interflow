"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("../../database/sequelize");
var _Post = require("../../models/posts/Post");
var _UserService = _interopRequireDefault(require("../users/UserService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const postRepository = _sequelize.sequelize.getRepository(_Post.Post);
class PostService {
  async createPost(id, postData) {
    const user = await _UserService.default.findUser(id);
    postData.user = user;
    postData.userId = user.id;
    try {
      const post = await postRepository.create({
        nftId: postData.nftId,
        nftImageLink: postData.nftImageLink,
        nftCollectionName: postData.nftCollectionName,
        nftType: postData.nftType,
        postText: postData.postText,
        timestamp: postData.timestamp,
        isOwner: postData.isOwner,
        user: postData.user,
        userId: postData.userId
      });
      return post;
    } catch (err) {
      console.log(err);
    }
  }
  async getAllPosts() {
    const posts = await postRepository.findAll();
    return posts.sort(() => Math.random() - 0.5);
  }
}
var _default = new PostService();
exports.default = _default;