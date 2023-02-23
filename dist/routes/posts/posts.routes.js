"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _PostController = _interopRequireDefault(require("../../controller/posts/PostController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const postRoutes = (0, _express.Router)();

// ------------ GET REQUESTS
postRoutes.get("/posts/getAllPosts", _PostController.default.getAllPosts);

// ------------ POST REQUESTS
postRoutes.post("/posts/create/:id", _PostController.default.createPost);
var _default = postRoutes;
exports.default = _default;