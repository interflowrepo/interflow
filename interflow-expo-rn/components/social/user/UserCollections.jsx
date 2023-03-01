import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import UserCollectionCard from './UserCollectionCard'

export default function UserCollections({ onPress, collections, nfts }) {

  const filteredNftArray = useMemo(() => {
    if(nfts && nfts.length > 0){
      return nfts.filter(nft => nft.length > 0)
    } else {
      return []
    }
  }, [nfts])


  return (
    <View>
      {filteredNftArray.map((collection) => (
        <UserCollectionCard
          name={collection[0].collectionName}
          bgImage={collection[0].collectionBannerImage}
          nftLength={collection.length}
          onPress={onPress}
          nft={collection}
        />
      ))}
    </View>
  )
}
