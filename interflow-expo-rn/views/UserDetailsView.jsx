import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserDetailsHeader from '../components/social/user/UserDetailsHeader'
import UserTabs from '../components/social/user/UserTabs';
import UserPostCard from '../components/social/user/UserPostCard';
import UserCollections from '../components/social/user/UserCollections';
import UserPosts from '../components/social/user/UserPosts';
import useUserData from '../hooks/useUserData';
import { useAuth } from '../contexts/AuthContext';

export default function UserDetailsView({ navigation, route }) {
  const {getUserCollectionData, followUnfollowUser, getUserNfts} = useUserData()
  const { userId } = useAuth();
  const [activeTab, setActiveTab] = useState(1);
  const [userFollowers, setUserFollowers] = useState([])
  const [isFollowing, setIsFollowing] = useState()
  const [userData, setUserData] = useState({})
  const [collections, setCollections] = useState([])
  const [userNfts, setUserNfts] = useState([])

  let user = route.params.user
  
  useEffect(() => {
    handleUpdateUser()
    handleGetNfts()
    checkIsFollowing()
  }, [])

  const handleUpdateUser = async () => {
    const result = await getUserCollectionData(user.id)
    setUserData(result)
    setCollections(Object.values(result.collections))
    setUserFollowers(result.user.followers)
    setIsFollowing(result.user.followers.find(id => id === userId))
  }

  const handleGetNfts = async () => {
    const result = await getUserNfts(user.id)
    setUserNfts(Object.values(result))
  }

  const checkIsFollowing = () => {
    setIsFollowing(userFollowers.find(id => id === user.id))
  }

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleNav = (item) => {
    navigation.navigate({name: "UserCollection", params: {
      collection: item,
      nickname: user.nickname,
      address: user.address
    }});
  };

  const handleFollow = async () => {
    const result = await followUnfollowUser(user.id)
    setUserFollowers(result.followers)
    let isFollowing = result.followers.some(id => id === userId)
    setIsFollowing(isFollowing)
    !isFollowing ? Alert.alert(`You stoped following ${result.userName}`) : Alert.alert(`You started following ${result.userName}`)
  }

  return (
    <View style={styles.container}>
      <UserDetailsHeader
        backgroundImageSource={user.bgImage || "https://interflow-app.s3.amazonaws.com/bgImage.png"}
        userName={user.nickname || "User Name"}
        userAddress={user.address || "0xf52d4"}
        onPressButton={() => handleFollow()}
        buttonText={isFollowing ? "Unfollow" : "Follow"}
        avatarImageSource={user.pfpImage || "https://nbatopshot.com/static/img/og/og.png"}
        bottomRightText1="Followers:"
        bottomRightText2={userFollowers.length}
      />

      <UserTabs activeTab={activeTab} onChangeTab={handleTabChange} />
      {activeTab == 1 && <UserCollections onPress={handleNav} collections={collections} nfts={userNfts}/>}
      {activeTab == 2 && <UserPosts onPress={handleNav} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})