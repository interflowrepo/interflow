import { User } from '@models/users/User';
import { NftCollectionData } from './NftCollectionData';
export interface UserCompleteData {
    user: User,
    collections: NftCollectionData[];
}