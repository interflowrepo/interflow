import { View, Text } from 'react-native'
import React from 'react'
import UserNftCard from '../components/social/user/UserNftCard'
import PrimaryBtnComponent from '../components/PrimaryBtnComponent'

export default function NftDetailsView() {
  return (
    <View>
      <UserNftCard />
      <PrimaryBtnComponent label={"Post"} />
    </View>
  )
}