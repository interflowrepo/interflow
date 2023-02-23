import { Router } from "express";

import PostController from "@controller/posts/PostController";

const postRoutes = Router();

// ------------ GET REQUESTS
postRoutes.get("/post/getAllPosts", PostController.getAllPosts);

// ------------ POST REQUESTS
postRoutes.post("/post/create/:id", PostController.createPost);

export default postRoutes;
