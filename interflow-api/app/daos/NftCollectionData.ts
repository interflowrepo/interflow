import { NftData } from "./NftData";

export interface NftCollectionData {
  address: string;
  display: NftCollectionDisplay;
  tokenIds: string[];
}

export interface NftCollectionDisplay {
  name: string;
  squareImage: { file: { url: string }; mediaType: string };
  bannerImage: { file: { url: string }; mediaType: string };
}
