import { Router } from "express";

import UserController from "@controller/users/UserController";

const userRoutes = Router();

userRoutes.get("/getUser/:id", UserController.findOne);

userRoutes.get("/getAllUsers", UserController.getAllUsers);

userRoutes.post(
  "/auth/login",
  UserController.login
);

userRoutes.put(
  "/update/users/:id",
  UserController.update
);

userRoutes.delete(
  "/users/:id",
  UserController.delete
);

export default userRoutes;
