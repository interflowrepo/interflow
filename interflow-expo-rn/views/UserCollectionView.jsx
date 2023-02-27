import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import UserNftCard from '../components/social/user/UserNftCard'
import UserDetailsHeader from '../components/social/user/UserDetailsHeader'
import { ScrollView } from 'react-native-gesture-handler'



const NFTARRAY = [
  {
    id: 1,
    title: "NFT 1",
    url: "https://res.cloudinary.com/ddbgaessi/image/upload/v1676908822/doodles_jheqf6.png",
  },
  {
    id: 2,
    title: "NFT 1",
    url: "https://res.cloudinary.com/ddbgaessi/image/upload/v1676908822/doodles_jheqf6.png",
  },
  {
    id: 3,
    title: "NFT 1",
    url: "https://res.cloudinary.com/ddbgaessi/image/upload/v1676908822/doodles_jheqf6.png",
  },
]

export default function UserCollectionView({ navigation }) {

  const handleNav = () => {
    navigation.navigate("NftDetails");
  };

  const HorizontalListComponent = () => {
    return (
      <ScrollView horizontal={true}>
        {NFTARRAY.map((item) => {
          return (<UserNftCard onPress={handleNav} />
          )
        })}
      </ScrollView>
    )
  }


  return (
    <View style={styles.container}>
      <UserDetailsHeader
        backgroundImageSource={"https://res.cloudinary.com/ddbgaessi/image/upload/v1676908822/doodles_jheqf6.png"}
        userName="Florence"
        userAddress="0xf52d4"
        onPressButton={() => console.log('Button pressed')}
        buttonText="Follow"
        avatarImageSource={"https://res.cloudinary.com/ddbgaessi/image/upload/v1676665910/flovatarLogo_x0lwdb.png"}
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