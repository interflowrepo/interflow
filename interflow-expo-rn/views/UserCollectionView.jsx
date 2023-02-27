import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useMemo, useState } from 'react'
import UserNftCard from '../components/social/user/UserNftCard'
import UserDetailsHeader from '../components/social/user/UserDetailsHeader'
import { ScrollView } from 'react-native-gesture-handler'
import { useAuth } from '../contexts/AuthContext'

export default function UserCollectionView({ navigation, route }) {
const [nftArray, setNftArray] = useState([])
const {userNickname, userInterflowAddress, userPfpImage} = useAuth()
  const handleNav = (item) => {
    navigation.navigate({name: "NftDetails", params: {
      nft: item
    },});
  };

  // console.log('testttt 44444 ----------',route.params)

  useMemo(() => {
    let collection = route.params.collection
    setNftArray(collection)
  }, [route])

  const collectionBannerImg = useMemo(() => {
    if(nftArray && nftArray.length > 0){
      return nftArray[0].collectionBannerImage
    } else {
      return "https://res.cloudinary.com/ddbgaessi/image/upload/v1676908822/doodles_jheqf6.png"
    }
  }, [nftArray])

  const collectionSquareImage = useMemo(() => {
    if(nftArray && nftArray.length > 0){
      return nftArray[0].collectionSquareImage
    } else {
      return "https://res.cloudinary.com/ddbgaessi/image/upload/v1676665910/flovatarLogo_x0lwdb.png"
    }
  }, [nftArray])

  

  const HorizontalListComponent = () => {
    return (
      <ScrollView horizontal={true}>
        {nftArray.map((item) => {
          return (<UserNftCard onPress={() => handleNav(item)} name={item.name} id={item.id} thumbnail={item.thumbnail}/>
          )
        })}
      </ScrollView>
    )
  }


  return (
    <View style={styles.container}>
      <UserDetailsHeader
        backgroundImageSource={collectionBannerImg}
        userName={userNickname}
        userAddress={userInterflowAddress}
        onPressButton={() => console.log('Button pressed')}
        buttonText="Follow"
        avatarImageSource={collectionSquareImage}
        bottomRightText1="Followers:"
        bottomRightText2="10"
        collection
      />
      <HorizontalListComponent />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})