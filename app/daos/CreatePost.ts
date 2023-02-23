import { User } from "@models/users/User";

export interface CreatePost {
  nftId: string;
  nftImageLink: string;
  nftCollectionName: string;
  nftType: string;
  postText: string;
  timestamp: string;
  isOwner: boolean;
  user?: User;
  userId?: string;
}
