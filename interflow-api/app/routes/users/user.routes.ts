import { Router } from "express";

import UserController from "@controller/users/UserController";

const userRoutes = Router();

// ------------ GET REQUESTS
userRoutes.get("/users/getUser/:id", UserController.findOne);
userRoutes.get("/users/getAllUsers", UserController.getAllUsers);
userRoutes.get("/users/getUserById/:id", UserController.findOne);
userRoutes.get("/users/getUserCollectionData/:id", UserController.getUserCollectionData);
userRoutes.get("/users/getUserNfts/:id", UserController.getUserNFTs);
userRoutes.get("/users/social/followers/:id", UserController.getFollowersData);
userRoutes.get("/users/social/following/:id", UserController.getFollowingData);
userRoutes.get("/users/social/explore/:id", UserController.getExploreData);
userRoutes.get("/users/social/ranking", UserController.getRanking);

// ------------ POST REQUESTS
userRoutes.post("/users/auth/login", UserController.login);
userRoutes.post("/users/social/followUnfollow/:id", UserController.followUnfollowUser);

// ------------ PUT REQUESTS
userRoutes.put("/users/update/:id", UserController.update);

// ------------ DELETE REQUESTS
userRoutes.delete("/users/delete/:id", UserController.delete);

export default userRoutes;
