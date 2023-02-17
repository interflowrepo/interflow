import { View, Text } from 'react-native'
import React from 'react'
import AvatarScene from '../components/AvatarScene'
import BottomSheetModal from '../components/BottomSheetModal'

export default function CustomizeView() {
  return (
    <View style={{height:"100%", backgroundColor:"black"}}>
        <AvatarScene  />
        {/* <BottomSheetModal /> */}
    </View>
  )
}