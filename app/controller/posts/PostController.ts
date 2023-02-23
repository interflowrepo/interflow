import { CreatePost } from "app/daos/CreatePost";
import PostService from "app/services/posts/PostService";
import { Request, Response } from "express";

class PostController {
    public async createPost(req: Request, res: Response): Promise<Response> {
        try {
            let { nftId, nftImageLink, nftCollectionName, nftType, postText, timestamp, isOwner  } = req.body;
            let createPost: CreatePost = { nftId, nftImageLink, nftCollectionName, nftType, postText, timestamp, isOwner };
            let post = await PostService.createPost(req.params.id, createPost);
            return res.status(200).json(post);
        } catch (err: any) {
            return res.status(400).json({ message: "Invalid ID" });
        }
    }

    public async getAllPosts(req: Request, res: Response): Promise<Response> {
        try {
            let posts = await PostService.getAllPosts();
            return res.status(200).json(posts);
        } catch (err: any) {
            return res.status(400).json({ message: "Invalid ID" });
        }
    }
}

export default new PostController();