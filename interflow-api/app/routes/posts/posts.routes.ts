import { Router } from "express";

import PostController from "@controller/posts/PostController";

const postRoutes = Router();

// ------------ GET REQUESTS
postRoutes.get("/posts/getAllPosts", PostController.getAllPosts);

// ------------ POST REQUESTS
postRoutes.post("/posts/create/:id", PostController.createPost);

export default postRoutes;
