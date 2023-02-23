import { sequelize } from "@database/sequelize";
import { Post } from "@models/posts/Post";
import { CreatePost } from "app/daos/CreatePost";
import UserService from "../users/UserService";

const postRepository = sequelize.getRepository(Post);

class PostService {
  async createPost(id: string, postData: CreatePost): Promise<Post> {
    const user = await UserService.findUser(id);

    postData.user = user;
    postData.userId = user.id;
    try {
      const post = await postRepository.create({
        nftId: postData.nftId,
        nftImageLink: postData.nftImageLink,
        nftCollectionName: postData.nftCollectionName,
        nftType: postData.nftType,
        postText: postData.postText,
        timestamp: postData.timestamp,
        isOwner: postData.isOwner,
        user: postData.user,
        userId: postData.userId,
      });
      return post;
    } catch (err: any) {
      console.log(err);
    }
  }

  async getAllPosts(): Promise<Post[]> {
    const posts = await postRepository.findAll();
    return posts.sort(() => Math.random() - 0.5);
  }
}

export default new PostService();
