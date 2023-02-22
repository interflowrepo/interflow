import { Router } from "express";

import UserController from "@controller/users/UserController";

const userRoutes = Router();

// ------------ GET REQUESTS
userRoutes.get("/getUser/:id", UserController.findOne);
userRoutes.get("/getAllUsers", UserController.getAllUsers);
userRoutes.get("/getUserById/:id", UserController.findOne);

// ------------ POST REQUESTS
userRoutes.post("/auth/login", UserController.login);
userRoutes.post("/nftLength/update", UserController.updateLength);
userRoutes.post("/addFollower/:id", UserController.addFollower);
userRoutes.post("/removeFollower/:id", UserController.removeFollower);

// ------------ PUT REQUESTS
userRoutes.put("/update/users/:id", UserController.update);

// ------------ DELETE REQUESTS
userRoutes.delete("/users/:id", UserController.delete);

export default userRoutes;
