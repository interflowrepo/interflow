import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import UserDetailsHeader from '../components/social/user/UserDetailsHeader'
import UserTabs from '../components/social/user/UserTabs';
import UserPostCard from '../components/social/user/UserPostCard';
import UserCollections from '../components/social/user/UserCollections';
import UserPosts from '../components/social/user/UserPosts';

export default function UserDetailsView({ navigation }) {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };


  const handleNav = () => {
    navigation.navigate("UserCollection");
  };

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
      />

      <UserTabs activeTab={activeTab} onChangeTab={handleTabChange} />
      {activeTab == 1 && <UserCollections onPress={handleNav} />}
      {activeTab == 2 && <UserPosts onPress={handleNav} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})