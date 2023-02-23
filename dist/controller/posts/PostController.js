"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _PostService = _interopRequireDefault(require("app/services/posts/PostService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class PostController {
  async createPost(req, res) {
    try {
      let {
        nftId,
        nftImageLink,
        nftCollectionName,
        nftType,
        postText,
        timestamp,
        isOwner
      } = req.body;
      let createPost = {
        nftId,
        nftImageLink,
        nftCollectionName,
        nftType,
        postText,
        timestamp,
        isOwner
      };
      let post = await _PostService.default.createPost(req.params.id, createPost);
      return res.status(200).json(post);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid ID"
      });
    }
  }
  async getAllPosts(req, res) {
    try {
      let posts = await _PostService.default.getAllPosts();
      return res.status(200).json(posts);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid ID"
      });
    }
  }
}
var _default = new PostController();
exports.default = _default;