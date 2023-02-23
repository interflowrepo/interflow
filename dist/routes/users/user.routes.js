"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _UserController = _interopRequireDefault(require("../../controller/users/UserController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userRoutes = (0, _express.Router)();

// ------------ GET REQUESTS
userRoutes.get("/users/getUser/:id", _UserController.default.findOne);
userRoutes.get("/users/getAllUsers", _UserController.default.getAllUsers);
userRoutes.get("/users/getUserById/:id", _UserController.default.findOne);
userRoutes.get("/users/getUserCollectionData/:id", _UserController.default.getUserCollectionData);
userRoutes.get("/users/getUserNfts/:id", _UserController.default.getUserNFTs);
userRoutes.get("/users/social/followers/:id", _UserController.default.getFollowersData);
userRoutes.get("/users/social/following/:id", _UserController.default.getFollowingData);
userRoutes.get("/users/social/explore/:id", _UserController.default.getExploreData);
userRoutes.get("/users/social/ranking", _UserController.default.getRanking);

// ------------ POST REQUESTS
userRoutes.post("/users/auth/login", _UserController.default.login);
userRoutes.post("/users/social/follow/:id", _UserController.default.followUser);
userRoutes.post("/users/social/unfollow/:id", _UserController.default.unfollowUser);

// ------------ PUT REQUESTS
userRoutes.put("/users/update/:id", _UserController.default.update);

// ------------ DELETE REQUESTS
userRoutes.delete("/users/delete/:id", _UserController.default.delete);
var _default = userRoutes;
exports.default = _default;