import { Router } from "express";

import UserController from "@controller/users/UserController";

const userRoutes = Router();

// ------------ GET REQUESTS
userRoutes.get("/getUser/:id", UserController.findOne);
userRoutes.get("/getAllUsers", UserController.getAllUsers);
userRoutes.get("/getUserById/:id", UserController.findOne);
userRoutes.get("/getUserCollectionData/:id", UserController.getUserCollectionData);
userRoutes.get("/getUserNfts/:id", UserController.getUserNFTs);
userRoutes.get("/social/followers/:id", UserController.getFollowersData);
userRoutes.get("/social/following/:id", UserController.getFollowingData);
userRoutes.get("/social/explore/:id", UserController.getExploreData);
userRoutes.get("/social/ranking", UserController.getRanking);

// ------------ POST REQUESTS
userRoutes.post("/auth/login", UserController.login);
userRoutes.post("/social/follow/:id", UserController.followUser);
userRoutes.post("/social/unfollow/:id", UserController.unfollowUser);

// ------------ PUT REQUESTS
userRoutes.put("/update/users/:id", UserController.update);

// ------------ DELETE REQUESTS
userRoutes.delete("/users/:id", UserController.delete);

export default userRoutes;
